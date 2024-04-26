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
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../Services/GlobalApi";
export default function LoginScreen() {
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });
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

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = {
        identifier: loginData.identifier,
        password: loginData.password,
      };
      console.log(loginUser);
      const responseData = await GlobalApi.loginUser(loginUser);
      console.log(typeof responseData);
      if (responseData.jwt) {
        console.log("log in thanh cong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const styles = StyleSheet.create({
    inputKeyboardOn: {
      // backgroundColor: "blue",
      marginTop: 100,
    },
    inputKeyboardDown: {
      marginTop: -270,
    },
  });
  const containerStyle = keyboardVisible
    ? styles.inputKeyboardOn
    : styles.inputKeyboardDown;

  const handleChange = (name, value) => {
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  return (
    <KeyboardAvoidingView>
      <View className="bg-white h-full w-full">
        <StatusBar style="light" />
        <Image
          className="h-full w-full absolute"
          style={{ marginTop: -100 }}
          source={require("../assets/images/background.png")}
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

        <View className="h-full w-full flex justify-around pb-10 ">
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
              <Text
                className="text-black
               font-bold tracking-wider text-5xl"
              >
                Login
              </Text>
            </View>
          )} */}

          <View
            className="flex items-center mx-4 space-y-4"
            // style={{ marginTop: -100 }}
          >
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="bg-black/5 p-5 rounded-2xl w-full"
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor={"gray"}
                keyboardType="email-address"
                value={loginData.identifier}
                onChangeText={(text) => {
                  handleChange("identifier", text);
                }}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
              className="bg-black/5 p-5 rounded-2xl w-full mb-3"
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor={"gray"}
                secureTextEntry
                value={loginData.password}
                onChangeText={(text) => {
                  handleChange("password", text);
                }}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className="w-full"
            >
              <TouchableOpacity
                onPress={(e) => {
                  hanldeSubmit(e);
                }}
                className="w-full bg-red-400 p-3 rounded-2xl mb-3"
              >
                <Text className="text-xl font-bold text-white text-center">
                  Login
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="flex-row justify-center"
            >
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push("SignUp")}>
                <Text className="text-red-400">Sign Up</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    height: 400,
  },
});

// import { View, Text, Image, KeyboardAvoidingView } from "react-native";
// import React from "react";
// import { StatusBar } from "expo-status-bar";
// import { TextInput } from "react-native";

// export default function LoginScreen() {
//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <View style={{ flex: 1 }} className="bg-white h-full w-full">
//         <StatusBar style="light" />
//         <Image
//           className="h-full w-full absolute"
//           source={require("../assets/images/background.png")}
//         />
//         {/* heart */}
//         <View className="flex-row justify-around w-full we">
//           <Image
//             className="h-[225] w-[90]"
//             source={require("../assets/images/heart.png")}
//           />
//         </View>

//         <View
//           className="h-full w-full flex justify-around pt-40 pb-10 mt-0"
//           style={{ marginTop: -280 }}
//         >
//           <View className="flex items-center">
//             <Text
//               className="text-white
//              font-bold tracking-wider text-5xl"
//             >
//               Login
//             </Text>
//           </View>

//           <View className="flex items-center mx-4 space-y-4">
//             <View className="bg-black/5 p-5 rounded-2xl w-full">
//               <TextInput placeholder="Email" placeholderTextColor={"gray"} />
//             </View>
//             <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
//               <TextInput
//                 placeholder="Password"
//                 placeholderTextColor={"gray"}
//                 secureTextEntry
//               />
//             </View>
//           </View>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }
