import React, { Image, StyleSheet, View } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    flexGrow: 0,
  },
  container: {
    padding: 10,
    backgroundColor: "white",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  header: {
    marginLeft: 15,
    display: "flex",
    flexGrow: 0
  },
  headerItem: {
    padding: 3,
  },
  stats: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  stat: {
    flexGrow: 0,
    padding: 5,
    paddingHorizontal: 30,
  },
});

const formatNumber = (number) => {
  if (number >= 1000) {
    number = (number / 1000).toFixed(1);
    return number + "k";
  }
  return number;
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header item={item} />
      </View>
      <View style={styles.stats}>
        <Stats item={item} />
      </View>
    </View>
  );
};

const Header = ({ item }) => {
  return (
    <>
      <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.header}>
        <Text fontWeight="bold" style={styles.headerItem}>
          {item.fullName}
        </Text>
        <Text color="textSecondary" style={{...styles.headerItem, paddingRight: 50}}>
          {item.description}
        </Text>
        <View style={styles.headerItem}>
          <Text
            style={{
              backgroundColor: "blue",
              borderRadius: 3,
              color: "white",
              padding: 3,
              alignSelf: "flex-start",
            }}
          >
            {item.language}
          </Text>
        </View>
      </View>
    </>
  );
};

const Stats = ({ item }) => {
  return (
    <>
      <View style={styles.stat}>
        <Text fontWeight="bold" style={{ alignSelf: "center" }}>
          {formatNumber(item.stargazersCount)}
        </Text>
        <Text color="textSecondary">Stars</Text>
      </View>
      <View style={styles.stat}>
        <Text fontWeight="bold" style={{ alignSelf: "center" }}>
          {formatNumber(item.forksCount)}
        </Text>
        <Text color="textSecondary">Forks</Text>
      </View>
      <View style={styles.stat}>
        <Text fontWeight="bold" style={{ alignSelf: "center" }}>
          {formatNumber(item.reviewCount)}
        </Text>
        <Text color="textSecondary">Reviews</Text>
      </View>
      <View style={styles.stat}>
        <Text fontWeight="bold" style={{ alignSelf: "center" }}>
          {formatNumber(item.ratingAverage)}
        </Text>
        <Text color="textSecondary">Rating</Text>
      </View>
    </>
  );
};

export default RepositoryItem;
