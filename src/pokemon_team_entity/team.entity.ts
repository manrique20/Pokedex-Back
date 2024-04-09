import { List_pokemon_teamsEntity } from 'src/list_pokemon_teams/list.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';


@Entity("pokemon_team")
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_trainer: number;

  @Column()
  pokemon_list: number;

  @OneToOne(() => List_pokemon_teamsEntity)
  @JoinColumn()
  list: List_pokemon_teamsEntity;
}
