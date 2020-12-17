import AddTodoMutation from "../mutations/AddTodoMutation";
import TodoList from "./TodoList";
import TodoListFooter from "./TodoListFooter";
import TodoTextInput from "./TodoTextInput";

import React from "react";
import { createFragmentContainer, graphql } from "react-relay";

const TodoApp = ({ relay, user }) => {
  const handleTextInputSave = (text) => {
    AddTodoMutation.commit(relay.environment, text, user);
    return;
  };

  const hasTodos = user.totalCount > 0;

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoTextInput
            className="new-todo"
            onSave={handleTextInputSave}
            placeholder="What needs to be done?"
          />
        </header>

        <TodoList user={user} relay={relay} />
        {hasTodos && <TodoListFooter user={user} />}
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>

        <p>
          Created by the{" "}
          <a href="https://www.linkedin.com/in/arjun-kava/">Arjun Kava</a>
        </p>
      </footer>
    </div>
  );
};

export default createFragmentContainer(TodoApp, {
  user: graphql`
    fragment TodoApp_user on User {
      id
      userId
      totalCount
      ...TodoListFooter_user
      ...TodoList_user
    }
  `,
});
