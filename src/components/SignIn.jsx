import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import Text from "./Text";
import * as yup from "yup";

const styles = StyleSheet.create({
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
  username: yup.string().required('Username is required!'),
  password: yup.string().required('Password is required!'),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log({ values });
  };
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
