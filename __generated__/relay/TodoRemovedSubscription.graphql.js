/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TodoRemovedSubscriptionVariables = {||};
export type TodoRemovedSubscriptionResponse = {|
  +todoRemoved: ?{|
    +id: string,
    +complete: boolean,
  |}
|};
export type TodoRemovedSubscription = {|
  variables: TodoRemovedSubscriptionVariables,
  response: TodoRemovedSubscriptionResponse,
|};
*/


/*
subscription TodoRemovedSubscription {
  todoRemoved {
    id
    complete
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Todo",
    "kind": "LinkedField",
    "name": "todoRemoved",
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
    "name": "TodoRemovedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TodoRemovedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a4969f4aa4fae6331348fbce198703e1",
    "id": null,
    "metadata": {},
    "name": "TodoRemovedSubscription",
    "operationKind": "subscription",
    "text": "subscription TodoRemovedSubscription {\n  todoRemoved {\n    id\n    complete\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1fe8f73144318ddfa1ef970de44b097f';

module.exports = node;
