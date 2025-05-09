import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Welcome to BossPaCheque</Text>
        <Text style={styles.subtitle}>Choose an option to get started:</Text>

        {/* Upload Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/upload")}
        >
          <Text style={styles.buttonText}>Upload and Clean Dataset</Text>
        </TouchableOpacity>

        {/* Help Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/help")}
        >
          <Text style={styles.buttonText}>How to Use This App</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  main: {
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#3c6e71",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});