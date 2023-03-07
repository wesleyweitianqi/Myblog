import "reflect-metadata";
import { createConnection, Connection} from 'typeorm';
const password = process.env.DATABASE_PASSWORD;

export default async function  connectToDatabase():Promise<Connection> {
  const connection = await createConnection({
    type: 'mysql',
    host: "3.16.137.77",
    port: 3306,
    username: "root",
    password: password,
    database: "blog",
    entities: [
      // list of entity classes
    ],
    synchronize: true,
  }).then(()=> {
    console.log("connected to database")
  }).catch(err => {
    console.log(err)
  })

  return connection;
}