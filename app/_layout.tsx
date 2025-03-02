import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#4CAF50",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "white", height: 60 },
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
        <Tabs.Screen
          name="BarcodeScannerScreen"
          options={{ href: null }} // Hides screen from bottom tab bar
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
});
