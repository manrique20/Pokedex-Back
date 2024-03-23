import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('list_pokemon_teams')
export class List_pokemon_teamsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pokemon_1: number

  @Column()
  pokemon_2: number

  @Column()
  pokemon_3: number

  @Column()
  pokemon_4: number

  @Column()
  pokemon_5: number

  @Column()
  pokemon_6: number

}