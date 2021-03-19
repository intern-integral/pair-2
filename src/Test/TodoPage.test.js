import React from "react";
import { mount, shallow } from "enzyme";
import TodoPage from "../Component/TodoPage.js";
import {getTodos, postTodo, editTodo, deleteTodo} from "../services/TodoServices";
import { act } from 'react-dom/test-utils';
jest.mock("axios");
jest.mock("../services/TodoServices", () => ({
  getTodos: jest.fn(),
  postTodo : jest.fn(),
  editTodo : jest.fn(),
  deleteTodo : jest.fn()
}));

describe('TodoPages', () => {
  
  describe('#render', () => {
    it('should render a header, a Todolist component, and a TodoForm component', () => {
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
    it('should log an error when postTodo function fails', async () => {
      postTodo.mockRejectedValue({})
      global.console = {log: jest.fn()}
      const wrapper = mount(<TodoPage />);

      const todoForm = wrapper.find("TodoForm");
      todoForm.props().handleAdd('', '');
      await wrapper.update();

      expect(console.log).toHaveBeenCalled();   
      expect(console.log).toHaveBeenCalledTimes(1);     
    })
    it('should call post todo function with the correct params', async () => {
      postTodo.mockResolvedValue({
        _id : "60542d489d0c0b109446e183",
        title : "New task",
        description : "This is a new tasks",
        __v : 0
      })
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
      const id = "98889asd"
      editTodo.mockResolvedValue({
        _id : id,
        title : editedTodo.title ,
        description : editedTodo.description,
        __v : 0
      })
      const wrapper = mount(<TodoPage />); 

      const todoForm = wrapper.find('TodoForm');
      await todoForm.props().handleEdit(id, editedTodo.title, editedTodo.description);
      await (new Promise(resolve => setTimeout(resolve, 0)));
      await wrapper.update();
         
      expect(editTodo).toHaveBeenCalledWith("98889asd", editedTodo);     
    })
  })

  describe("#handleDelete", () => {
    it("should call delete todo function with the correct params", async () => {
      const id = '9872349kjsdkfk';
      deleteTodo.mockResolvedValue({
        _id : id,
        title : "New task",
        description : "This is a new tasks",
        __v : 0
      })
      const wrapper = mount(<TodoPage />);

      const todoListComponent = wrapper.find("TodoList");
      todoListComponent.props().handleDelete(id);
      await (new Promise(resolve => setTimeout(resolve, 0)));
      await wrapper.update();

      expect(deleteTodo).toHaveBeenCalledWith(id);     
   
    });

    it('should log an error when deleteTodo function fails', async () => {
      deleteTodo.mockRejectedValue({})
      global.console = {log: jest.fn()}
      const wrapper = mount(<TodoPage />);

      const todoListComponent = wrapper.find("TodoList");
      todoListComponent.props().handleDelete(34543);
      await wrapper.update();

      expect(console.log).toHaveBeenCalled();   
      expect(console.log).toHaveBeenCalledTimes(1);     
    })
  });
});
