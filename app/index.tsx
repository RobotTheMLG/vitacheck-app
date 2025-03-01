import { Redirect } from "expo-router";
import { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigationBarColor } from "../src/hooks/useNavigationBarColor"; // Import the hook

export default function Index() {
  const [continuePressed, setContinuePressed] = useState(false);

  useNavigationBarColor("white"); // Ensures nav bar is white on splash screen

  if (continuePressed) {
    return <Redirect href="/HomeScreen" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
