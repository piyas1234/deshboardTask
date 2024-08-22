import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      
    },
    header: {
      marginBottom: 40,
      alignItems: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 18,
      color: 'gray',
      marginTop: 8,
    },
    input: {
      marginBottom: 10,
      height: 60,
    },
    forgotPassword: {
      alignItems: 'flex-end',
      marginBottom: 20,
    },
    forgotPasswordText: {
      fontSize: 14,
      color: 'blue',
    },
    button: {
      marginTop: 20,
    },
    buttonContent: {
      paddingVertical: 10,
    },
    signupLink: {
      marginTop: 30,
      alignItems: 'center',
    },
    signupText: {
      fontSize: 14,
      color: 'blue',
    },
  });