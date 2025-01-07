import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Collapsible } from "@/components/Collapsible";

export default function Index(){
  return(
    <SafeAreaView className="flex-1 border-2 w-full bg-white items-center justify-center py-12">
      <Collapsible title="Uploading a CSV File to the app">
        <ThemedText>
          - First step {"\n"}
          - Second step {"\n"}
        </ThemedText>
      </Collapsible>

      <Collapsible title="Viewing the Mismatched Words on the dataset">
        <ThemedText>
          - First step {"\n"}
          - Second step {"\n"}
        </ThemedText>
      </Collapsible>

      <Collapsible title="Editing Mismatched Words on the dataset">
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

      <Collapsible title="Reviewing and Exporting the Updated Dataset">
        <ThemedText>
          - First step {"\n"}
          - Second step {"\n"}
        </ThemedText>
      </Collapsible>
      
    </SafeAreaView>
  );
}
