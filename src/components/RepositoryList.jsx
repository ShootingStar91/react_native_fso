import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import TextInput from "./TextInput";
import { useDebounce } from 'use-debounce';

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

export const RepositoryListContainer = ({ repositories, onEndReached }) => {
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
        onEndReached={onEndReached}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [filter, setFilter] = useState("")
  const [searchKeyword] = useDebounce(filter, 400);

  const { repositories, fetchMore } = useRepositories({ orderBy, orderDirection, searchKeyword, first: 8 });

  console.log({ filter });

  const onEndReached = () => {
    console.log({repositories})
    console.log("End of list reached");
    fetchMore();
  }

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
      <View style={{paddingLeft: 10, paddingBottom: 10}}>
          <TextInput style={{fontWeight: "bold"}} onChangeText={(text) => setFilter(text)} placeholder={"Search for..."} />
        </View>
      <RepositoryListContainer repositories={repositories} onEndReached={onEndReached} />
    </View>
  );
};

export default RepositoryList;
