import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("jwt", token);
  } catch (error) {
    console.error("Error setting token:", error);
    // You might want to throw the error or handle it more robustly
  }
};

export const getToken = async () => {
  try {
    const result = await AsyncStorage.getItem("jwt");
    return result; // Return the token or null/undefined
  } catch (error) {
    console.error("Error getting token:", error);
    // You might want to throw the error or return null/undefined
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("jwt");
  } catch (error) {
    console.error("Error removing token:", error);
    // You might want to throw the error or handle it more robustly
  }
};

// expo-secure-store (FOR PRODUCTION)
// import * as SecureStore from "expo-secure-store";

// export const setToken = async (token) => {
//   await SecureStore.setItemAsync("jwt", token);
// };

// export const getToken = async () => {
//   let result = await SecureStore.getItemAsync("jwt");
//   if (result) {
//     alert("🔐 Here's your value 🔐\n" + result);
//   } else {
//     alert("No values stored under that key.");
//   }
// };

// export const removeToken = async () => {
//   await SecureStore.deleteItemAsync("jwt");
// };
