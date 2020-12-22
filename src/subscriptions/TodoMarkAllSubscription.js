import { graphql, requestSubscription } from "react-relay";
import { ConnectionHandler } from "relay-runtime";

const subscription = graphql`
  subscription TodoMarkAllSubscription {
    todoMarkAll {
      complete
    }
  }
`;

function sharedUpdater(store, user, complete) {
  const userProxy = store.get(user.id);
  const connection = ConnectionHandler.getConnection(
    userProxy,
    "TodoList_todos"
  );
  if (connection) {
    const edges = connection.getLinkedRecords("edges");
    edges.forEach((existingRecord) => {
      const node = existingRecord.getLinkedRecord("node");
      node.setValue(complete, "complete");
    });
    if (complete) {
      const totalCount = userProxy.getValue("totalCount");
      userProxy.setValue(totalCount, "completedCount");
    } else {
      userProxy.setValue(0, "completedCount");
    }
  }
}

function request(enviroment, user) {
  if (enviroment) {
    const subscriptionConfig = {
      subscription: subscription,
      variables: {},
      updater: (store) => {
        const todoMarkAll = store.getRootField("todoMarkAll");
        const complete = todoMarkAll.getValue("complete");
        sharedUpdater(store, user, complete);
      },
      onError: (error) => {
        throw new Error(error);
      },
    };

    return requestSubscription(enviroment, subscriptionConfig);
  }
}

export default { request };
