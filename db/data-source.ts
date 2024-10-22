import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost', // Use environment variable or default to 'localhost'
  port: Number(process.env.MYSQL_PORT) || 33061, // Use environment variable or default to 33061
  username: process.env.MYSQL_USER || 'root', // Use environment variable or default to 'root'
  password: process.env.MYSQL_PASSWORD || 'root', // Use environment variable or default to 'root'
  database: process.env.MYSQL_DATABASE_NAME || 'be-movie-21824', // Use environment variable or default to 'be-movie-21824'
  // entities: ['dist/**/*.entity.js'],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // migrations: ['dist/db/migrations/*.js'],
  migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
