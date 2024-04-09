import { TeamEntity } from 'src/pokemon_team_entity/team.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
 // Importa el tipo TeamEntity si es necesario


@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => TeamEntity) // Ajusta el tipo si es necesario
  @JoinColumn()
  pokemon_team: TeamEntity;
}