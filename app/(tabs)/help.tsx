import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { Collapsible } from "@/components/Collapsible";

export default function Index(){
  return(
    <SafeAreaView className="flex-1 border-2 w-full bg-white items-start py-12">
      <Image
              className="w-40 h-16 px-4 mb-10 ml-4 self-start"
              source={require('@/assets/images/logo.png')}
      />
      <SafeAreaView className="ml-10">
      <Collapsible title="Upload a CSV File to the app">
        <ThemedText>
          - First step {"\n"}
          - Second step {"\n"}
        </ThemedText>
      </Collapsible>

      <Collapsible title="View the Mismatched Words">
        <ThemedText>
          - First step {"\n"}
          - Second step {"\n"}
        </ThemedText>
      </Collapsible>

      <Collapsible title="Edit Mismatched Words">
        <ThemedText>
          - First step {"\n"}
          - Second step {"\n"}
        </ThemedText>
      </Collapsible>

      <Collapsible title="Replacing or Keeping All Data Values">
        <ThemedText>
          - First step {"\n"}
          - Second step {"\n"}
        </ThemedText>
      </Collapsible>

      <Collapsible title="Exporting the Updated Dataset">
        <ThemedText>
          - First step {"\n"}
          - Second step {"\n"}
        </ThemedText>
      </Collapsible>
      </SafeAreaView>
      
    </SafeAreaView>
  );
}
