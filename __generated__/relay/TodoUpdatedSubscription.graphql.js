/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TodoUpdatedSubscriptionVariables = {||};
export type TodoUpdatedSubscriptionResponse = {|
  +todoUpdated: ?{|
    +id: string,
    +complete: boolean,
    +text: string,
  |}
|};
export type TodoUpdatedSubscription = {|
  variables: TodoUpdatedSubscriptionVariables,
  response: TodoUpdatedSubscriptionResponse,
|};
*/


/*
subscription TodoUpdatedSubscription {
  todoUpdated {
    id
    complete
    text
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
    "name": "todoUpdated",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TodoUpdatedSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TodoUpdatedSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2b03902c1c701406d2ab1bea75250c74",
    "id": null,
    "metadata": {},
    "name": "TodoUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription TodoUpdatedSubscription {\n  todoUpdated {\n    id\n    complete\n    text\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '246fe4552f7f25b063565584113ff588';

module.exports = node;
