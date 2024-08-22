import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { TextInput, Button, Title, HelperText, useTheme } from 'react-native-paper';
import { useNetwork } from '../global/NetworkProvider';
import { keys } from '../utils/keys';
import * as SecureStore from 'expo-secure-store';
import { styles } from '../styleSheets/loginStyleSheet';

interface LoginScreenProps {
  navigation: any;  
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [uid, setUid] = useState<string>('Te8q9');  
  const [password, setPassword] = useState<string>('1234');
  const [uidError, setUidError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const Network = useNetwork();
  const {colors} = useTheme()

  const validateUid = (uid: string): boolean => {
    // Implement UID validation logic
    return uid.trim().length > 0;
  };

  const handleLogin = async () => {
    let isValid = true;

    if (!validateUid(uid)) {
      setUidError('Please enter a valid UID');
      isValid = false;
    } else {
      setUidError('');
    }

    if (password === '') {
      setPasswordError('Password cannot be empty');
      isValid = false;
    } else if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      setIsLoading(true);
      try {
        const response = await Network.publicNetwork.post('login', {
          uuid: uid,
          password: password
        });

        // Handle success, e.g., save token and navigate
        console.log(response.data);
 
        // Assuming you want to save the token and navigate
        await SecureStore.setItemAsync(keys.token, response.data.token);
        await SecureStore.setItemAsync(keys.user, JSON.stringify(response.data.user));
        navigation.navigate('DrawerNav');
      } catch (error) {
        console.log(error);
        setUidError('Failed to login. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={[styles.title, {
          color:colors.text
        }]}>Welcome Back</Title>
        <Title style={styles.subtitle}>Please login to your account</Title>
      </View>

      <TextInput
        label="UID"
        value={uid}
        onChangeText={(text) => {
          setUid(text);
          if (uidError) {
            setUidError('');
          }
        }}
        mode="outlined"
        style={styles.input}
        error={!!uidError}
        left={<TextInput.Icon icon="account" />}
        autoCapitalize="none"
        textColor={colors.text}
        outlineColor={colors.outline}
      />
      <HelperText type="error" visible={!!uidError}>
        {uidError}
      </HelperText>

      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (passwordError) {
            setPasswordError('');
          }
        }}
        
        textColor={colors.text}
        outlineColor={colors.outline}
        
        mode="outlined"
        secureTextEntry={!passwordVisible}
        style={styles.input}
        error={!!passwordError}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={passwordVisible ? 'eye-off' : 'eye'}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
      />
      <HelperText type="error" visible={!!passwordError}>
        {passwordError}
      </HelperText>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => {
          Alert.alert('Forgot Password', 'Forgot password functionality is not implemented.');
        }}
      >
        <Title style={styles.forgotPasswordText}>Forgot Password?</Title>
      </TouchableOpacity>

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        contentStyle={styles.buttonContent}
        disabled={
          isLoading || !uid || !password || !!uidError || !!passwordError
        }
      >
        {isLoading ? <ActivityIndicator color="#fff" /> : 'Login'}
      </Button>
    </View>
  );
}

 
 