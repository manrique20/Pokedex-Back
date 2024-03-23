/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from "@nestjs/common";
import { UsersEntity } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class User_teamService {
  constructor(private readonly usersService: UsersService) {}

  encontrarUsuarioPorId = async (
    id: number,
  ): Promise<UsersEntity | undefined> => {
    return await this.usersService.findOne(id);
  };
}
