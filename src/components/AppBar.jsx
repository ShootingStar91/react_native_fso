import { View, StyleSheet, Pressable, Text } from 'react-native';
import theme from './../theme';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e'
  },
  header: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: theme.fontWeights.bold,
    marginLeft: 10,
    marginBottom: 20
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable><Text style={styles.header}>Repositories</Text></Pressable>
  </View>;
};

export default AppBar;