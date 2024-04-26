import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { Keyboard } from "react-native";
import { Pressable } from "react-native";
import GlobalApi from "../Services/GlobalApi";
import { validateGmail, validatePassword } from "../Validations/UserCheck";

import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
export default function SignupScreen() {
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validation = () => {
    let newErrors = {};
    console.log(
      validateGmail(userData.email),
      validatePassword(userData.password)
    );
    if (!validateGmail(userData.email)) {
      newErrors.email = "Invalid Email";
    }

    if (!validatePassword(userData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.";
    }

    if (!userData.username) {
      newErrors.username = "Username is required";
    }

    setErrors(newErrors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email: userData.email,
        password: userData.password,
        username: userData.username,
      };

      console.log(validation());
      if (validation()) {
        const responseData = await GlobalApi.registerUser(newUser);
        console.log(responseData);
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // Bàn phím được mở
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // Bàn phím được đóng
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const styles = StyleSheet.create({
    inputKeyboardOn: {
      // backgroundColor: "blue",
      marginTop: 10,
    },
    inputKeyboardDown: {
      marginTop: -270,
    },
  });
  const containerStyle = keyboardVisible
    ? styles.inputKeyboardOn
    : styles.inputKeyboardDown;

  const handleChange = (name, value) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  return (
    <KeyboardAvoidingView>
      <View className="bg-white h-full w-full">
        <StatusBar style="light" />
        <Image
          className="h-full w-full absolute"
          source={require("../assets/images/background.png")}
          style={{ marginTop: -100 }}
        />
        {/* heart */}
        <View className="flex-row justify-around w-full">
          <Animated.Image
            entering={FadeIn.delay(200).duration(1000).springify()}
            className="h-[90] w-[200]"
            style={{ marginTop: 40 }}
            source={require("../assets/images/heart.png")}
          />
        </View>

        <View
          className="h-full w-full flex justify-around pb-10 "
          // style={containerStyle}
        >
          {/* <View className="flex items-center">
          <Text
            className="text-white
           font-bold tracking-wider text-5xl"
          >
            Login
          </Text>
        </View> */}
          {/* {!keyboardVisible && ( // Chỉ hiển thị nếu bàn phím không mở
            <View className="flex items-center">
              <Animated.Text
                entering={FadeInUp.duration(1000).springify()}
                className="text-black
               font-bold tracking-wider text-5xl"
              >
                Login
              </Animated.Text>
            </View>
          )} */}

          <View
            className="flex items-center mx-4 space-y-4"
            // style={keyboardVisible}
          >
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="bg-black/5 p-5 rounded-2xl w-full"
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor={"gray"}
                keyboardType="email-address"
                value={userData.email}
                onChangeText={(text) => handleChange("email", text)}
              />
            </Animated.View>

            {errors.email && (
              <Text className="text-red-500 text-sm self-start ml-1">
                {errors.email}
              </Text>
            )}
            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
              className="bg-black/5 p-5 rounded-2xl w-full"
            >
              <TextInput
                placeholder="Username"
                placeholderTextColor={"gray"}
                value={userData.username}
                onChangeText={(text) => handleChange("username", text)}
              />
            </Animated.View>
            {errors.username && (
              <Text className="text-red-500 text-sm self-start ml-1">
                {errors.username}
              </Text>
            )}
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className="bg-black/5 p-5 rounded-2xl w-full mb-3"
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor={"gray"}
                secureTextEntry
                value={userData.password}
                onChangeText={(text) => handleChange("password", text)}
              />
            </Animated.View>
            {errors.password && (
              <Text className="text-red-500 text-sm self-start ml-1">
                {errors.password}
              </Text>
            )}
            <Animated.View
              entering={FadeInDown.delay(800).duration(1000).springify()}
              className="w-full"
            >
              <TouchableOpacity
                onPress={(e) => handleSubmit(e)}
                className="w-full bg-red-400 p-3 rounded-2xl mb-3"
              >
                <Text className="text-xl font-bold text-white text-center">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(1000).duration(1000).springify()}
              className="flex-row justify-center"
            >
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push("Login")}>
                <Text className="text-red-400">Sign In</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
