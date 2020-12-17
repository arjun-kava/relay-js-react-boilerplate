/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TodoAddedSubscriptionVariables = {||};
export type TodoAddedSubscriptionResponse = {|
  +todoAdded: ?{|
    +node: ?{|
      +id: string,
      +complete: boolean,
      +text: string,
    |},
    +cursor: string,
  |}
|};
export type TodoAddedSubscription = {|
  variables: TodoAddedSubscriptionVariables,
  response: TodoAddedSubscriptionResponse,
|};
*/


/*
subscription TodoAddedSubscription {
  todoAdded {
    node {
      id
      complete
      text
    }
    cursor
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TodoEdge",
    "kind": "LinkedField",
    "name": "todoAdded",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Todo",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "complete",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "text",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cursor",
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
    "name": "TodoAddedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TodoAddedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "8e1345481366d467b95b713654d76900",
    "id": null,
    "metadata": {},
    "name": "TodoAddedSubscription",
    "operationKind": "subscription",
    "text": "subscription TodoAddedSubscription {\n  todoAdded {\n    node {\n      id\n      complete\n      text\n    }\n    cursor\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5acd46434b5dc760c3e6f4d0b6401635';

module.exports = node;
