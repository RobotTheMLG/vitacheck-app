import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSplashScreen } from "../src/hooks/useSplashScreen"; // Import splash screen hook

export default function Index() {
  const { isReady, onLayout } = useSplashScreen(); // Use the splash screen logic

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container} onLayout={onLayout}>
        <Image source={require("../assets/images/icon.png")} style={styles.image} />
        <Text style={styles.title}>Welcome to VitaCheck!</Text>
        <Text style={styles.subtitle}>Your health companion app.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
});
