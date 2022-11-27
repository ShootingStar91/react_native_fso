import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";

export const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    console.log({ username, password });
    const res = await mutate({ variables: { username, password } });
    console.log({res});
    return {data: res?.data?.authenticate?.accessToken};
  };

  return [signIn, result];
};
