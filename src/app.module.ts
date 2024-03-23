import { PokedexModule } from './pokedex_list/pokedex.module';
import { User_teamModule } from "./user_team/user_team.module";
import { TeamModule } from "./pokemon_team_entity/team.module";
import { ListModule } from "./list_pokemon_teams/list.module";
import { UsersModule } from "./users/users.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { join } from "path";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
        PokedexModule, 
    User_teamModule,
    TeamModule,
    ListModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "password",
      database: "pokedex_database",
      entities: [join(__dirname, "**", "*.entity.{ts,js}")],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [ AppController],
  providers: [ AppService],
})
export class AppModule {}
