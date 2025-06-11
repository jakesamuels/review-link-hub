import { useEffect } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../utils/api";

const LoadingDashboardScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkBusinessProfile = async () => {
      try {
        const response = await api.get("/business-profiles/me");

        if (response?.data) {
          navigation.replace("Home");
        } else {
          navigation.replace("CreateProfileScreen");
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          navigation.replace("CreateProfileScreen");
        } else {
          Alert.alert("Error", "Something went wrong.");
        }
      }
    };

    checkBusinessProfile();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingDashboardScreen;
