import { StyleSheet, Text, View } from "react-native";
import { useNavigationBarColor } from "../src/hooks/useNavigationBarColor"; // Import the hook

export default function HomeScreen() {
  useNavigationBarColor("white"); // Ensures nav bar is white on home screen

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen</Text>
    </View>
  );
}

// Define styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // Matches the navigation bar color
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
