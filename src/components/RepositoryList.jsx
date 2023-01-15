import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerItem: {
    display: "flex",
    paddingRight: 10,
    width: "50%"

  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  console.log({ repositoryNodes });
  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");

  const { repositories } = useRepositories({ orderBy, orderDirection });

  console.log({ repositories });

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Picker
            selectedValue={orderBy}
            onValueChange={(itemValue, itemIndex) => {
              console.log("Changing orderby to ", itemValue, itemIndex);
              setOrderBy(itemValue);
            }}
          >
            <Picker.Item label="Rating" value="RATING_AVERAGE" />
            <Picker.Item label="Date" value="CREATED_AT" />
          </Picker>
        </View>
        <View style={styles.headerItem}>
          <Picker
            selectedValue={orderDirection}
            onValueChange={(itemValue, itemIndex) => {
              console.log("Changing orderby to ", itemValue, itemIndex);
              setOrderDirection(itemValue);
            }}
          >
            <Picker.Item label="Descending" value="DESC" />
            <Picker.Item label="Ascending" value="ASC" />
          </Picker>
        </View>
      </View>

      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;
