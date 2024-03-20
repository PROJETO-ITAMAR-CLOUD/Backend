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
    const createdProperty: TOmitProperty = await prismaInstance.property.create({
      data: {
        name: createPropertyDto.name,
        preparation: createPropertyDto.preparation,
        ingredients: createPropertyDto.ingredients,
        userId: createPropertyDto.userId,
      },
      select: {
        id: true,
        ingredients: true,
        imageUrl: true,
        name: true,
        preparation: true,
        userId: true,
      },
    });

    return createdProperty;
  }

  async findAll(): Promise<TOmitProperty[]> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const allPropertys: TOmitProperty[] = await prismaInstance.property.findMany({
      select: {
        id: true,
        name: true,
        userId: true,
        imageUrl: true,
        ingredients: true,
        preparation: true,
      },
      where: {
        deletedAt: null,
      },
    });

    return allPropertys;
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
        name: true,
        userId: true,
        imageUrl: true,
        ingredients: true,
        preparation: true,
      },
    });

    return property;
  }

  async addImage(id: number, imageUrl: string): Promise<TOmitProperty> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const updatedProperty: TOmitProperty = await prismaInstance.property.update({
      where: {
        id: id,
        deletedAt: null,
      },
      data: {
        imageUrl: imageUrl,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        imageUrl: true,
        ingredients: true,
        preparation: true,
      },
    });

    return updatedProperty;
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<TOmitProperty> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const updatedProperty: TOmitProperty = await prismaInstance.property.update({
      where: {
        id: id,
        deletedAt: null,
      },
      data: {
        name: updatePropertyDto.name,
        preparation: updatePropertyDto.preparation,
        ingredients: updatePropertyDto.ingredients,
        userId: updatePropertyDto.userId,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        imageUrl: true,
        ingredients: true,
        preparation: true,
      },
    });

    return updatedProperty;
  }

  async remove(id: number): Promise<TOmitProperty> {
    const prismaInstance: PrismaClient = PrismaInstance.getInstance();
    const deletedProperty: TOmitProperty = await prismaInstance.property.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        userId: true,
        imageUrl: true,
        ingredients: true,
        preparation: true,
      },
    });

    return deletedProperty;
  }
}
