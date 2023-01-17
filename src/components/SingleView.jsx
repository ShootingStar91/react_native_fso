import { useNavigate, useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { FlatList, View, StyleSheet, Pressable, Alert } from "react-native";
import { ItemSeparator } from "./RepositoryList";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    padding: 10,
  },
  container: {
    flexDirection: "row",
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
  buttonContainer: {
    paddingTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  viewButton: {
    maxWidth: "100%",
    backgroundColor: "blue",
    borderRadius: 4,
    color: "white",
    justifyContent: "center",
    padding: 10,
    marginRight: 7,
  },
  deleteButton: {
    maxWidth: "100%",
    backgroundColor: "red",
    borderRadius: 4,
    color: "white",
    justifyContent: "center",
    padding: 10,
    marginLeft: 7,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 18,
    color: "white",
    alignSelf: "center",
  },
});

export const SingleView = () => {
  const { id } = useParams();

  const { repository, fetchMore } = useRepository({
    repositoryId: id,
    first: 8,
  });

  if (!repository) {
    return null;
  }

  const onEndReached = () => {
    console.log({ repository });
    console.log("End of reviews reached");
    fetchMore();
  };

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

export const Review = ({ review, fullView, refetch }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    variables: { deleteReviewId: review.id },
  });
  const navigate = useNavigate();

  const parsedDate = new Date(Date.parse(review.createdAt));

  const onPressView = () => {
    console.log("Onpressview", { review });
    navigate("/repository/" + review.repositoryId);
  };

  const deleteConfirmed = () => {
    console.log("deleteConfirmed");
    deleteReview();
    refetch();
  };

  const onPressDelete = () => {
    Alert.alert("Delete?", "Are you sure you want to delete that review?", [
      { text: "Yes, delete", onPress: deleteConfirmed },
      {
        text: "Cancel",
        onPress: () => console.log("Delete cancelled"),
      },
    ]);
  };

  const date =
    parsedDate.getDate() +
    "." +
    (parsedDate.getMonth() + 1) +
    "." +
    parsedDate.getFullYear();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingCircle}>
            <Text style={styles.rating}>{review.rating}</Text>
          </View>
        </View>
        <View style={styles.reviewContainer}>
          <View style={styles.reviewHeader}>
            <Text fontWeight="bold">
              {fullView ? review.repository.fullName : review.user.username}
            </Text>
            <Text color="textSecondary">{date}</Text>
          </View>
          <View style={styles.reviewTextContainer}>
            <Text style={{ flexShrink: 1 }}>{review.text}</Text>
          </View>
        </View>
      </View>
      {fullView && (
        <View style={styles.buttonContainer}>
          <Pressable onPress={onPressView} style={styles.viewButton}>
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable onPress={onPressDelete} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
