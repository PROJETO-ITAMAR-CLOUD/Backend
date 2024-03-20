import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { HashUtil } from 'src/shared/utils/hash.util';
import { TOmitUser } from 'src/shared/types/user.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto): Promise<TOmitUser> {
    const hashedPassword: string = await HashUtil.hashPassword(
      createUserDto.password,
    );
    createUserDto.password = hashedPassword;
    const createdUser: TOmitUser =
      await this.userRepository.create(createUserDto);
    return createdUser;
  }

  async createUserAdmin(createUserDto: CreateUserDto): Promise<TOmitUser> {
    const hashedPassword: string = await HashUtil.hashPassword(
      createUserDto.password,
    );
    createUserDto.password = hashedPassword;
    const createdUser: TOmitUser =
      await this.userRepository.createUserAdmin(createUserDto);
    return createdUser;
  }

  async findAll(): Promise<TOmitUser[]> {
    const allUser: TOmitUser[] = await this.userRepository.findAll();
    return allUser;
  }

  async findOne(id: number): Promise<TOmitUser> {
    const user: TOmitUser = await this.userRepository.findOne(id);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<TOmitUser> {
    const updatedUser: TOmitUser = await this.userRepository.update(
      id,
      updateUserDto,
    );
    return updatedUser;
  }

  async remove(id: number): Promise<TOmitUser> {
    const deletedUser: TOmitUser = await this.userRepository.remove(id);
    return deletedUser;
  }
}
