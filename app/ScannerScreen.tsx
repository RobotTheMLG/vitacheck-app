import { CameraView } from "expo-camera";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScannerOverlay from "../src/components/ScannerOverlay";
import { useScanner } from "../src/hooks/useScanner";

export default function ScannerScreen() {
  const { hasPermission, scanned, setScanned, handleBarCodeScanned } = useScanner();

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fullscreen Camera */}
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "upc_a"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Transparent Overlay */}
      <ScannerOverlay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
