import { View, StyleSheet, Text, ScrollView } from "react-native";
import theme from "./../theme";
import Constants from "expo-constants";
import { Link } from "react-router-native";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.header}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.header}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
