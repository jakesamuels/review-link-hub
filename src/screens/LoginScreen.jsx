import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>Log In</Text>

      <TextInput placeholder="example@email.com" />
      <TextInput placeholder="Password" />

      <TouchableOpacity>
        <Text>Log In</Text>
      </TouchableOpacity>

      <View>
        <Text>Don't have an account? </Text>
        <TouchableOpacity>
          <Text onPress={() => navigation.navigate("register")}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
