import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movies.entity';
import { Between, EntityManager, Equal, Like, Repository } from 'typeorm';
import { CreateMoviesDto } from './dto/create-movies.dto';
import { UpdateMoviesDto } from './dto/update-movies.dto';
import { MovieTranslations } from 'src/movie-translations/entities/movie-translations.entity';
import { MovieGenres } from 'src/movie-genres/entities/movie-genres.entity';
import { FilterMoviesDto } from './dto/filter-movie.dto';
import { In } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { UpdateResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { bucket } from 'src/config/firebase.config';
import { FilterSelectMoviesDto } from './dto/filter-select-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(MovieTranslations)
    private readonly movieTranslationsRepository: Repository<MovieTranslations>,
    @InjectRepository(MovieGenres)
    private readonly genreRepository: Repository<MovieGenres>,
  ) {}

  async create(createMovieDto: CreateMoviesDto): Promise<Movie> {
    return await this.moviesRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // Create and save Movie entity
        const movie = this.moviesRepository.create(createMovieDto);
        const savedMovie = await transactionalEntityManager.save(Movie, movie);

        // Create and save MovieTranslations entities
        if (
          createMovieDto.translations &&
          createMovieDto.translations.length > 0
        ) {
          const movieTranslations = createMovieDto.translations.map(
            (translation) => {
              return this.movieTranslationsRepository.create({
                ...translation,
                movie: savedMovie,
                categoryLanguage: { id: translation.categoryLanguageId },
              });
            },
          );
          console.log();
          await transactionalEntityManager.save(
            MovieTranslations,
            movieTranslations,
          );
        }

        // Fetch and link movie genres
        if (createMovieDto.genres && createMovieDto.genres.length > 0) {
          const genreIds = createMovieDto.genres.map((genre) => genre.id);
          const movieGenres = await transactionalEntityManager.findBy(
            MovieGenres,
            {
              id: In(genreIds),
            },
          );

          if (movieGenres.length !== genreIds.length) {
            throw new Error('One or more genre IDs are invalid');
          }

          savedMovie.genres = movieGenres;
          await transactionalEntityManager.save(Movie, savedMovie);
        }

        // Fetch the saved movie with all relations.
        const fullMovie = await transactionalEntityManager.findOne(Movie, {
          where: { id: savedMovie.id },
          relations: ['translations', 'genres'],
        });

        return fullMovie;
      },
    );
  }

  async findAll(query: FilterMoviesDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';
    const languageCode = query.languageCode || 'vi';

    const [res, total] = await this.moviesRepository.findAndCount({
      where: {
        // translations: {
        //   name: Like('%' + search + '%'),
        //   categoryLanguage: {
        //     languageCode: languageCode, // Sử dụng giá trị từ client
        //   },
        // },
        // genres: {
        //   movieGenreTranslation: {
        //     categoryLanguage: languageCode,.
        //   },
        // },
        translations: {
          name: Like('%' + search + '%'),
          categoryLanguage: {
            languageCode: Equal(languageCode), // Use Equal operator for nested property
          },
        },
        genres: {
          movieGenreTranslation: {
            categoryLanguage: {
              languageCode: Equal(languageCode),
            },
          },
        },
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,
      relations: {
        translations: {
          categoryLanguage: true,
        },
        genres: {
          movieGenreTranslation: {
            categoryLanguage: true,
          },
        },

        showTimes: {
          room: {
            branch: {
              translations: {
                categoryLanguage: true,
              },
            },
          },
        },
      },
      select: {
        id: true,
        director: true,
        cast: true,
        releaseDate: true,
        duration: true,
        language: true,
        country: true,
        rating: true,
        poster_url: true,
        trailer_url: true,
        numberOfTicketsSold: true,
        translations: {
          id: true,
          name: true,
          description: true,
          categoryLanguage: {
            id: true,
            languageCode: true,
          },
        },
        genres: {
          id: true,
          movieGenreTranslation: {
            id: true,
            name: true,
            categoryLanguage: {
              languageCode: true,
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      data: res,
      total,
      currentPage: page,
      lastPage,
      nextPage,
      prevPage,
    };
  }

  async findAllName(query: FilterMoviesDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';
    const languageCode = query.languageCode || 'vi';

    const [res, total] = await this.moviesRepository.findAndCount({
      where: {
        // translations: {
        //   name: Like('%' + search + '%'),
        //   categoryLanguage: {
        //     languageCode: languageCode, // Sử dụng giá trị từ client
        //   },
        // },
        // genres: {
        //   movieGenreTranslation: {
        //     categoryLanguage: languageCode,.
        //   },
        // },
        translations: {
          name: Like('%' + search + '%'),
          categoryLanguage: {
            languageCode: Equal(languageCode), // Use Equal operator for nested property
          },
        },
      },
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,
      relations: {
        translations: {
          categoryLanguage: true,
        },
      },
      select: {
        id: true,
        duration: true,
        releaseDate: true,
        translations: {
          id: true,
          name: true,
          description: true,
          categoryLanguage: {
            id: true,
            languageCode: true,
          },
        },

        createdAt: true,
        updatedAt: true,
      },
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      data: res,
      total,
      currentPage: page,
      lastPage,
      nextPage,
      prevPage,
    };
  }

  async findAllShowTimes(query: FilterMoviesDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';
    const branchId = query.branchId || '';
    const movie_id = query.movie_id || '';
    const languageCode = query.languageCode || 'vi';

    // const show_time_start = query.show_time_start || '';

    // // Tính toán ngày hôm nay (giới hạn trong phạm vi ngày)
    // const today = new Date();
    // today.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00

    // const tomorrow = new Date(today);
    // tomorrow.setDate(today.getDate() + 1); // Ngày mai (để so sánh)

    const whereCondition: any = {
      translations: {
        name: Like('%' + search + '%'),
        categoryLanguage: {
          languageCode: Equal(languageCode), // Use Equal operator for nested property
        },
      },
      genres: {
        movieGenreTranslation: {
          categoryLanguage: {
            languageCode: Equal(languageCode), // Use Equal operator for nested property
          },
        },
      },
      id: movie_id ? movie_id : undefined,
      // showTimes: {
      //   show_time_start: Between(today.toISOString(), tomorrow.toISOString()),
      // },
    };

    // if (show_time_start) {
    //   whereCondition.showTimes.show_time_start = Between(
    //     today.toISOString(),
    //     tomorrow.toISOString(),
    //   );
    // }
    if (branchId) {
      whereCondition.showTimes = {
        room: {
          branch: {
            id: branchId, // Filter by branch ID
          },
        },
      };
    }
    const [res, total] = await this.moviesRepository.findAndCount({
      where: whereCondition,
      order: { createdAt: 'DESC' },
      take: items_per_page,
      skip: skip,
      relations: {
        translations: {
          categoryLanguage: true,
        },
        // genres: {
        //   movieGenreTranslation: {
        //     categoryLanguage: true,
        //   },
        // },
        genres: {
          movieGenreTranslation: {
            categoryLanguage: true,
          },
        },
        showTimes: {
          room: {
            branch: {
              translations: true,
            },
          },
        },
      },
      select: {
        id: true,
        director: true,
        // cast: true,
        releaseDate: true,
        duration: true,
        language: true,
        country: true,
        // rating: true,
        poster_url: true,
        // trailer_url: true,
        // numberOfTicketsSold: true,
        translations: {
          id: true,
          name: true,
          categoryLanguage: {
            languageCode: true,
          },
        },
        // genres: {
        //   id: true,
        //   movieGenreTranslation: {
        //     id: true,
        //     name: true,
        //     categoryLanguage: {
        //       languageCode: true,
        //     },
        //   },
        // },
        showTimes: {
          id: true,
          show_time_start: true,
          show_time_end: true,
          room: {
            id: true,
            name: true,
            branch: {
              id: true,
              translations: {
                id: true,
                name: true,
                languageCode: true,
                address: true,
              },
            },
            seatMaps: {
              id: true,
              row: true,
              count: true,
            },
          },
        },
        createdAt: true,
        // updatedAt: true,
      },
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      data: res,
      total,
      currentPage: page,
      lastPage,
      nextPage,
      prevPage,
    };
  }

  async findAllRevenue(query: FilterMoviesDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 20;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const search = query.search || '';
    const languageCode = query.languageCode || 'vi';

    // Lấy danh sách phim và tổng số phim theo bộ lọc
    const [movies, total] = await this.moviesRepository.findAndCount({
      where: {
        translations: {
          name: Like('%' + search + '%'),
          categoryLanguage: {
            languageCode: Equal(languageCode),
          },
        },
      },
      skip,
      take: items_per_page,

      relations: {
        translations: {
          categoryLanguage: true,
        },
        bookings: {
          bookingDetails: {
            tickets: true,
          },
        },
      },
    });

    // Tính tổng vé và doanh thu cho từng phim
    const result = movies.map((movie) => {
      const totalTicketsSold = movie.bookings.reduce((acc, booking) => {
        return acc + booking.totalTickets;
      }, 0);

      const totalRevenue = movie.bookings.reduce((acc, booking) => {
        return (
          acc +
          booking.bookingDetails.tickets.reduce((ticketAcc, ticket) => {
            return ticketAcc + ticket.ticketPrice * ticket.quantity;
          }, 0)
        );
      }, 0);

      const movieName =
        movie.translations &&
        movie.translations.find(
          (t) => t.categoryLanguage.languageCode === languageCode,
        )
          ? movie.translations.find(
              (t) => t.categoryLanguage.languageCode === languageCode,
            )?.name
          : 'Unknown'; // Default value if translations is undefined or doesn't contain the desired language

      return {
        id: movie.id,
        name: movieName,
        totalTicketsSold,
        totalRevenue,
      };
    });
    let totalTicketsSold = 0;
    let totalRevenue = 0;
    movies.forEach((movie) => {
      movie.bookings.forEach((booking) => {
        booking.bookingDetails.tickets.forEach((ticket) => {
          totalTicketsSold += ticket.quantity;
          totalRevenue += ticket.ticketPrice;
        });
      });
    });
    result.sort((a, b) => b.totalRevenue - a.totalRevenue);
    // Trả về kết quả
    return {
      total,
      page,
      items_per_page,
      totalTicketsSold,
      totalRevenue,
      data: result,
    };
  }

  async findOne(id: string) {
    return this.moviesRepository.findOne({
      where: { id },
      relations: {
        translations: {
          categoryLanguage: true,
        },
        genres: {
          movieGenreTranslation: true,
        },

        showTimes: {
          room: {
            branch: {
              translations: {
                categoryLanguage: true,
              },
            },
            seatMaps: true,
          },
        },
        comments: {
          user: true,
        },
      },
      select: {
        id: true,
        director: true,
        cast: true,
        releaseDate: true,
        duration: true,
        language: true,
        country: true,
        rating: true,
        poster_url: true,
        trailer_url: true,
        numberOfTicketsSold: true,
        translations: {
          id: true,
          name: true,
          description: true,
          categoryLanguage: {
            id: true,
            languageCode: true,
          },
        },
        genres: {
          id: true,
          movieGenreTranslation: {
            id: true,
            name: true,
            categoryLanguage: {
              languageCode: true,
            },
          },
        },
        showTimes: {
          id: true,
          show_time_start: true,
          show_time_end: true,
          price: true,
          room: {
            id: true,
            name: true,
            screeningType: true,
            totalSeats: true,
            branch: {
              id: true,
              email: true,
              translations: {
                id: true,
                name: true,
                languageCode: true,
                address: true,
                categoryLanguage: {
                  id: true,
                },
              },
            },
            seatMaps: {
              id: true,
              row: true,
              count: true,
            },
          },
        },
        comments: {
          id: true,
          comment: true,
          rating: true,
          createdAt: true,
          user: {
            id: true,

            firstName: true,
            lastName: true,
            avatar: true,
            email: true,
          },
        },

        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async findOneSelect(id: string, query: FilterSelectMoviesDto) {
    const languageCode = query.languageCode || 'vi';
    return this.moviesRepository.findOne({
      where: {
        id,
        translations: {
          categoryLanguage: {
            languageCode: Equal(languageCode),
          },
        },
        showTimes: {
          room: {
            branch: {
              translations: {
                languageCode: Equal(languageCode),
              },
            },
            seatMaps: true,
          },
        },
        // genres: {
        //   movieGenreTranslation: {
        //     categoryLanguage: {
        //       languageCode: Equal(languageCode),
        //     },
        //   },
        // },
      },
      relations: {
        translations: {
          categoryLanguage: true,
        },
        // genres: {
        //   movieGenreTranslation: true,
        // },

        showTimes: {
          room: {
            branch: {
              translations: true,
            },
            seatMaps: true,
          },
        },
        // comments: {
        //   user: true,
        // },
      },
      select: {
        id: true,
        poster_url: true,
        numberOfTicketsSold: true,
        translations: {
          id: true,
          name: true,
          description: true,
          categoryLanguage: {
            id: true,
            languageCode: true,
          },
        },
        // genres: {
        //   id: true,
        //   movieGenreTranslation: {
        //     id: true,
        //     name: true,
        //     categoryLanguage: {
        //       languageCode: true,
        //     },
        //   },
        // },
        showTimes: {
          id: true,
          show_time_start: true,
          show_time_end: true,
          price: true,
          room: {
            id: true,
            name: true,
            // screeningType: true,
            totalSeats: true,
            branch: {
              id: true,
              // email: true,
              translations: {
                // id: true,
                name: true,
                languageCode: true,
                // address: true,
                // categoryLanguage: {
                //   id: true,
                // },
              },
            },
            seatMaps: {
              id: true,
              row: true,
              count: true,
            },
          },
        },
        // comments: {
        //   id: true,
        //   comment: true,
        //   rating: true,
        //   createdAt: true,
        //   user: {
        //     id: true,

        //     firstName: true,
        //     lastName: true,
        //     avatar: true,
        //     email: true,
        //   },
        // },

        createdAt: true,
      },
    });
  }
  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      const folder = 'movies';
      const fileName = `${uuidv4()}-${file.originalname}`;
      const filePath = `${folder}/${fileName}`;
      const fileUpload = bucket.file(filePath);

      await fileUpload.save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      });

      const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filePath)}?alt=media`;

      return fileUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new InternalServerErrorException('Image upload failed');
    }
  }
  async update(
    id: string,
    updateMovieDto: UpdateMoviesDto,
  ): Promise<UpdateResult> {
    return this.moviesRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const movie = await transactionalEntityManager.findOne(Movie, {
          where: { id },
          relations: ['translations', 'genres'],
        });

        if (!movie) {
          throw new NotFoundException('Movie not found');
        }

        // Handle translations
        if (updateMovieDto.translations) {
          for (const translationDto of updateMovieDto.translations) {
            await transactionalEntityManager.upsert(
              MovieTranslations,
              { ...translationDto, movie: { id } },
              ['movie', 'categoryLanguage'],
            );
          }
        }

        if (updateMovieDto.genres) {
          const genreIds = updateMovieDto.genres.map((genre) => genre.id);
          const movieGenres = await transactionalEntityManager.findBy(
            MovieGenres,
            {
              id: In(genreIds),
            },
          );
          movie.genres = movieGenres;
          await transactionalEntityManager.save(Movie, movie);
        }

        const { translations, genres, ...movieUpdateData } = updateMovieDto;

        return transactionalEntityManager.update(Movie, id, movieUpdateData);
      },
    );
  }
  async remove(id: string): Promise<void> {
    const movie = await this.moviesRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    // If a poster URL exists, delete the image from Firebase
    if (movie.poster_url) {
      try {
        const imagePath = decodeURIComponent(
          new URL(movie.poster_url).pathname.split('/o/')[1],
        );
        const file = bucket.file(imagePath);

        const [exists] = await file.exists();
        if (exists) {
          await file.delete();
          // console.log(`Successfully deleted image: ${imagePath}`);
        }
      } catch (error) {
        console.error('Error deleting image from Firebase:', error);
        throw new InternalServerErrorException('Failed to delete image');
      }
    }

    // Delete the movie record
    await this.moviesRepository.delete({ id });
  }
}
