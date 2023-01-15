import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import theme from "./../theme";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    display: "flex",
    paddingLeft: 10,
    paddingBottom: 20,
    flexDirection: "row",
  },
  header: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: theme.fontWeights.bold,
    flexGrow: 0,
    marginRight: 15,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = () => {
    console.log("signOut");
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  console.log({ data });

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.header}>Repositories</Text>
        </Link>
        {data?.me && (
          <Link to="/createreview/">
            <Text style={styles.header}>Create a review</Text>
          </Link>
        )}
        {!data?.me ? (
          <Link to="/signin">
            <Text style={styles.header}>Sign in</Text>
          </Link>
        ) : (
          <Pressable onPress={signOut} to="/signout">
            <Text style={styles.header}>Sign out</Text>
          </Pressable>
        )}
        {!data?.me && (
          <Link to="/signup">
            <Text style={styles.header}>Sign up</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
