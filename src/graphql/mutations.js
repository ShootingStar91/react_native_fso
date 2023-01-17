import { gql } from "@apollo/client";

export const SIGN_IN = gql`
mutation signin ($username: String!, $password: String!) {
  authenticate(credentials: { username: $username, password: $password }) {
    accessToken
  }
}
`

export const CREATE_REVIEW = gql`
mutation createReview($review: CreateReviewInput) {
  createReview(review: $review) {
    repository {
      id
    }
  }
}

`


export const SIGN_UP = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
mutation Mutation($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`