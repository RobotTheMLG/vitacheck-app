import { Camera } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useScannerContext } from "../context/ScannerContext";
import { fetchFoodDetails } from "../services/api";
import { validateBarcode } from "../utils/validateBarcode";

export const useScanner = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const { setScannedItem } = useScannerContext();
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

      setScannedItem(foodItem); // Store scanned item
      router.push("/FoodDetailsScreen"); // Navigate
    } catch (error) {
      Alert.alert("Error", "Could not fetch food details. Try again.");
      setScanned(false);
    }
  };

  return { hasPermission, scanned, setScanned, handleBarCodeScanned };
};
