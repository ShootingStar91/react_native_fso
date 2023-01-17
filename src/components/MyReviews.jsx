import { View, FlatList, StyleSheet } from "react-native";
import { ItemSeparator } from "./RepositoryList";
import { Review } from "./SingleView";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 100,
    marginTop: 5
  },
});

export const MyReviews = () => {

  const { data, refetch } = useQuery(ME, {variables: {includeReviews: true}});
  const reviews = data?.me?.reviews
  console.log("My Reviews")
  console.log({data})

  const reviewNodes = reviews
    ? reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.listContainer}>
      <FlatList 
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <Review review={item} refetch={refetch} fullView />}
      />
    </View>
  );
}