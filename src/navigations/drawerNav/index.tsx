import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import {
  Provider as PaperProvider,
  useTheme,
  Switch,
  Button
} from "react-native-paper";
 
import * as SecureStore from 'expo-secure-store';
import { useNetwork } from "../../global/NetworkProvider";
import { stylesFnc } from "../../styleSheets/drawerStyleSheet";
import { keys } from "../../utils/keys";
import HomeScreen from "../../screens/HomeScreen";
import SettingScreen from "../../screens/SettingScreen";
 

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation, toggleTheme, isDarkTheme, user, setIsDarkTheme }) {
  const theme = useTheme();
  const { colors } = useTheme();
  const network = useNetwork();
  const styles = stylesFnc(colors);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
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
                
                navigation.navigate('Login');
              } else {
                Alert.alert('Logout Failed', 'Something went wrong during logout');
              }
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Logout Error', 'An error occurred while logging out');
            }
          }
        }
      ]
    );
  };

  return (
    <View
      style={[
        styles.drawerContainer,
        { backgroundColor: theme.colors.background, marginTop: 50 }
      ]}
    >
      <View style={styles.userInfoSection}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View>
          <Text style={[styles.userName, { color: theme.colors.text }]}>
            {user.name}
          </Text>
          <Text style={[styles.userEmail, { color: theme.colors.text }]}>
            {user.email}
          </Text>
        </View>
      </View>

      <View style={styles.drawerContent}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("Home")}
          style={styles.drawerButton}
        >
          Home
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("Settings")}
          style={styles.drawerButton}
        >
          Settings
        </Button>
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
  const { toggleTheme } = useNetwork();

  const theme = useTheme();
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://example.com/avatar.jpg" // Replace with actual image URL or require local image
  };

  return (
    <PaperProvider theme={theme}>
      <Drawer.Navigator
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
 