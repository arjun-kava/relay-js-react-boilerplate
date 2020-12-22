/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TodoRemoveCompletedSubscriptionVariables = {||};
export type TodoRemoveCompletedSubscriptionResponse = {|
  +todoRemoveCompleted: ?{|
    +deletedTodoIds: ?$ReadOnlyArray<string>
  |}
|};
export type TodoRemoveCompletedSubscription = {|
  variables: TodoRemoveCompletedSubscriptionVariables,
  response: TodoRemoveCompletedSubscriptionResponse,
|};
*/


/*
subscription TodoRemoveCompletedSubscription {
  todoRemoveCompleted {
    deletedTodoIds
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "todoRemoveCompleted",
    "kind": "LinkedField",
    "name": "todoRemoveCompleted",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "deletedTodoIds",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoRemoveCompletedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TodoRemoveCompletedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0ef79031614ca514e5cd9d622cdc63c4",
    "id": null,
    "metadata": {},
    "name": "TodoRemoveCompletedSubscription",
    "operationKind": "subscription",
    "text": "subscription TodoRemoveCompletedSubscription {\n  todoRemoveCompleted {\n    deletedTodoIds\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ecbf2b77eafb4270f6eb285c92fd0ee4';

module.exports = node;
