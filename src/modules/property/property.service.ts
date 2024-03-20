import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { TOmitProperty } from 'src/shared/types/property.type';

@Injectable()
export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}
  async create(createPropertyDto: CreatePropertyDto): Promise<TOmitProperty> {
    const createdProperty: TOmitProperty =
      await this.propertyRepository.create(createPropertyDto);

    return createdProperty;
  }

  async findAll(): Promise<TOmitProperty[]> {
    const allPropertys: TOmitProperty[] = await this.propertyRepository.findAll();
    return allPropertys;
  }

  async findOne(id: number): Promise<TOmitProperty> {
    const property: TOmitProperty = await this.propertyRepository.findOne(id);

    return property;
  }

  async addImage(id: number, imageUrl: string): Promise<TOmitProperty> {
    const updatedProperty: TOmitProperty = await this.propertyRepository.addImage(
      id,
      imageUrl,
    );
    return updatedProperty;
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<TOmitProperty> {
    const updatedProperty: TOmitProperty = await this.propertyRepository.update(
      id,
      updatePropertyDto,
    );
    return updatedProperty;
  }

  async remove(id: number): Promise<TOmitProperty> {
    const deletedProperty: TOmitProperty = await this.propertyRepository.remove(id);
    return deletedProperty;
  }
}
