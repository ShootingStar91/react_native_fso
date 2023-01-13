import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryList";
import { SignInContainer } from "../components/SignIn";

/* eslint-disable jest/expect-expect */
describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const { getAllByTestId, debug } = render(
        <RepositoryListContainer repositories={repositories} />
      );
      const repositoryItems = getAllByTestId("repositoryItem");
      const [firstItem, secondItem] = repositoryItems;
      debug();

      expect(firstItem).toHaveTextContent("jaredpalmer/formik");
      expect(secondItem).toHaveTextContent("Flexible promise-based");
    });
  });
});

describe("SignInContainer", () => {
  it("calls the onSubmit handler with correct parameters", async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <SignInContainer onSubmit={onSubmit} />
    );

    fireEvent.changeText(getByPlaceholderText("Username"), "kalle");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");
    fireEvent.press(getByText("Sign in"));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "kalle",
        password: "password",
      });
    });
  });
});
