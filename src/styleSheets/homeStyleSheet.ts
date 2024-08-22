import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeArea: {
      flex: 1
    },
    container: {
      padding: 20
    },
    fieldContainer: {
      marginBottom: 20,
     
      
    },
    label: {
      marginBottom: 10,
      fontSize: 16
    },
    input: {
      
    },
    textarea: {
      
      height: 100,
      textAlignVertical: "top"
    },
    radioContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10
    },
    radioLabel: {
      marginLeft: 10
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10
    },
    dateButton: {
      marginTop: 10
    },
    loading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    submitButton: {
      paddingVertical: 5,
      borderRadius: 8
    }
  });
  
  export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 4,
      borderWidth: 1,
      fontSize: 16,
      marginBottom: 10
    },
    inputAndroid: {
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 4,
      borderWidth: 1,
      fontSize: 16,
      marginBottom: 10
    }
  });
  