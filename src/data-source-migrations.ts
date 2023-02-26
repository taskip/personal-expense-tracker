import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USERNAME ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? '',
    database: process.env.POSTGRES_DATABASE ?? 'postgres',
    synchronize: true,
    logging: true,
    entities: ["src/entity/*ts"],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
})
