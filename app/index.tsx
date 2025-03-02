import * as SplashScreen from "expo-splash-screen";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDelay } from "../src/hooks/useDelay"; // Import the hook
import { useNavigationBarColor } from "../src/hooks/useNavigationBarColor"; // Import the hook

// Keep the splash screen visible until the index page is ready
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const delay = useDelay(); // Initialize the delay function

  // Ensure navigation bar color is white
  useNavigationBarColor("white");

  // This runs only when the screen has finished rendering
  const onLayout = async () => {

    if (!isReady) {
      console.log("Screen rendered!");
      await delay(200); // Delay for 200ms
      console.log("Attempting to hide Splash Screen...");

      setIsReady(true);
      
      try {
        await delay(400); // Delay for 400ms
        await SplashScreen.hideAsync();
        console.log("Splash Screen Hidden Successfully!");
      } catch (error) {
        await delay(400); // Delay for 400ms
        console.error("Error hiding Splash Screen:", error);

        // Show an alert if hiding the splash screen fails
        Alert.alert(
          "Error",
          "Something went wrong while hiding the splash screen."
        );
      }
    }
  };

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
    backgroundColor: "white", // Background for the whole screen
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
