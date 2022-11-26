import { gql } from "@apollo/client"

export const GET_REPOSITORIES = gql`
query Query {
  repositories {
    edges {
      node {
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        forksCount
        url
        ownerAvatarUrl
        description
        language
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
  }
}
`;