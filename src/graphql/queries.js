import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Query {
    repositories {
      edges {
        node {
          id
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

export const GET_REPOSITORY = gql`
query Repository($repositoryId: ID!) {
  repository(id: $repositoryId) {
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
  }


`;

export const ME = gql`
  {
    me {
      id
      username
    }
  }
`;
