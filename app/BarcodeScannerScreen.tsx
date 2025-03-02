import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { fetchFoodDetails } from "../src/services/api";
import { validateBarcode } from "../src/utils/validateBarcode";

export default function BarcodeScannerScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Hide the bottom tab bar when scanner screen is active
      console.log("Hiding navigation bar.");
      navigation.setOptions({ tabBarStyle: { display: "none" } });
  
      return () => {
        // Restore tab bar when leaving (even with back button)
        console.log("Showing navigation bar.");
        navigation.setOptions({ tabBarStyle: { display: "flex" } });
      };
    }, [navigation])
  );

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (!validateBarcode(data)) {
      Alert.alert("Invalid Barcode", "Please scan a valid UPC/EAN/ISBN barcode.");
      return;
    }

    setScanned(true); // Prevent multiple scans
    try {
      console.log("Fetching food details for barcode:", data);
      const foodItem = await fetchFoodDetails(data);

      if (!foodItem) {
        Alert.alert("Not Found", "No food details found for this barcode.");
        setScanned(false);
        return;
      }

      // ✅ Convert food item into URL-friendly query parameters
      router.push({
        pathname: "/FoodDetailsScreen",
        params: {
          barcode: foodItem.barcode,
          name: foodItem.name,
          brand: foodItem.brand,
          calories: foodItem.calories.toString(), // Convert number to string
          protein: foodItem.nutrients.protein.toString(),
          fat: foodItem.nutrients.fat.toString(),
          carbs: foodItem.nutrients.carbs.toString(),
          imageUrl: foodItem.imageUrl || "",
        },
      });

    } catch (error) {
      console.error("Error fetching food details:", error);
      Alert.alert("Error", "Could not fetch food details. Try again.");
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}
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
