import { Camera, CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { fetchFoodDetails } from "../src/services/api";
import { validateBarcode } from "../src/utils/validateBarcode";

export default function BarcodeScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (!validateBarcode(data)) {
      Alert.alert("Invalid Barcode", "Please scan a valid UPC/EAN/ISBN barcode.");
      return;
    }

    setScanned(true);
    try {
      const foodItem = await fetchFoodDetails(data);
      if (!foodItem) {
        Alert.alert("Not Found", "No food details found for this barcode.");
        setScanned(false);
        return;
      }

      router.push({
        pathname: "/FoodDetailsScreen",
        params: {
          barcode: foodItem.barcode,
          name: foodItem.name,
          brand: foodItem.brand,
          calories: foodItem.calories.toString(),
          protein: foodItem.nutrients.protein.toString(),
          fat: foodItem.nutrients.fat.toString(),
          carbs: foodItem.nutrients.carbs.toString(),
          imageUrl: foodItem.imageUrl || "",
        },
      });
    } catch (error) {
      Alert.alert("Error", "Could not fetch food details. Try again.");
      setScanned(false);
    }
  };

  if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "upc_a"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
