import "reflect-metadata";
import { DataSource } from "typeorm";
const password = process.env.DATABASE_PASSWORD;
import { User } from "./entites/user";
import { UserAuth } from "./entites/userAuth";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: `mongodb+srv://Jenny:${password}@atlascluster.vtei8rm.mongodb.net/?retryWrites=true&w=majority`,
  useNewUrlParser: true,
  database: "blog",
  useUnifiedTopology: true,
  entities: [User, UserAuth],
  synchronize: true,
  logging: true,
});
