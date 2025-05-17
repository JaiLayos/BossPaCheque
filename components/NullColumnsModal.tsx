import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  nullColumns: string[];
}

export const NullColumnsModal = ({ visible, onClose, nullColumns }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
          <Text className="text-xl font-semibold mb-4 text-red-600">Missing Data Detected</Text>
          <ScrollView style={{ maxHeight: 200 }}>
            {nullColumns.map((col, i) => (
              <Text key={i} className="text-base text-black mb-1">• {col}</Text>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={onClose}
            className="mt-4 bg-red-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white text-center">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
