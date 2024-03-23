import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("pokemon_team")
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_trainer: number;

  @Column()
  pokemon_list: number;
}
