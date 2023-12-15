import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
export default class User extends Model<User> {
  @Column({ unique: true }) // Enforce uniqueness on 'name' column
  name!: string;

  @Column
  phone!: string;

  @Column({ unique: true }) // Enforce uniqueness on 'email' column
  email!: string;

  @Column(DataType.ARRAY(DataType.STRING))
  hobbies!: string[];
}
