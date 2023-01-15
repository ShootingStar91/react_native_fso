import { GET_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useRepositories = ({ orderDirection, orderBy, searchKeyword }) => {
  console.log({searchKeyword})
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderDirection,
      orderBy,
      searchKeyword
    },
  });

  return { repositories: data?.repositories, error, loading };
};

export default useRepositories;
