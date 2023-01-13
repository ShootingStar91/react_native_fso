
import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepository = (id) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {repositoryId: id}
  });
  console.log({id, data});
  return { repository: data?.repository, error, loading };
};

export default useRepository;