export class CreatePropertyDto {
  id?: number;
  type: string; // Tipo de imóvel (casa, apartamento, terreno, etc.)
  address: string; // Endereço completo
  description: string; // Descrição do imóvel
  imageUrl?: string; // Lista de URLs das fotos do imóvel
  userId: number; // ID do usuário que cadastrou o imóvel
  price: number; // Preço de venda ou aluguel
  status: string; // Status do imóvel (disponível, vendido, alugado, etc.)
  createdAt?: Date;
  updatedAt?: Date;
}
