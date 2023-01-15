import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({
    ownername,
    repositoryname,
    rating,
    review,
  }) => {
    console.log({ ownername, repositoryname, rating, review });
    const res = await mutate({
      variables: {
        review: {
          ownerName: ownername,
          repositoryName: repositoryname,
          rating: parseInt(rating),
          text: review,
        },
      },
    });
    const data = res?.data;
    return { data };
  };

  return [createReview, result];
};
