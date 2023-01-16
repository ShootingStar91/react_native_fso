import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { FlatList, View, StyleSheet } from "react-native";
import { ItemSeparator } from "./RepositoryList";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  ratingContainer: {
    width: 70,
    display: "flex",
    flexGrow: 0,
    padding: 8,
  },
  rating: {
    fontSize: 22,
    text: "blue",
    alignSelf: "center",
  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "blue",
    overflow: "hidden",
    borderWidth: 2,
    justifyContent: "center",
    alignContent: "center",
  },
  reviewContainer: {
    display: "flex",
    flexGrow: 1,
    minWidth: 0,
  },
  reviewHeader: {
    display: "flex",
    flexGrow: 0,
  },
  reviewTextContainer: {
    display: "flex",
    flexGrow: 1,
    paddingTop: 2,
    paddingBottom: 2,
    maxWidth: "92%",
    minWidth: 0,
  },
});

export const SingleView = () => {
  const { id } = useParams();

  const { repository, fetchMore } = useRepository({ repositoryId: id, first: 8 });

  if (!repository) {
    return null;
  }

  const onEndReached = () => {
    console.log({repository})
    console.log("End of reviews reached");
    fetchMore();
  }
  
  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  console.log({ reviewNodes });

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <Review review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem item={repository} fullView={true} />
          <ItemSeparator />
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
    />
  );
};

const Review = ({ review }) => {
  const parsedDate = new Date(Date.parse(review.createdAt));

  const date =
    parsedDate.getDate() +
    "." +
    (parsedDate.getMonth() + 1) +
    "." +
    parsedDate.getFullYear();
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingCircle}>
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
      </View>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewHeader}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text color="textSecondary">{date}</Text>
        </View>
        <View style={styles.reviewTextContainer}>
          <Text style={{ flexShrink: 1 }}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};
