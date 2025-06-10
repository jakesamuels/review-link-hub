import { createContext, useState, useEffect, useContext } from "react";
import { getToken, removeToken, setToken } from "./../utils/authStorage";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedToken = await getToken();

        if (storedToken) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (token) => {
    await setToken(token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await removeToken();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading application...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
