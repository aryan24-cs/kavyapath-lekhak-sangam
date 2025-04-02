
export type Category = {
  id: string;
  name: string;
  nameEn: string;
  color: string;
};

export const categories: Category[] = [
  {
    id: "prem",
    name: "प्रेम",
    nameEn: "Love",
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100"
  },
  {
    id: "virah",
    name: "विरह",
    nameEn: "Separation",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
  },
  {
    id: "deshbhakti",
    name: "देशभक्ति",
    nameEn: "Patriotism",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
  },
  {
    id: "prakriti",
    name: "प्रकृति",
    nameEn: "Nature",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
  },
  {
    id: "adhyatm",
    name: "अध्यात्म",
    nameEn: "Spiritual",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
  }
];
