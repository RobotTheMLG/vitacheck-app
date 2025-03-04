import * as SplashScreen from "expo-splash-screen";
import { useRef, useState } from "react";
import { Alert } from "react-native";
import { useDelay } from "./useDelay"; // Import delay hook

export function useSplashScreen() {
  const [isReady, setIsReady] = useState(false);
  const layoutHandled = useRef(false); // Prevent onLayout from running multiple times
  const delay = useDelay(); // Initialize the delay function

  // Keep the splash screen visible until ready
  SplashScreen.preventAutoHideAsync();

  // Ensure onLayout only runs once
  const onLayout = async () => {
    if (layoutHandled.current) return; // Prevent multiple executions
    layoutHandled.current = true; // Mark as handled

    console.log("Screen rendered!");
    await delay(200);
    console.log("Attempting to hide Splash Screen...");

    setIsReady(true);

    try {
      await delay(400);
      await SplashScreen.hideAsync();
      console.log("Splash Screen Hidden Successfully!");
    } catch (error) {
      await delay(400);
      console.error("Error hiding Splash Screen:", error);
      Alert.alert("Error", "Something went wrong while hiding the splash screen.");
    }
  };

  return { isReady, onLayout };
}
