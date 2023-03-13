import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  name!: string;

  @Column()
  avatar!: string;

  @Column()
  phone!: number;
}
