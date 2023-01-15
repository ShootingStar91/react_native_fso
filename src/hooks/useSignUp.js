import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";

export const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async ({ username, password }) => {
    console.log({ username, password });
    const res = await mutate({ variables: { user: { username, password } } });
    return { data: res?.data };
  };

  return [signUp, result];
};
