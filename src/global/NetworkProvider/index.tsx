import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { showMessage } from 'react-native-flash-message';
import * as SecureStore from 'expo-secure-store';
import { keys } from '../../utils/keys'; 

export const BASE_URL = 'https://admin.prorota.app/api'; // Set your base URL here

// Define types for the context
interface NetworkContextProps {
  authNetwork: AxiosInstance;
  publicNetwork: AxiosInstance;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  user:object;
  setUser:React.Dispatch<React.SetStateAction<object>>;
  toggleTheme:any;
  getAccessToken:any;
  getUserInfo:any;
}

export const NetworkContext = createContext<NetworkContextProps | undefined>(undefined);

export const useNetwork = (): NetworkContextProps => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};

interface NetworkProviderProps {
  children: ReactNode;
  toggleTheme:any
}

export function NetworkProvider({ children  , toggleTheme }: NetworkProviderProps) {
  const [token, setToken] = useState<string>('');
  const [user, setUser ] = useState<object>({});
 


  // Fetch the access token
  const getAccessToken = async () => {
    const storedToken = await SecureStore.getItemAsync(keys.token);
    setToken(storedToken || '');
  };

  const getUserInfo = async () => {
    const storedUser = await SecureStore.getItemAsync(keys.user);
    setUser(storedUser ? JSON.parse(storedUser) : {});
  };

  // Create Axios instances
  const authNetwork = axios.create({
    baseURL: BASE_URL,
  });

  const publicNetwork = axios.create({
    baseURL: BASE_URL,
  });

  // Add request interceptor for authNetwork
  authNetwork.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      config.headers = {
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'multipart/form-data',
      };
      return config;
    },
    (error) => {
      showMessage({
        message: 'Internet error',
        type: 'danger',
      });
      return Promise.reject(error);
    }
  );

  // Add response interceptor for publicNetwork
  publicNetwork.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      showMessage({
        message: 'Network error',
        type: 'danger',
      });
      return Promise.reject(error);
    }
  );

 

  return (
    <NetworkContext.Provider
      value={{
        authNetwork,
        publicNetwork,
        token, 
        setToken,
        user,
        setUser,
        toggleTheme,
        getAccessToken,
        getUserInfo,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}
