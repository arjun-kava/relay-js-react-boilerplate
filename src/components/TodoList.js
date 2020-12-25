import MarkAllTodosMutation from "../mutations/MarkAllTodosMutation";
import Todo from "./Todo";

import React, { useEffect } from "react";
import {
  createFragmentContainer,
  createPaginationContainer,
  graphql,
} from "react-relay";

const TodoList = ({
  relay,
  user,
  user: { todos, totalCount, completedCount },
}) => {
  useEffect(() => {
    return {};
  }, []);

  const handleMarkAllChange = (e) => {
    const complete = e.currentTarget.checked;
    if (todos) {
      MarkAllTodosMutation.commit(relay.environment, complete, todos, user);
    }
  };

  const _loadMore = () => {
    console.log("relay.hasMore()", relay.hasMore());
    console.log("relay.isLoading()", relay.isLoading());
    if (!relay.hasMore() || relay.isLoading()) {
      return;
    }

    relay.loadMore(
      10, // Fetch the next 10 feed items
      (error) => {
        console.log({ error });
      }
    );
  };

  const nodes =
    todos && todos.edges
      ? todos.edges
          .filter(Boolean)
          .map((edge) => edge.node)
          .filter(Boolean)
      : [];

  return (
    <section className="main">
      <input
        checked={totalCount === completedCount}
        className="toggle-all"
        onChange={handleMarkAllChange}
        type="checkbox"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {nodes.map((node) => (
          <Todo key={node.id} todo={node} user={user} />
        ))}
      </ul>
      {totalCount > nodes.length && (
        <button
          className="load-more-btn"
          onClick={() => _loadMore()}
          title="Load More"
        >
          Load More
        </button>
      )}
    </section>
  );
};

/*export default createFragmentContainer(TodoList, {
  user: graphql`
    fragment TodoList_user on User {
      todos(
        first: 2147483647 # max GraphQLInt
      ) @connection(key: "TodoList_todos") {
        edges {
          node {
            id
            complete
            ...Todo_todo
          }
        }
      }
      id
      userId
      totalCount
      completedCount
      ...Todo_user
    }
  `,
});*/

export default createPaginationContainer(
  TodoList,
  {
    user: graphql`
      fragment TodoList_user on User
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 2 }
        cursor: { type: "String" }
      ) {
        todos(first: $count, after: $cursor)
          @connection(key: "TodoList_todos") {
          edges {
            node {
              id
              complete
              ...Todo_todo
            }
          }
        }
        id
        userId
        totalCount
        completedCount
        ...Todo_user
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.user && props.user.todos;
    },
    // This is also the default implementation of `getFragmentVariables` if it isn't provided.
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
        userID: fragmentVariables.userID,
      };
    },
    query: graphql`
      # Pagination query to be fetched upon calling 'loadMore'.
      # Notice that we re-use our fragment, and the shape of this query matches our fragment spec.
      query TodoListPaginationQuery($count: Int!, $cursor: String) {
        user(id: "me") {
          ...TodoList_user @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
);
