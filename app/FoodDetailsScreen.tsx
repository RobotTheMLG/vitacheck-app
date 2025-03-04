import { Image, StyleSheet, Text, View } from "react-native";
import { useScannerContext } from "../src/context/ScannerContext";

export default function FoodDetailsScreen() {
  const { scannedItem } = useScannerContext();

  if (!scannedItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No food item scanned yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {scannedItem.imageUrl && <Image source={{ uri: scannedItem.imageUrl }} style={styles.image} />}
      <Text style={styles.title}>{scannedItem.name}</Text>
      <Text>Brand: {scannedItem.brand}</Text>
      <Text>Calories: {scannedItem.calories} kcal</Text>
      <Text>Protein: {scannedItem.nutrients.protein}g</Text>
      <Text>Fat: {scannedItem.nutrients.fat}g</Text>
      <Text>Carbs: {scannedItem.nutrients.carbs}g</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
