export type FoodItem = {
    barcode: string;
    name: string;
    brand: string;
    calories: number;
    nutrients: {
      protein: number;
      fat: number;
      carbs: number;
    };
    imageUrl?: string;
  };
  