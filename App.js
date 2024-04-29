import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import HomeTest from "./screens/HomeTest";
import BloodPressureInput from "./screens/BloodPressureInput";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        {/* <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ProfileStack" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} /> */}

        <Stack.Screen name="Home" component={HomeTest} />
        <Stack.Screen
          name="BloodPressureInput"
          component={BloodPressureInput}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <View>

    // </View>
  );
}

export default App;
