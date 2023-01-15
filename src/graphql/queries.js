import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Query($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
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
      reviews {
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
