import { StyleSheet } from "react-native";

export const stylesFnc = (colors: any) => StyleSheet.create({
    drawerContainer: {
      flex: 1
    },
    userInfoSection: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc"
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 16
    },
    userName: {
      fontSize: 18,
      fontWeight: "bold"
    },
    userEmail: {
      fontSize: 14,
      color: "gray"
    },
    drawerContent: {
      flex: 1,
      padding: 16
    },
    drawerButton: {
      marginVertical: 8,
      borderColor: colors.tertiary,
      borderRadius: 10,
      borderWidth: 0.2,
    },
    themeToggle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10,
      borderWidth: 0.2,
      padding: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      borderColor: colors.tertiary
    },
    logoutButton: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: "#ccc"
    }
  });