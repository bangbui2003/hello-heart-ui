import * as React from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useState, useEffect } from "react";
import Slider from "@react-native-community/slider";
import axios from "axios";
import moment from "moment";
export default function BloodPressureInput() {
  // Giá trị mặc định cho huyết áp (120/80 là huyết áp bình thường)

  const [diastolic, setDiastolic] = useState(80);

  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Lấy ID của profile bằng API dựa vào UserID
    const fetchUserProfile = async () => {
      try {
        const userId = 5; // Thay thế bằng UserID thực tế
        const response = await axios.get(
          `http://10.20.7.96:1337/api/profiles?filters[UserID][$eq]=${userId}`
        );
        if (response.data.data.length > 0) {
          setUserProfile(response.data.data[0]); // Lấy profile đầu tiên
          const bp = response.data.data[0].attributes.BloodPressureData.data;
          /// find today bp
          console.log("bp-data");
          console.log(bp);

          const today = moment().format("YYYY-MM-DD"); // Lấy ngày hôm nay
          // Tìm mục có enteredDate bắt đầu với ngày hôm nay
          const todayEntry = bp.find((entry) =>
            entry.enteredDate.startsWith(today)
          );

          // Nếu tìm thấy, trả về bloodPress; nếu không, trả về 0
          const bloodPress = todayEntry ? todayEntry.bloodPress : 80;
          setDiastolic(bloodPress);
        } else {
          console.warn("Profile not found for UserID:", userId);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile(); // Lấy ID profile khi component được gắn vào
  }, []);

  const saveBloodPressure = async () => {
    if (!userProfile) {
      console.warn("User profile not found");
      return;
    }

    // // Tạo giá trị mới cho BloodPressureData
    // const newEntry = {
    //   bloodPress: systolic, // Bạn có thể thay đổi giá trị này
    //   enteredDate: moment().format("YYYY-MM-DD HH:mm:ss"), // Ngày tháng hiện tại
    // };

    // // Lấy bản sao của mảng hiện tại và thêm giá trị mới
    // const updatedBloodPressureData = [
    //   ...(userProfile.attributes.BloodPressureData?.data || []),
    //   newEntry,
    // ];

    const currentDate = moment().format("YYYY-MM-DD"); // Ngày hiện tại
    const newEntry = {
      bloodPress: diastolic,
      enteredDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    let updatedBloodPressureData = [
      ...(userProfile.attributes.BloodPressureData?.data || []),
    ];

    // Kiểm tra xem có dữ liệu cho ngày hôm nay không
    const todayIndex = updatedBloodPressureData.findIndex((entry) =>
      entry.enteredDate.startsWith(currentDate)
    );

    if (todayIndex >= 0) {
      // Cập nhật mục hiện có
      updatedBloodPressureData[todayIndex] = newEntry;
    } else {
      // Thêm mục mới
      updatedBloodPressureData.push(newEntry);
    }
    try {
      // Cập nhật trường BloodPressureData với giá trị mới
      const response = await axios.put(
        `http://10.20.7.96:1337/api/profiles/${userProfile.id}`,
        {
          data: {
            BloodPressureData: {
              data: updatedBloodPressureData, // Mảng đã cập nhật
            },
          },
        }
      );

      console.log("Blood pressure data saved:", response.data);
    } catch (error) {
      console.error("Error saving blood pressure:", error);
    }
  };

  const handleDiastolicChange = (value) => {
    // Chặn giá trị âm và giới hạn trong phạm vi hợp lệ
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setDiastolic(parsedValue);
    } else {
      Alert.alert("Invalid value");
      setDiastolic(80);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bp_input}>
        <Text style={styles.title}>Enter Your Blood Pressure</Text>
        <Text style={styles.label}>Diastolic (Bottom Number): {diastolic}</Text>
        <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={60}
          maximumValue={120}
          step={1}
          value={diastolic}
          onValueChange={setDiastolic}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(diastolic)}
          onChangeText={(text) => handleDiastolicChange(text)}
        />
        <Button title="Save Blood Pressure" onPress={saveBloodPressure} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: 100,
    textAlign: "center",
    marginBottom: 20,
  },
  bp_input: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

// export default BloodPressureInput;
