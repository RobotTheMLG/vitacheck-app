export async function fetchFoodDetails(barcode: string) {
    try {
      const response = await fetch(`https://api.example.com/food/${barcode}`);
      if (!response.ok) {
        throw new Error("Food item not found");
      }
      const data = await response.json();
      return data; // Return food details
    } catch (error) {
      console.error("API Error:", error);
      return null;
    }
  }
  