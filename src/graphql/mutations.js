import { gql } from "@apollo/client";

export const SIGN_IN = gql`
mutation signin ($username: String!, $password: String!) {
  authenticate(credentials: { username: $username, password: $password }) {
    accessToken
  }
}
`