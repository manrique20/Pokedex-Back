import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('list_pokemon_teams')
export class List_pokemon_teamsEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  trainer_id: number

  @Column({ nullable: true }) 
  pokemon_1: number

  @Column({ nullable: true }) 
  pokemon_2: number

  @Column({ nullable: true }) 
  pokemon_3: number

  @Column({ nullable: true }) 
  pokemon_4: number

  @Column({ nullable: true }) 
  pokemon_5: number

  @Column({ nullable: true }) 
  pokemon_6: number
  length: number;
  map: any;

  pokemonId:number
}
