import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { FoodItem } from "../src/types/FoodItem";

export default function FoodDetailsScreen() {
  const params = useLocalSearchParams();

  // Convert query params back into a FoodItem object
  const foodItem: FoodItem = {
    barcode: params.barcode as string,
    name: params.name as string,
    brand: params.brand as string,
    calories: Number(params.calories), // Convert back to number
    nutrients: {
      protein: Number(params.protein),
      fat: Number(params.fat),
      carbs: Number(params.carbs),
    },
    imageUrl: params.imageUrl ? (params.imageUrl as string) : undefined,
  };

  return (
    <View style={styles.container}>
      {foodItem.imageUrl && <Image source={{ uri: foodItem.imageUrl }} style={styles.image} />}
      <Text style={styles.title}>{foodItem.name}</Text>
      <Text>Brand: {foodItem.brand}</Text>
      <Text>Calories: {foodItem.calories} kcal</Text>
      <Text>Protein: {foodItem.nutrients.protein}g</Text>
      <Text>Fat: {foodItem.nutrients.fat}g</Text>
      <Text>Carbs: {foodItem.nutrients.carbs}g</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
