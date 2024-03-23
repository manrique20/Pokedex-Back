import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersEntity } from "./users.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    const users = await this.usersRepository.find();
    this.logger.log(`Users ${users.length} found`);
    this.logger.debug(users);
    return users;
  }

  async findOne(id: number): Promise<UsersEntity | undefined> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async create(user: UsersEntity): Promise<UsersEntity> {
    return await this.usersRepository.save(user);
  }

  async update(id: any, user: UsersEntity): Promise<UsersEntity> {
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOne(id);
  }

  async deleteUser(id: number): Promise<UsersEntity | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }
    await this.usersRepository.remove(user);
    return;
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UsersEntity | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return user;
      }
    }
    return null;
  }
}
