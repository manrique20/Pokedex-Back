import { TypeOrmModule } from "@nestjs/typeorm";
import { List_pokemon_teamsEntity } from "./list.entity";
import { ListService } from "./list.service";
/*
https://docs.nestjs.com/modules
*/

import { Module } from "@nestjs/common";
import { ListController } from "./list.controller";

@Module({
  imports: [TypeOrmModule.forFeature([List_pokemon_teamsEntity])],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
