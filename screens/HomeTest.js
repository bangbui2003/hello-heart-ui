import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function HomeTest() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>HomeTest</Text>
      <Pressable
        onPress={() => {
          navigation.navigate("BloodPressureInput");
        }}
      >
        <Text>Input your heart pressure</Text>
      </Pressable>
    </View>
  );
}
