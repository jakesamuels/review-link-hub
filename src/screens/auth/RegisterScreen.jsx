import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Register</Text>

      <TextInput placeholder="example@email.com" />
      <TextInput placeholder="Password" />
      <TextInput placeholder="Confirm Password" />

      <TouchableOpacity>
        <Text>Register</Text>
      </TouchableOpacity>

      <View>
        <Text>Already have an account? </Text>
        <TouchableOpacity>
          <Text onPress={() => navigation.navigate("login")}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
