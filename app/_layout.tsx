import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { ScannerProvider } from "../src/context/ScannerContext"; // Import ScannerProvider
import { useNavigationBarColor } from "../src/hooks/useNavigationBarColor"; // Import the hook

export default function RootLayout() {
  // Ensure navigation bar color is white on Android
  if (Platform.OS === "android") {
    useNavigationBarColor("white");
  }

  // Initialize SafeAreaInsets
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <ScannerProvider> 
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#4CAF50",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: [
              styles.tabBar,
              {
                height: Platform.OS === "ios" ? 55 + insets.bottom : 65 // Add bottom insets for iOS
              },
            ],
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="ScannerScreen"
            options={{
              title: "Scan",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="camera-alt" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="SettingsScreen"
            options={{
              title: "Settings",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="settings" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="FoodDetailsScreen"
            options={{
              title: "Food Details",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="fastfood" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </ScannerProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white"
  },
});
