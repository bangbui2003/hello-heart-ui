import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  Picker,
  Button,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
// import DatePicker from "react-native-datepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import axios from "axios";

export default function EditProfile() {
  const navigation = useNavigation();
  // const [date, setDate] = useState(new Date());
  // const [showPicker, setShowPicker] = useState(false);
  // const toggleDatePicker = () => {
  //   setShowPicker(!showPicker);
  // };

  userId = 5;
  //////////////////////////////////////////////////
  const [profile, setProfile] = useState({
    UserID: "",
    Sex: "",
    BPMeds: "",
    prevalentStroke: "",
    prevalentHyp: "",
    diabetes: "",
    log_cigsPerDay: "",
    log_totChol: "",
    weight: "",
    height: "",
    log_BMI: "",
    log_heartRate: "",
    log_glucose: "",
    log_age: "",
  });

  useEffect(() => {
    // Lấy profile dựa vào UserID
    axios
      .get(`http://10.20.7.96:1337/api/profiles?filters[UserID][$eq]=${userId}`)
      .then((response) => {
        console.log(response.data.data[0].attributes);
        if (response.data.data.length > 0) {
          const profileData = response.data.data[0].attributes;
          setProfile(profileData);
        }
        console.log(profile);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [userId]);

  const handleInputChange = (key, value) => {
    if (key === "height" || key === "weight") {
      const height = key === "height" ? value : profile.height;
      const weight = key === "weight" ? value : profile.weight;
      const BMI = (weight / (height * height)) * 10000;
      setProfile({
        ...profile,
        log_BMI: BMI,
        [key]: value,
      });
    } else {
      setProfile({
        ...profile,
        [key]: value,
      });
    }
  };

  useEffect(() => {
    console.log("Profile after update");
    console.log(profile);
  }, [profile]);

  const handleSave = () => {
    // Lấy profile ID từ kết quả API
    axios
      .get(`http://10.20.7.96:1337/api/profiles?filters[UserID][$eq]=${userId}`)
      .then((response) => {
        if (response.data.data.length > 0) {
          const profileId = response.data.data[0].id;

          axios
            .put(`http://10.20.7.96:1337/api/profiles/${profileId}`, {
              data: profile,
            })
            .then(() => {
              console.log("Profile updated successfully");
            })
            .catch((error) => console.error("Error updating profile:", error));
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));
  };

  //////////////////////////////////////////////

  // const [username, setUsername] = useState("");
  // const [gender, setGender] = useState("");
  // const [BPMeds, setBPMeds] = useState("");
  // const [prevalentStroke, setPrevalentStroke] = useState("");
  // const [prevalentHyp, setPrevalentHyp] = useState("");
  // const [diabetes, setDiabetes] = useState("");
  // const [log_cigsPerDay, setlog_cigsPerDay] = useState("");
  // const [log_totChol, setlog_totChol] = useState("");
  // const [log_diaBP, setlog_diaBP] = useState("");
  // // bmi
  // const [weight, setWeight] = useState("");
  // const [height, setHeight] = useState(150); // Giá trị mặc định là 150 cm
  // const [log_heartRate, setlog_heartRate] = useState("");
  // const [log_glucose, setlog_glucose] = useState("");
  // // age
  // const [age, setAge] = useState("");
  // ///
  const [errors, setErrors] = useState({});

  // const validateRequiredFields = () => {
  //   const newErrors = {};

  //   if (gender.trim() === '') {
  //     newErrors.gender = 'Gender is required';
  //   }

  //   if (age.trim() === '') {
  //     newErrors.age = 'Age is required';
  //   }

  //   if (weight.trim() === '') {
  //     newErrors.weight = 'Weight is required';
  //   }

  //   if (height.trim() === '') {
  //     newErrors.height = 'Height is required';
  //   }

  //   setErrors(newErrors);

  //   // Kiểm tra nếu không có lỗi
  //   return Object.keys(newErrors).length === 0;
  // };

  const validateAge = (text) => {
    const numericValue = parseInt(text, 10);
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 120) {
      setErrors((prev) => ({
        ...prev,
        age: "Age must be a number between 0 and 120",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.age;
        return newErrors;
      });
    }
    handleInputChange("log_age", text);
  };
  // const handleSave = () => {
  //   if (Object.keys(errors).length > 0) {
  //     Alert.alert(
  //       "Validation Error",
  //       "Please correct the validation errors before saving."
  //     );
  //     return;
  //   }
  //   // Xử lý logic khi nhấn nút "Save"
  //   console.log({
  //     gender,
  //     BPMeds,
  //     prevalentStroke,
  //     prevalentHyp,
  //     diabetes,
  //     log_cigsPerDay,
  //     log_totChol,
  //     log_diaBP,
  //     weight,
  //     height,
  //     log_heartRate,
  //     log_glucose,
  //     age,
  //   });
  //   const patient = {
  //     male: gender,
  //     BPMeds: BPMeds,
  //     prevalentStroke: prevalentStroke,
  //     prevalentHyp: prevalentHyp,
  //     diabetes: diabetes,
  //     log_cigsPerDay: log_cigsPerDay,
  //     log_totChol: log_totChol,
  //     // log_diaBP: log_diaBP,
  //     weight: weight,
  //     height: height,
  //     log_heartRate: log_heartRate,
  //     log_glucose: log_glucose,
  //     log_age: age,
  //     log_BMI: weight / ((height / 100) * (height / 100)),
  //     log_heartRate: log_heartRate,
  //     log_glucose: log_glucose,
  //     log_age: age,
  //   };
  //   console.log(patient);
  // };
  return (
    // Username
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        /> */}
        {/* Sex */}
        <Text style={styles.label}>Gender</Text>
        <RNPickerSelect
          onValueChange={(value) => {
            handleInputChange("Sex", value);
          }}
          value={profile?.Sex === true ? 1 : 0}
          items={[
            { label: "Nam", value: 1 },
            { label: "Nữ", value: 0 },
          ]}
        />
        {/* Age */}
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          keyboardType="number-pad"
          value={String(profile?.log_age)}
          onChangeText={(text) => {
            validateAge(Number(text));
          }}
        />
        {errors.age && <Text style={styles.error}>{errors.age}</Text>}
        {/* Hiển thị lỗi nếu có */}
        {/* Weight */}
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          keyboardType="numeric"
          value={String(profile?.weight)}
          onChangeText={(text) => {
            handleInputChange("weight", Number(text));
          }}
        />
        {/* Height */}
        <Text style={styles.label}>Height (cm)</Text>
        <RNPickerSelect
          onValueChange={(value) => {
            handleInputChange("height", value);
          }}
          value={Number(profile?.height)}
          items={Array.from({ length: 111 }, (_, index) => ({
            label: `${90 + index} cm`,
            value: 90 + index,
          }))}
          style={styles.picker}
        />
        {/* Prevalent Stoke */}
        <Text style={styles.label}>Prevalent Stoke </Text>
        <RNPickerSelect
          value={profile?.prevalentStroke ? 1 : 0}
          onValueChange={(value) => {
            handleInputChange("prevalentStroke", value);
          }}
          items={[
            { label: "Yes", value: 1 },
            { label: "No", value: 0 },
          ]}
        />
        {/* Prevalent Hypertension */}
        <Text style={styles.label}>Prevalent Hypertension </Text>
        <RNPickerSelect
          value={profile?.prevalentHyp ? 1 : 0}
          onValueChange={(value) => {
            handleInputChange("prevalentHyp", value);
          }}
          items={[
            { label: "Yes", value: 1 },
            { label: "No", value: 0 },
          ]}
        />
        {/* Blood Pressure Medication */}
        <Text style={styles.label}>Is Taking Blood Pressure Medication?</Text>
        <RNPickerSelect
          value={profile?.BPMeds ? 1 : 0}
          onValueChange={(value) => {
            handleInputChange("BPMeds", value);
          }}
          items={[
            { label: "Yes", value: 1 },
            { label: "No", value: 0 },
          ]}
        />
        {/* Diabetes Status */}
        <Text style={styles.label}>Diabetes Diagnosis</Text>
        <RNPickerSelect
          value={profile?.diabetes ? 1 : 0}
          onValueChange={(value) => {
            handleInputChange("diabetes", value);
          }}
          placeholder={{ label: "Default (0)", value: 0 }}
          items={[
            { label: "Yes", value: 1 },
            { label: "No", value: 0 },
          ]}
        />
        {/* Total Cholesterol */}
        <Text style={styles.label}>Total Cholesterol (mg/dL)</Text>
        <RNPickerSelect
          value={Number(profile?.log_totChol)}
          onValueChange={(value) => {
            handleInputChange("log_totChol", value);
          }}
          // placeholder={{ label: "Default (140)", value: 140 }}
          items={Array.from({ length: 650 }, (_, index) => ({
            label: `${50 + index}`,
            value: 50 + index,
          }))}
          style={styles.picker}
        />
        {/* Heart Beat */}
        <Text style={styles.label}>Heart Beat (per min)</Text>
        <RNPickerSelect
          value={Number(profile?.log_heartRate)}
          // placeholder={{ label: "Default (140)", value: 140 }}
          onValueChange={(value) => {
            handleInputChange("log_heartRate", value);
          }}
          items={Array.from({ length: 150 }, (_, index) => ({
            label: `${0 + index} `,
            value: 0 + index,
          }))}
          style={styles.picker}
        />
        {/* Glucose in Blood */}
        <Text style={styles.label}>Glucose (mg/dL) </Text>
        <RNPickerSelect
          value={Number(profile?.log_glucose)}
          // placeholder={{ label: "Default (140)", value: 140 }}
          onValueChange={(value) => {
            handleInputChange("log_glucose", value);
          }}
          items={Array.from({ length: 150 }, (_, index) => ({
            label: `${0 + index} `,
            value: 0 + index,
          }))}
          style={styles.picker}
        />
        {/* cigarrette per day */}
        <Text style={styles.label}>Cigarrette per day</Text>
        <RNPickerSelect
          value={Number(profile?.log_cigsPerDay)}
          // placeholder={{ label: "Default (0)", value: 0 }}
          onValueChange={(value) => {
            handleInputChange("log_cigsPerDay", value);
          }}
          items={Array.from({ length: 50 }, (_, index) => ({
            label: `${0 + index} `,
            value: 0 + index,
          }))}
          style={styles.picker}
        />
        <Button title="Save" onPress={handleSave} />
        <TouchableOpacity
          title="Back"
          onPress={() => {
            console.log(2);
            navigation.navigate("ProfileStack");
          }}
        >
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  picker: {
    marginBottom: 16,
  },
});
