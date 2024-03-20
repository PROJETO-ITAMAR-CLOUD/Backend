import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import PrismaInstance from 'src/shared/utils/prisma.client';
import { PrismaClient } from '@prisma/client';
import { TOmitUser, TOmitUserWithPassword } from 'src/shared/types/user.type';

@Injectable()
export class UserRepository {
  async create(createUserDto: CreateUserDto): Promise<TOmitUser> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const createdUser: TOmitUser = await prismaInstance.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return createdUser;
  }

  async createUserAdmin(createUserDto: CreateUserDto): Promise<TOmitUser> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const createdUser: TOmitUser = await prismaInstance.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        role: 'ADMIN',
      },
      select: {
        id: true,
        email: true,
      },
    });

    return createdUser;
  }

  async findAll(): Promise<TOmitUser[]> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const users: TOmitUser[] = await prismaInstance.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });

    return users;
  }

  async findOne(id: number): Promise<TOmitUser> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const user: TOmitUser = await prismaInstance.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return user;
  }

  async findOneByEmail(email: string): Promise<TOmitUserWithPassword> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const user: TOmitUserWithPassword = await prismaInstance.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<TOmitUser> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const updatedUser: TOmitUser = await prismaInstance.user.update({
      where: {
        id: id,
      },
      data: {
        email: updateUserDto.email,
        password: updateUserDto.password,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return updatedUser;
  }

  async remove(id: number): Promise<TOmitUser> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const deletedUser: TOmitUser = await prismaInstance.user.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
      },
    });

    return deletedUser;
  }
}
