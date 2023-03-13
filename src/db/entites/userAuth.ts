import { Entity, BaseEntity, ObjectIdColumn, Column, ManyToOne } from "typeorm";
import { ObjectID } from "mongodb";
import { User } from "./user";

@Entity({ name: "userAuths" })
export class UserAuth extends BaseEntity {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  identity_type!: string;

  @Column()
  identifier!: string;

  @Column()
  credential!: string;

  @ManyToOne(() => User, { cascade: true })
  user!: User;
}
