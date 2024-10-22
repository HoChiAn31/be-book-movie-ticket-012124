import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BranchModule } from './branch/branch.module';
import { BranchTranslationModule } from './branch-translation/branch-translation.module';
import { CategoryLanguageModule } from './category-language/category-language.module';
import { MovieGenresModule } from './movie-genres/movie-genres.module';
import { PromotionsModule } from './promotions/promotions.module';
import { PromotionTranslationService } from './promotion-translation/promotion-translation.service';
import { PromotionTranslationModule } from './promotion-translation/promotion-translation.module';
import { RoomsService } from './rooms/rooms.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsModule } from './rooms/rooms.module';
import { SeatMapsModule } from './seat-maps/seat-maps.module';
import { SeatMapTranslationModule } from './seat-map-translation/seat-map-translation.module';
import { PaymentController } from './payment/payment.controller';
import { PaymentModule } from './payment/payment.module';

import { FoodDrinksModule } from './food-drinks/food-drinks.module';
import { FoodDrinkTranslationsService } from './food-drink-translations/food-drink-translations.service';
import { FoodDrinkTranslationsController } from './food-drink-translations/food-drink-translations.controller';
import { FoodDrinkTranslationsModule } from './food-drink-translations/food-drink-translations.module';
import { BookingsController } from './bookings/bookings.controller';
import { BookingsModule } from './bookings/bookings.module';
import { BookingDetailsService } from './booking-details/booking-details.service';
import { BookingDetailsModule } from './booking-details/booking-details.module';
import { ShowTimesController } from './show-times/show-times.controller';
import { ShowTimesModule } from './show-times/show-times.module';
import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';
import { MovieTranslationsController } from './movie-translations/movie-translations.controller';
import { MovieTranslationsModule } from './movie-translations/movie-translations.module';

import { Movie } from './movies/entities/movies.entity';
import { MovieTranslationsService } from './movie-translations/movie-translations.service';
import { TicketsModule } from './tickets/tickets.module';
import { BookingDetailsController } from './booking-details/booking-details.controller';
import { MovieGenresService } from './movie-genres/movie-genres.service';
import { MovieGenresController } from './movie-genres/movie-genres.controller';
import { MovieGenreTranslstionsModule } from './movie-genres-translations/movie-genres-traslations.module';
import { MovieGenresTranslationService } from './movie-genres-translations/movie-genres-traslations.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Movie]),
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    BranchModule,
    BranchTranslationModule,
    CategoryLanguageModule,
    MovieGenresModule,
    PromotionsModule,
    PromotionTranslationModule,
    RoomsModule,
    SeatMapsModule,
    SeatMapTranslationModule,
    PaymentModule,
    FoodDrinksModule,
    FoodDrinkTranslationsModule,
    BookingsModule,
    BookingDetailsModule,
    ShowTimesModule,
    MoviesModule,
    MovieTranslationsModule,
    TicketsModule,
    BookingDetailsModule,
    MovieGenreTranslstionsModule,
  ],
  controllers: [
    AppController,
    RoomsController,
    PaymentController,
    FoodDrinkTranslationsController,
    ShowTimesController,
    MovieTranslationsController,
    MovieGenresController,
  ],
  providers: [
    AppService,
    PromotionTranslationService,
    RoomsService,
    FoodDrinkTranslationsService,
    MoviesService,
    MovieTranslationsService,
    MovieGenresTranslationService,
    MovieGenresService,
  ],
})
export class AppModule {}
