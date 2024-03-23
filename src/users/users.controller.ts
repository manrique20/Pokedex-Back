import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  HttpStatus,
  Res,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersEntity } from "./users.entity";
import hashPassword from "src/utils/passwords";
import { sign } from 'jsonwebtoken';

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UsersEntity[]> {
    return this.usersService.findAll();
  }
  @Delete(':id')
  async delete(@Param('id') id: number, @Res() response): Promise<void> {
    try {
      await this.usersService.deleteUser(id);
      response.status(HttpStatus.OK).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al eliminar usuario' });
    }
  }

  @Get(":id")
  async findOneById(@Param("id") id: string): Promise<UsersEntity | undefined> {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new NotFoundException("ID de usuario no válido");
    }
    return this.usersService.findOne(userId);
  }

  @Post("signup")
  async signUp(@Body() userDto: UsersEntity, @Res() response): Promise<any> {
    try {
      const password = await hashPassword(userDto.password)
      userDto.password = password
      const newUser = await this.usersService.create(userDto);
      return response
        .status(HttpStatus.CREATED)
        .json({ message: "User created succesfully", user: newUser });
    } catch (error) {
      console.log(error);
      
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed at creating user" });
    }
  }


  @Post("login")
  async login(
    @Body() credentials: { email: string; password: string },
    @Res() response,
  ): Promise<any> {
    try {
      const user = await this.usersService.validateUser(
        credentials.email,
        credentials.password,
      );
      if (user) {
        const token = sign({ userId: user.id }, 'tu_secreto', { expiresIn: '1d' });

        return response
          .status(HttpStatus.OK)
          .json({ message: "Inicio de sesión exitoso", token });
      } else {
        return response
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Credenciales inválidas" });
      }
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error interno del servidor" });
    }
  }
}
