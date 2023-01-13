import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import RepositoryItem from './RepositoryItem';
export const SingleView = () => {
  const { id } = useParams();

  const { repository } = useRepository(id);
  console.log('SingleView')
  
  console.log({repository})

  return (
    <RepositoryItem item={repository} fullView={true} />
  );

}