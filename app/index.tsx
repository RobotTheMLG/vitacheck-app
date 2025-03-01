import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useState } from "react";
import { Button, Image, LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigationBarColor } from "../src/hooks/useNavigationBarColor"; // Import the hook

// Keep the splash screen visible until the index page is ready
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const [continuePressed, setContinuePressed] = useState(false);

  // Ensure navigation bar color is white
  useNavigationBarColor("white");

  // This runs only when the screen has finished rendering
  const onLayout = async (event: LayoutChangeEvent) => {
    console.log("Screen rendered:", event.nativeEvent.layout); // Debugging
    if (!isReady) {
      console.log("Attempting to hide Splash Screen...");
      setIsReady(true);
      
      try {
        await SplashScreen.hideAsync();
        console.log("Splash Screen Hidden Successfully!");
      } catch (error) {
        console.error("Error hiding Splash Screen:", error);
      }
    }
  };

  if (continuePressed) {
    return <Redirect href="/HomeScreen" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container} onLayout={onLayout}>
        <Image source={require("../assets/images/icon.png")} style={styles.image} />
        <Text style={styles.title}>Welcome to VitaCheck!</Text>
        <Text style={styles.subtitle}>Your health companion app.</Text>
        <Button title="Continue" onPress={() => setContinuePressed(true)} />
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
