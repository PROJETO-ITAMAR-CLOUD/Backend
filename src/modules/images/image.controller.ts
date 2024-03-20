import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PropertyService } from '../property/property.service';

@Controller('images')
export class ImageController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get(':id')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    const property = await this.propertyService.findOne(+id);

    return res.sendFile(property.imageUrl, { root: 'uploads' });
  }
}
