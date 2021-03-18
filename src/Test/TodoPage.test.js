import React from "react";
import { mount, shallow } from "enzyme";
import TodoPage from "../Component/TodoPage.js";
import {getTodos, postTodo, editTodo} from "../services/TodoServices";
import { act } from 'react-dom/test-utils';
jest.mock("axios");
jest.mock("../services/TodoServices", () => ({
  getTodos: jest.fn(),
  postTodo : jest.fn(),
  editTodo : jest.fn()
}));

describe("TodoPages", () => {
  
  describe("#render", () => {
    it("should render a header, a Todolist component, and a TodoForm component", () => {
      const wrapper = shallow(<TodoPage />);

      const todoPageHeader = wrapper.find("h1");
      const todoList = wrapper.find("TodoList");
      const todoForm = wrapper.find("TodoForm");

      expect(todoPageHeader).toHaveLength(1);
      expect(todoList).toHaveLength(1);
      expect(todoForm).toHaveLength(1);
    }); 
    
  });
  describe("#fetchingData", () => {
    it("should get data from backend when it first rendered", async () => {
      const data = [
        {
          id: 1,
          title: "Cooking",
          description: "Cooking some food"
        }
      ]
      
      getTodos.mockResolvedValue({data : {data}});
      let wrapper;
      await act(async ()=> {
        wrapper = await mount(<TodoPage />);  
      });
      await wrapper.update();
      const todoListComponent = wrapper.find("TodoList");
      const todos = todoListComponent.props().todos;
     
      expect(todos).toEqual(data);
      jest.resetAllMocks();

    });
  });

  describe('#handleAdd', () => {
    it('should call post todo function with the correct params', async () => {
      const wrapper = mount(<TodoPage />); 

      const todoForm = wrapper.find('TodoForm');
      await todoForm.props().handleAdd('New task', 'This is a new tasks');
      await (new Promise(resolve => setTimeout(resolve, 0)));
      await wrapper.update();
         
      const newObject = {
        title : 'New task', 
        description : 'This is a new tasks'
      }
      expect(postTodo).toHaveBeenCalledWith(newObject);     
    })
  })

  describe('#handleEdit', () => {
    it('should call the edit todo function with the correct params', async () => {
      const editedTodo = {
        title : 'New task', 
        description : 'This is a new tasks'
      }
      const wrapper = mount(<TodoPage />); 

      const todoForm = wrapper.find('TodoForm');
      await todoForm.props().handleEdit("98889asd", 'New task', 'This is a new tasks');
      await (new Promise(resolve => setTimeout(resolve, 0)));
      await wrapper.update();
         
      expect(editTodo).toHaveBeenCalledWith("98889asd", editedTodo);     
    })
  })

  // describe("#handleDelete", () => {
  //   it("should decrease todos length when handle delete is invoked", () => {
  //     const wrapper = shallow(<TodoPage />);

  //     const todoListComponent = wrapper.find("TodoList");
  //     todoListComponent.props().handleDelete(1);

  //     const newTodoListComponent = wrapper.find("TodoList");

  //     expect(newTodoListComponent.props().todos.length).toBe(1);
  //     expect(newTodoListComponent.props().todos).toEqual([
  //       {
  //         id: 2,
  //         title: "Running",
  //         description: "Running around my neighborhood",
  //       },
  //     ]);
  //   });
    
  // });
});
