import { useFocusEffect } from "@react-navigation/native";
import { Stack, useNavigation } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function BarcodeScannerView() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // Hide the bottom tab bar when scanner screen is active
      console.log("Hiding navigation bar.");
      navigation.setOptions({ tabBarStyle: { display: "none" } });
  
      return () => {
        // Restore tab bar when leaving (even with back button)
        console.log("Showing navigation bar.");
        navigation.setOptions({ tabBarStyle: { display: "flex" } });
      };
    }, [navigation])
  );

  return (
    <>
      {/* Ensure header is hidden */}
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.container}>
        <Text style={styles.text}>Barcode Scanner Screen</Text>
        {/* Scanner functionality will go here */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    color: "black",
    fontSize: 20,
  },
});
