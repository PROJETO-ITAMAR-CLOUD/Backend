import { Property } from '@prisma/client';

export type TOmitProperty = Omit<Property, 'createdAt' | 'updatedAt' | 'deletedAt'>;
