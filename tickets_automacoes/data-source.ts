import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: process.env.MYSQL_TYPE as 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT as string),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  migrations: ['src/db/migrations/*.ts'],
  synchronize: true,
  logging: true,
  entities: ['src/*/*.entitiy.ts/*.ts'],
});
