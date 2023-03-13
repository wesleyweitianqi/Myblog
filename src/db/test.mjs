import { getMongoRepository } from "typeorm";
import { User } from "./entites/index";
import { AppDataSource } from "./index";

const login = async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("connnected to mongodb");
    })
    .catch((error) => console.log(error));

  const UserRepository = getMongoRepository(User);
  const newUser = new User();
  newUser.name = "wesley";
  newUser.email = "wesley@wei.ca";
  UserRepository.save(newUser);
  const allUsers = await UserRepository.find();
  console.log("🚀 ~ file: login.ts:18 ~ login ~ allUsers:", allUsers);
};

login();
