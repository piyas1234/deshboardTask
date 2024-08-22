import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigation from "../drawerNav";
import LoginScreen from "../../screens/LoginScreen";
import { keys } from "../../utils/keys";
import * as SecureStore from "expo-secure-store";
import { useNetwork } from "../../global/NetworkProvider";

const StackNav = ({ theme }) => {
  const Stack = createStackNavigator();
  const [screen, setScreen] = useState("loading");
  const network = useNetwork()

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await network.getAccessToken();
      await network.getUserInfo();
      const token = await SecureStore.getItemAsync(keys.token);

      if (token == null || token == "") {
        setScreen("Login");
      } else {
        setScreen("DrawerNav");
      }
    } catch (error) {}
  };

  console.log(screen);

  if (screen === "loading") {
    return null;
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={screen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DrawerNav" component={DrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
