import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import Text from "./Text";
import * as yup from "yup";
import { useSignIn } from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    minWidth: "100%",
  },
  textField: {
    maxWidth: "100%",
    backgroundColor: "white",
    borderRadius: 4,
    padding: 10,
    borderWidth: 1,
    borderColor: "grey",
    marginBottom: 10,
  },
  button: {
    maxWidth: "100%",
    backgroundColor: "blue",
    borderRadius: 4,
    color: "white",
    justifyContent: "center",
    padding: 10,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required!"),
  password: yup.string().required("Password is required!"),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      if (data) {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignInForm = ({ onSubmit }) => {
  return (
    <>
      <FormikTextInput
        style={styles.textField}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        secureTextEntry
        style={styles.textField}
        name="password"
        placeholder="Password"
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </>
  );
};

export default SignIn;

