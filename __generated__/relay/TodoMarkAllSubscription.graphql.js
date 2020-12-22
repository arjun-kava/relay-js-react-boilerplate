/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TodoMarkAllSubscriptionVariables = {||};
export type TodoMarkAllSubscriptionResponse = {|
  +todoMarkAll: ?{|
    +complete: ?boolean
  |}
|};
export type TodoMarkAllSubscription = {|
  variables: TodoMarkAllSubscriptionVariables,
  response: TodoMarkAllSubscriptionResponse,
|};
*/


/*
subscription TodoMarkAllSubscription {
  todoMarkAll {
    complete
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "todoMarkAll",
    "kind": "LinkedField",
    "name": "todoMarkAll",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "complete",
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
    "name": "TodoMarkAllSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TodoMarkAllSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "9f194ae2046e73014f021434e8b73d39",
    "id": null,
    "metadata": {},
    "name": "TodoMarkAllSubscription",
    "operationKind": "subscription",
    "text": "subscription TodoMarkAllSubscription {\n  todoMarkAll {\n    complete\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ac8fd9acf83a06e9c0c78fa456c57330';

module.exports = node;
