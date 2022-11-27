import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

export const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    console.log({ username, password });
    const res = await mutate({ variables: { username, password } });
    const accessToken = res?.data?.authenticate?.accessToken
    authStorage.setAccessToken(accessToken)
    apolloClient.resetStore();
    return {data: accessToken};
  };

  return [signIn, result];
};
