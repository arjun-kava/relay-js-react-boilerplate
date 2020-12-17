import * as React from "react";
import ReactDOM from "react-dom";

import { QueryRenderer, graphql } from "react-relay";
import {
  Environment,
  Network,
  Observable,
  RecordSource,
  Store,
} from "relay-runtime";
import { SubscriptionClient } from "subscriptions-transport-ws";

import TodoApp from "./components/TodoApp";
async function fetchQuery(operation, variables) {
  const response = await fetch(`${process.env.GRAPHQL_HTTP_SERVER_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
}

const subscriptionClient = new SubscriptionClient(
  `${process.env.GRAPHQL_SOCKET_SERVER_URL}`,
  {
    reconnect: true,
  }
);

const subscribe = (request, variables) => {
  const subscribeObservable = subscriptionClient.request({
    query: request.text,
    operationName: request.name,
    variables,
  });
  // Important: Convert subscriptions-transport-ws observable type to Relay's
  return Observable.from(subscribeObservable);
};

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery, subscribe),
  store: new Store(new RecordSource()),
});

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.render(
    <QueryRenderer
      environment={modernEnvironment}
      query={graphql`
        query appQuery($userId: String) {
          user(id: $userId) {
            ...TodoApp_user
          }
        }
      `}
      variables={{
        // Mock authenticated ID that matches database
        userId: "me",
      }}
      render={({ error, props }) => {
        if (props && props.user) {
          return <TodoApp user={props.user} />;
        } else if (error) {
          return <div>{error.message}</div>;
        }

        return <div>Loading</div>;
      }}
    />,
    rootElement
  );
}
