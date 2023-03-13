import { EntityRepository, Repository } from "typeorm";
import { User } from "@/db/entites/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
