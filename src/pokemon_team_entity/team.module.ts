import { TypeOrmModule } from "@nestjs/typeorm";
import { TeamService } from "./team.service";
import { Module } from "@nestjs/common";
import { TeamEntity } from "./team.entity";
import { TeamController } from "./team.controller";

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity])],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TypeOrmModule, TeamService]
})
export class TeamModule {}
