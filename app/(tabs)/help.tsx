import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Index(){
  return(
    <SafeAreaView className="flex-1 border-2 w-full bg-white items-center justify-center py-12">
      <ThemedText
        fontFamily='spaceMonoRegular'
      >
        Taylor Swift
      </ThemedText>
      
    </SafeAreaView>
  );
}
