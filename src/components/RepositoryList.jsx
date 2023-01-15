import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useState } from "react";
import { Menu, Provider, Button } from "react-native-paper";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {},
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
  },
});

const ListViewHeader = ({ order, setOrder }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => {
    console.log("Setting menu visible");
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);

  return (
    <View>
      <View>
        <Menu
          visible={visible}
          anchor={<Button onPress={openMenu}>Order by</Button>}
          onDismiss={closeMenu}
        >
          <Menu.Item
            onPress={() =>
              setOrder({
                orderBy: "AVERAGE_RATING",
                orderDirection: order.orderDirection,
              })
            }
            title="Rating"
          />
          <Menu.Item
            onPress={() =>
              setOrder({
                orderBy: "CREATED_AT",
                orderDirection: order.orderDirection,
              })
            }
            title="Created"
          />
        </Menu>
      </View>
    </View>
  );
};

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
  const [order, setOrder] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  });
  const { repositories } = useRepositories(order);

  console.log({ repositories });

  return (
    <View>
      <ListViewHeader order={order} setOrder={setOrder} />
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;
