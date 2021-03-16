import React from "react";
import { mount, shallow } from "enzyme";
import TodoPage from "../Component/TodoPage.js";

describe("TodoPages", () => {
  describe("#render", () => {
    it("should render a header and a Todolist component", () => {
      const wrapper = shallow(<TodoPage />);

      const todoPageHeader = wrapper.find("h1");
      const todoList = wrapper.find("TodoList");

      expect(todoPageHeader).toHaveLength(1);
      expect(todoList).toHaveLength(1);
    });
  });

  describe("#handleDelete", () => {
    it("should decrease todos length when handle delete is invoked", () => {
      const wrapper = shallow(<TodoPage />);

      const todoListComponent = wrapper.find("TodoList");
      todoListComponent.props().handleDelete(1);

      const newTodoListComponent = wrapper.find("TodoList");

      expect(newTodoListComponent.props().todos.length).toBe(1);
      expect(newTodoListComponent.props().todos).toEqual([
        {
          id: 2,
          title: "Running",
          description: "Running around my neighborhood",
        },
      ]);
    });
  });
});
