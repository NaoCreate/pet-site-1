import { client } from '../client';
import type { Pet } from './types';
import type { MicroCMSResponse } from '../types';

// 最新のペット情報を取得
export async function getLatestPets(limit: number = 9): Promise<Pet[]> {
  try {
    const response = await client.getList<Pet>({
      endpoint: 'individual',
      queries: {
        limit,
        orders: '-birthday',
      },
    });
    return response.contents;
  } catch (error) {
    console.error('Error fetching latest pets:', error);
    return [];
  }
}

// 特定の動物種類に属するペット一覧を取得
export async function getPetsByAnimalType(animalType: string): Promise<Pet[]> {
  try {
    const response = await client.getList<Pet>({
      endpoint: 'individual',
      queries: {
        filters: `animalType[equals]${animalType}`,
        limit: 100,
      },
    });
    return response.contents;
  } catch (error) {
    console.error(`Error fetching pets for ${animalType}:`, error);
    return [];
  }
}