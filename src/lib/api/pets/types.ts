// ペットの基本情報の型定義
export type PetBase = {
  id: string;
  petNumber: string;
  animalType: string;
  classification: 'bloodline' | 'mix';
  breedTypeJa: string;
  breedTypeEn: string;
  parentBreed: string;
};

// ペットの詳細情報の型定義
export type PetDetails = {
  color: string;
  gender: string;
  birthday: string;
  store: string;
  petDescription: string;
};

// ペットのメディア情報の型定義
export type PetMedia = {
  imageUrl01: string;
  imageUrl02: string;
  imageUrl03: string;
  imageUrl04: string;
  imageUrl05: string;
  videoUrl: string;
};

// 完全なペット情報の型定義
export type Pet = PetBase & PetDetails & PetMedia;

// 犬種/猫種の型定義
export type Breed = {
  name: string;
  url: string;
};

// サブメニュー項目の型定義
export type SubmenuItem = {
  type: string;
  breeds: Breed[];
  hasMix: boolean;
};