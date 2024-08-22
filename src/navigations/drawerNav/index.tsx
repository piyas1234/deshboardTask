import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text,  Alert } from "react-native";
import {
  Provider as PaperProvider,
  useTheme,
  Switch,
  Button,
  Avatar,
  TouchableRipple
} from "react-native-paper";

import * as SecureStore from "expo-secure-store";
import { useNetwork } from "../../global/NetworkProvider";
import { stylesFnc } from "../../styleSheets/drawerStyleSheet";
import { keys } from "../../utils/keys";
import HomeScreen from "../../screens/HomeScreen";
import SettingScreen from "../../screens/SettingScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({
  navigation,
  toggleTheme,
  isDarkTheme,
  user,
  setIsDarkTheme
}) {
  const theme = useTheme();
  const { colors } = useTheme();
  const network = useNetwork();
  const styles = stylesFnc(colors);

  console.log(network);
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            const res = await network.authNetwork.post("logout");
            console.log(res);
            if (res.status === 200) {
              await SecureStore.deleteItemAsync(keys.token);
              await SecureStore.deleteItemAsync(keys.user);

              navigation.navigate("Login");
            } else {
              Alert.alert(
                "Logout Failed",
                "Something went wrong during logout"
              );
            }
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Logout Error", "An error occurred while logging out");
          }
        }
      }
    ]);
  };

  return (
    <View
      style={[
        styles.drawerContainer,
        { backgroundColor: theme.colors.background, marginTop: 50 }
      ]}
    >
      <View
        style={{
          padding: 16
        }}
      >
        <Avatar.Text label="A" />
        <View style={styles.userInfoSection}>
          <View>
            <Text style={[styles.userName, { color: theme.colors.text }]}>
              {user.name}
            </Text>
            <Text style={[styles.userEmail, { color: theme.colors.text }]}>
              {user.email}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.drawerContent}>
        <TouchableRipple
          onPress={() => navigation.navigate("Home")}
          style={[
            styles.themeToggle,
            {
              paddingVertical: 10
            }
          ]}
        >
          <Text style={{ color: theme.colors.primary }}>Home</Text>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => navigation.navigate("Settings")}
          style={[
            styles.themeToggle,
            {
              paddingVertical: 10
            }
          ]}
        >
          <Text style={{ color: theme.colors.primary }}>Settings</Text>
        </TouchableRipple>

        <View style={styles.themeToggle}>
          <Text style={{ color: theme.colors.primary }}>Dark Theme</Text>
          <Switch
            value={isDarkTheme}
            onValueChange={() => {
              toggleTheme();
              setIsDarkTheme(!isDarkTheme);
            }}
            color={theme.colors.accent}
          />
        </View>
      </View>

      <View style={styles.logoutButton}>
        <Button
          mode="contained"
          onPress={handleLogout}
          color={theme.colors.error}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}

function DrawerNavigation() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const { toggleTheme, user } = useNetwork();

  const theme = useTheme();

  return (
    <PaperProvider theme={theme}>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary // Set header background color
          },
          headerTintColor: "white", // Set header text color
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            toggleTheme={toggleTheme}
            isDarkTheme={isDarkTheme}
            user={user}
            setIsDarkTheme={setIsDarkTheme}
          />
        )}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={SettingScreen} />
      </Drawer.Navigator>
    </PaperProvider>
  );
}

export default DrawerNavigation;
