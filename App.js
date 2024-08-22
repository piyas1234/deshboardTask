import { DarkTheme } from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DefaultTheme,
  useTheme
} from "react-native-paper";
import { NetworkProvider } from "./src/global/NetworkProvider";

import "react-native-gesture-handler";
import React from "react";
import StackNav from "./src/navigations/stackNav";
 

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const theme = {
    ...useTheme(),
    colors: {
      ...useTheme().colors,
      ...(isDarkTheme ? DarkTheme.colors : DefaultTheme.colors)
    }
  };

  return (
    <NetworkProvider toggleTheme={toggleTheme}>
      <PaperProvider theme={theme}>
        <StackNav theme={theme} />
      </PaperProvider>
    </NetworkProvider>
  );
}
