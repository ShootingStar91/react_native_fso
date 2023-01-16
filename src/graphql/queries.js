import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Query($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $after: String, $first: Int) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, first: $first, after: $after) {
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
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
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
      reviews (first: $first, after: $after) {
        totalCount
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            user {
              id
              username
              createdAt
              reviews {
                totalCount
              }
              reviewCount
            }
            repository {
              id
              ownerName
              name
              createdAt
              fullName
              ratingAverage
              reviewCount
              stargazersCount
              watchersCount
              forksCount
              openIssuesCount
              url
              ownerAvatarUrl
              description
              language
              userHasReviewed
            }
            userId
            repositoryId
            rating
            createdAt
            text
          }
        }
      }
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
