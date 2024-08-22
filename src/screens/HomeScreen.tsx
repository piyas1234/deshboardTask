import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import {
  Button,
  TextInput,
  Checkbox,
  ActivityIndicator,
  Surface,
  useTheme
} from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import DatePicker from "react-native-date-picker";
import { useNetwork } from "../global/NetworkProvider";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { pickerSelectStyles, styles } from "../styleSheets/homeStyleSheet";
 

// Types
interface FormOption {
  label: string;
  value: string;
  selected: boolean;
}

interface FormField {
  type: string;
  required: boolean;
  label: string;
  className: string;
  name: string;
  access: boolean;
  subtype?: string;
  multiple?: boolean;
  values?: FormOption[];
}

const FORM_TEMPLATE_URL = "get-report-template/34";
const SUBMIT_FORM_URL = "submit-report";

export default function HomeScreen() {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const Network = useNetwork();

  const { colors } = useTheme();

  console.log(formFields);

  useEffect(() => {
    fetchFormTemplate();
  }, [Network]);

  const fetchFormTemplate = async () => {
    setLoading(true);
    try {
      const response = await Network.authNetwork.get(FORM_TEMPLATE_URL);
      if (response.data.success) {
        const parsedData = JSON.parse(response.data.data);
        setFormFields(parsedData);
      }
    } catch (error) {
      console.error("Error fetching form template:", error);
      Alert.alert(
        "Error",
        "Failed to fetch form template. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const userId = Network.user?.id;
    const siteName = "Test Site"; // Replace with actual site name
    console.log(Network.user);
    try {

      const formDataObj = new FormData();
      formDataObj.append('userid', userId);
      formDataObj.append('sitename', siteName);
      formDataObj.append('site_id', '1');
      formDataObj.append('time', new Date().toISOString());
      formDataObj.append('data', JSON.stringify(formData));
      formDataObj.append('comment', comment);
      formDataObj.append('type', 'incident');
      formDataObj.append('images', ''); // Assuming images is a path or a URI
      formDataObj.append('lati', '');
      formDataObj.append('longi', '');

      const response = await Network.authNetwork.post(SUBMIT_FORM_URL,  formDataObj);

      console.log(response);

      Alert.alert("Success", "Form submitted successfully!");
      setFormData({});
      setComment("");
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert(
        "Error",
        "Failed to submit the form. Please try again later."
      );
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        animating={true}
        size="large"
        style={styles.loading}
        color={colors.primary}
      />
    );
  }

  return (
    <View style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {formFields.map((field, index) => {
          switch (field.type) {
            case "text":
              return (
                <View key={index} style={styles.fieldContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    {field.label}
                  </Text>
                  <TextInput
                    mode="outlined"
                    placeholder={field.label}
                    onChangeText={(value) =>
                      handleInputChange(field.name, value)
                    }
                    style={styles.input}
                   
                    
                  />
                </View>
              );
            case "textarea":
              return (
                <View key={index} style={styles.fieldContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    {field.label}
                  </Text>
                  <TextInput
                    mode="outlined"
                    multiline
                    placeholder={field.label}
                    onChangeText={(value) =>
                      handleInputChange(field.name, value)
                    }
                    style={styles.textarea}
                    
                  />
                </View>
              );
            case "select":
              return (
                <View key={index} style={styles.fieldContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    {field.label}
                  </Text>
                  <RNPickerSelect
                    onValueChange={(value) =>
                      handleInputChange(field.name, value)
                    }
                    items={
                      field.values?.map((option) => ({
                        label: option.label,
                        value: option.value
                      })) || []
                    }
                    value={formData[field.name]}
                    style={{
                      ...pickerSelectStyles,
                      inputIOS: {
                        ...pickerSelectStyles.inputIOS,
                        borderColor: colors.outline,
                        color: colors.text,
                        borderWidth:1
                      },
                      inputAndroid: {
                        ...pickerSelectStyles.inputAndroid,
                        borderColor: colors.outline,
                        color: colors.text,
                        borderWidth:1
                      }
                    }}
                  />
                </View>
              );
            case "radio-group":
              return (
                <View key={index} style={styles.fieldContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    {field.label}
                  </Text>
                  {field.values?.map((option, idx) => (
                    <View key={idx} style={styles.radioContainer}>
                      <BouncyCheckbox 
                        isChecked={formData[field.name]?.includes(option.value)}
                        onPress={() =>
                          handleInputChange(field.name, option.value)
                        }
                        fillColor={colors.primary}
                        unfillColor={colors.background}
                        text={option.label}
                        iconStyle={{
                          borderColor: colors.primary,
                          borderRadius: 4
                        }}
                        textStyle={{
                          textDecorationLine: "none",
                          color: colors.text
                        }}
                      />

                      
                    </View>
                  ))}
                </View>
              );
            case "checkbox-group":
              return (
                <View key={index} style={styles.fieldContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    {field.label}
                  </Text>
                  {field.values?.map((option, idx) => (
                    <View key={idx} style={styles.checkboxContainer}>
                      <BouncyCheckbox
                        size={25}
                        fillColor={colors.primary}
                        unfillColor={colors.background}
                        text={option.label}
                        iconStyle={{
                          borderColor: colors.primary,
                          borderRadius: 4
                        }}
                        textStyle={{
                          textDecorationLine: "none",
                          color: colors.text
                        }}
                        isChecked={formData[field.name]?.includes(option.value)}
                        onPress={(isChecked) => {
                          const newValues = formData[field.name] || [];
                          if (isChecked) {
                            handleInputChange(field.name, [
                              ...newValues,
                              option.value
                            ]);
                          } else {
                            handleInputChange(
                              field.name,
                              newValues.filter(
                                (value) => value !== option.value
                              )
                            );
                          }
                        }}
                      />
                    </View>
                  ))}
                </View>
              );
            case "date":
              return (
                <View key={index} style={styles.fieldContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>
                    {field.label}
                  </Text>
                  <Button
                    mode="contained"
                    onPress={() => setDatePickerVisible(true)}
                    style={styles.dateButton}
                    color={colors.primary}
                  >
                    Select Date
                  </Button>
                  {datePickerVisible && (
                    <DatePicker
                      modal
                      open={datePickerVisible}
                      date={selectedDate || new Date()}
                      onConfirm={(date) => {
                        setSelectedDate(date);
                        handleInputChange(field.name, date.toISOString());
                        setDatePickerVisible(false);
                      }}
                      onCancel={() => setDatePickerVisible(false)}
                    />
                  )}
                </View>
              );
            default:
              return null;
          }
        })}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Comment</Text>
          <TextInput
            mode="outlined"
            multiline
            placeholder="Any comments for the report"
            value={comment}
            onChangeText={setComment}
            style={styles.textarea}
          />
        </View>
      </ScrollView>
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 20
        }}
      >
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          color={colors.primary}
        >
          Submit
        </Button>
      </View>
      
    </View>
  );
}

 