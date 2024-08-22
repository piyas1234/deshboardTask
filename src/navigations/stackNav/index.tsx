import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
 
import DrawerNavigation from "../drawerNav";
import { getAccessToken } from "../../global/NetworkProvider";
import LoginScreen from "../../screens/LoginScreen";
 
const StackNav = ({ theme }) => {
  const Stack = createStackNavigator();
  const [screen, setScreen] = useState("loading");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const token = await getAccessToken();

      if (token == null) {
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
