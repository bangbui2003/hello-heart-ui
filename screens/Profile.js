import { Component } from "react";
import { AntDesign } from "@expo/vector-icons";
// import { reduceEachLeadingCommentRange } from "typescript";
import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
const HeightSelector = () => {
  const [selectedHeight, setSelectedHeight] = useState("160");

  const heightOptions = [...Array(41)].map((_, i) => `${160 + i}`); // Heights from 160 to 200

  return (
    <View>
      <Text>Select Your Height (cm):</Text>
      <Picker
        selectedValue={selectedHeight}
        onValueChange={(itemValue) => setSelectedHeight(itemValue)}
        mode="dropdown"
      >
        {heightOptions.map((height) => (
          <Picker.Item key={height} label={height} value={height} />
        ))}
      </Picker>
    </View>
  );
};

export default function Profile() {
  const navigation = useNavigation();
  return (
    <View class="container" style={styles.container}>
      <ScrollView>
        <View class="header">
          <View
            class="Title"
            style={{
              marginTop: 28,
              display: "flex",
              flexDirection: "row",
              paddingLeft: 20,
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={{ fontWeight: "900", fontSize: 30, color: "#fc8181" }}>
              Hello Heart
            </Text>
            <TouchableOpacity
              onPress={() => {
                console.log(2);
                navigation.navigate("EditProfile");
              }}
            >
              <Text
                style={{ fontWeight: "200", fontSize: 20, color: "#fc8181" }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.profileIconContainer}>
              <FontAwesome name="user" size={40} color="#fc8181" />
            </View>
            <Text style={styles.profileHeaderText}>My Profile</Text>
          </View>
        </View>
        <View style={styles.personalInfoRowContainer}>
          {/* Start of Username Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Username
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>Xuân Võ</Text>
            </View>
          </View>
          {/* Start of Sex Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Sex
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>Xuân Võ</Text>
            </View>
          </View>
          {/* Start of DOB Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Date of Birth
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>Xuân Võ</Text>
            </View>
          </View>
          {/* Start of Weight Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Height
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>Xuân Võ</Text>
            </View>
          </View>
          {/* Start of Height Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Height
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>Xuân Võ</Text>
            </View>
          </View>
          {/* Start of Height Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Height
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>Xuân Võ</Text>
            </View>
          </View>
          {/* End of Height Row */}

          {/* Start of Cholesterol Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Height
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>Xuân Võ</Text>
            </View>
          </View>
          {/* End of Cholesterol Row */}

          {/* Start of Smoking Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Height
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>Xuân Võ</Text>
            </View>
          </View>
          {/* End of Smoking Row */}

          {/* Start of Alcohol Intake Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Height
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>Xuân Võ</Text>
            </View>
          </View>
          {/* End of Alcohol Intake Row */}

          {/* Start of Alcohol Intake Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Height
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>Xuân Võ</Text>
            </View>
          </View>
          {/* End of Alcohol Intake Row */}

          {/* Start of Physical Activities Row */}
          <View style={styles.personalInfoRow}>
            <FontAwesome
              style={{ paddingHorizontal: 10 }}
              name="heart"
              size={24}
              color="#fc8181"
            />
            <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Text
                style={{ fontSize: 20, color: "#807879", fontWeight: "bold" }}
              >
                Height
              </Text>
              <Text style={{ fontSize: 16, color: "#939496" }}>Xuân Võ</Text>
            </View>
          </View>
          {/* End of Physical Activitie Row */}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  profileIconContainer: {
    backgroundColor: "#fddede",
    width: 70,
    height: 70,
    display: "flex",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
    color: "#4e4e4e",
  },
  personalInfoRowContainer: {
    marginTop: 20,
    display: "flex",
    alignItems: "center",
  },
  personalInfoRow: {
    padding: 20,
    display: "flex",
    gap: 20,
    width: "80%",
    borderWidth: 2,
    borderColor: "#fddede",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  paddingIconInfoRow: {
    paddingHorizontal: 10,
  },
});
