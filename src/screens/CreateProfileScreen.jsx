import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import api from "../utils/api";
import { useNavigation } from "@react-navigation/native";

const CreateProfileScreen = () => {
  const navigation = useNavigation();

  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateProfile = async () => {
    setIsLoading(true);
    setErrorMessage("");

    if (!businessName.trim()) {
      setErrorMessage("Business Name is required.");
      setIsLoading(false);
      return;
    }

    const newProfile = {
      name: businessName.trim(),
      logoUrl: logoUrl.trim(),
      description: description.trim(),
      industry: industry.trim(),
      website: businessWebsite.trim(),
    };

    try {
      const response = await api.post("/business-profiles", newProfile);

      console.log("Profile creation successful:", response.data);

      navigation.replace("BusinessProfile");
    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage(
        error.response?.data?.message || // Get the specific error message from your backend (e.g., "Incorrect email or password")
          error.message || // Fallback to a generic Axios error message (e.g., network issues)
          "Login failed. Please try again." // Generic fallback message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <Text>Create Your Business Profile</Text>

      <TextInput
        placeholder="Business Name"
        value={businessName}
        onTextChange={setBusinessName}
      />
      <TextInput
        placeholder="description (Optional)"
        value={description}
        onTextChange={setDescription}
        multiline
        numberOfLines={4}
      />
      <TextInput
        placeholder="Industry/Category (Optional)"
        value={industry}
        onTextChange={setIndustry}
      />
      <TextInput
        placeholder="Website (Optional)"
        value={businessWebsite}
        onTextChange={setBusinessWebsite}
      />
      {/* UPLOAD LOGO */}

      {errorMessage && <Text>{errorMessage}</Text>}

      <View>
        <TouchableOpacity onPress={handleCreateProfile} disabled={isLoading}>
          <Text>Create Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateProfileScreen;
