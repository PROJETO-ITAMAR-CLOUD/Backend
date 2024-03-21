import { Injectable } from '@nestjs/common';
import PrismaInstance from 'src/shared/utils/prisma.client';
import { PrismaClient } from '@prisma/client';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { TOmitProperty } from 'src/shared/types/property.type';

@Injectable()
export class PropertyRepository {
  async create(createPropertyDto: CreatePropertyDto): Promise<TOmitProperty> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const createdProperty: TOmitProperty = await prismaInstance.property.create(
      {
        data: {
          type: createPropertyDto.type,
          address: createPropertyDto.address,
          description: createPropertyDto.description,
          imageUrl: createPropertyDto.imageUrl,
          price: createPropertyDto.price,
          userId: createPropertyDto.userId,
          status: createPropertyDto.status,
        },
        select: {
          id: true,
          type: true,
          address: true,
          description: true,
          imageUrl: true,
          userId: true,
          price: true,
          status: true,
        },
      },
    );

    return createdProperty;
  }

  async findAll(): Promise<TOmitProperty[]> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const allProperties: TOmitProperty[] =
      await prismaInstance.property.findMany({
        select: {
          id: true,
          type: true,
          address: true,
          description: true,
          userId: true,
          imageUrl: true,
          price: true,
          status: true,
        },
        where: {
          deletedAt: null,
        },
      });

    return allProperties;
  }

  async findOne(id: number): Promise<TOmitProperty> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const property: TOmitProperty = await prismaInstance.property.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
      select: {
        id: true,
        type: true,
        address: true,
        userId: true,
        description: true,
        imageUrl: true,
        price: true,
        status: true,
      },
    });

    return property;
  }

  async addImage(id: number, imageUrl: string): Promise<TOmitProperty> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const updatedProperty: TOmitProperty = await prismaInstance.property.update(
      {
        where: {
          id: id,
          deletedAt: null,
        },
        data: {
          imageUrl: {
            push: imageUrl,
          },
        },
        select: {
          id: true,
          type: true,
          address: true,
          description: true,
          userId: true,
          imageUrl: true,
          price: true,
          status: true,
        },
      },
    );

    return updatedProperty;
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<TOmitProperty> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const updatedProperty: TOmitProperty = await prismaInstance.property.update(
      {
        where: {
          id: id,
          deletedAt: null,
        },
        data: {
          type: updatePropertyDto.type,
          address: updatePropertyDto.address,
          description: updatePropertyDto.description,
          imageUrl: updatePropertyDto.imageUrl,
          price: updatePropertyDto.price,
          status: updatePropertyDto.status,
          userId: updatePropertyDto.userId,
        },
        select: {
          id: true,
          type: true,
          address: true,
          userId: true,
          description: true,
          imageUrl: true,
          price: true,
          status: true,
        },
      },
    );

    return updatedProperty;
  }

  async remove(id: number): Promise<TOmitProperty> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const deletedProperty: TOmitProperty = await prismaInstance.property.update(
      {
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
        select: {
          id: true,
          type: true,
         userId: true,
          address: true,
          description: true,
          imageUrl: true,
          price: true,
          status: true,
        },
      },
    );

    return deletedProperty;
  }
}
