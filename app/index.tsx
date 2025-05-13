import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const ButtonItem = ({ 
    onPress, 
    label 
  }: { 
    onPress: () => void, 
    label: string 
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#3c6e71] py-3 px-6 rounded-lg mb-4 self-stretch items-center"
    >
      <Text className="text-white font-bold text-base text-center">
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Image
          className="w-96 h-32"
          source={require("@/assets/images/logo.png")}
          resizeMode="cover"
        />
        <Text style={styles.subtitle}>Choose an option to get started:</Text>

        <View className="w-full px-4">
          <ButtonItem 
            onPress={() => router.push("/upload")}
            label="Upload and Clean Dataset"
          />
          <ButtonItem 
            onPress={() => router.push("/help")}
            label="How to Use This App"
          />
        </View>
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
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 48,
  }
});