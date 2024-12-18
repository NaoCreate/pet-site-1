import type { Pet, Breed } from './types';
import { filterUniqueAndSort } from '../../utils/array';
import { getPetsByAnimalType } from './queries';

// 動物の種類一覧を取得
export async function getAnimalTypes(): Promise<string[]> {
  try {
    const response = await client.getList<Pet>({
      endpoint: 'individual',
      queries: { limit: 100 },
    });
    return filterUniqueAndSort(response.contents.map(pet => pet.animalType));
  } catch (error) {
    console.error('Error fetching animal types:', error);
    return [];
  }
}

// 動物種類ごとの犬種/猫種情報を取得
export async function getBreedsByAnimalType(animalType: string) {
  try {
    const pets = await getPetsByAnimalType(animalType);
    
    // 血統書付きの犬種/猫種を抽出
    const pureBreeds = pets
      .filter(pet => pet.classification === 'bloodline')
      .map(pet => ({
        name: pet.breedTypeJa,
        url: `/animals/${animalType}/${encodeURIComponent(pet.breedTypeJa)}`
      }));

    // ミックスの存在確認
    const hasMix = pets.some(pet => pet.classification === 'mix');

    // 重複を除去してソート
    const uniquePureBreeds = filterUniqueBreeds(pureBreeds);

    return { pureBreeds: uniquePureBreeds, hasMix };
  } catch (error) {
    console.error(`Error getting breeds for animal type ${animalType}:`, error);
    return { pureBreeds: [], hasMix: false };
  }
}

// 重複する犬種/猫種を除去してソート
function filterUniqueBreeds(breeds: Breed[]): Breed[] {
  return breeds
    .reduce((acc, current) => {
      const exists = acc.find(item => item.name === current.name);
      if (!exists && current.name) {
        acc.push(current);
      }
      return acc;
    }, [] as Breed[])
    .sort((a, b) => a.name.localeCompare(b.name, 'ja'));
}