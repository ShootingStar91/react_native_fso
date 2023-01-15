import { Pressable, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import Text from "./Text";
import * as yup from "yup";
import { useSignIn } from "../hooks/useSignIn";
import { useSignUp } from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";
import { styles } from "./SignIn";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required!").min(1, "Username has to be a non-empty string").max(30, "Username can be maximum 30 characters long"),
  password: yup.string().required("Password is required!").min(5, "PAssword has to be at least 5 characters long").max(50, "Password can be maximum 50 characters long"),
  passwordVerification: yup.string().oneOf([yup.ref('password')], null)
  .required('Password verification field has to match password')
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const [SignIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      console.log("Trying to sign in")
      const { data } = await signUp({ username, password });
      console.log({data})
      if (data?.createUser?.id) {
        const { data: signedInData } = await SignIn({ username, password });
        console.log({signedInData})
        if ( signedInData ) {
          navigate("/");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignUpForm = ({ onSubmit }) => {
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
      <FormikTextInput
      secureTextEntry
      style={styles.textField}
      name="passwordVerification"
      placeholder="Password verification"
    />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </>
  );
};

export default SignUp;

