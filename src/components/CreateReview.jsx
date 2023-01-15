import { Pressable, View } from "react-native";
import Text from "./Text";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { styles } from "./SignIn";
import { useCreateReview } from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  ownername: yup.string().required("Repository owner name is required!"),
  repositoryname: yup.string().required("Repository name is required!"),
  rating: yup
    .number()
    .required("Rating number is required!")
    .min(0, "Rating cannot be a negative number")
    .max(100, "Rating cannot be over 100"),
  review: yup.string()
});

export const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownername, repositoryname, rating, review } = values;
    try {
      console.log({values})
      const { data } = await createReview({
        ownername,
        repositoryname,
        rating,
        review,
      });
      if (data) {
        console.log({data})
        navigate("/repository/" + data.createReview.repository.id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          ownername: "",
          repositoryname: "",
          rating: 0,
          review: "",
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const ReviewForm = ({ onSubmit }) => {
  return (
    <>
      <FormikTextInput
        style={styles.textField}
        name="ownername"
        placeholder="Repository owner name"
      />
      <FormikTextInput
        style={styles.textField}
        name="repositoryname"
        placeholder="Repository name"
      />
      <FormikTextInput
        style={styles.textField}
        name="rating"
        placeholder="Rating 0 - 100"
      />
      <FormikTextInput
        style={styles.textField}
        name="review"
        placeholder="Review"
        multiline={true}
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Post review</Text>
      </Pressable>
    </>
  );
};
