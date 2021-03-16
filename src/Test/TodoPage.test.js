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

    it("should render a label, input, and button for adding todos", () => {
      const wrapper = shallow(<TodoPage />);

      const addLabel = wrapper.find('.addLabel');
      const addInputTitle = wrapper.find('.addInput-title');
      const addInputDesc = wrapper.find('.addInput-desc');
      const btn_add = wrapper.find('.btn_add');

      expect(addLabel).toHaveLength(1);
      expect(addInputTitle).toHaveLength(1);
      expect(addInputDesc).toHaveLength(1);
      expect(btn_add).toHaveLength(1);
    })
  });

  describe('#handleAdd', () => {
    it('should add a new todo when the handleAdd is invoked', async () => {
      const wrapper = shallow(<TodoPage />);
      const todoForm = wrapper.find('TodoForm');

      await todoForm.props().handleAdd('New task', 'This is a new task');
      const todoListComponent = wrapper.find("TodoList");
      

      expect(todoListComponent.props().todos.length).toBe(3);
      expect(todoListComponent.props().todos).toEqual([
        {
          id: 1,
          title: "Cooking",
          description: "Cooking some food",
        },
        {
          id: 2,
          title: "Running",
          description: "Running around my neighborhood",
        },
        {
          id: 3,
          title: "New task",
          description: "This is a new task",
        }
      ]);
    })
  })

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
