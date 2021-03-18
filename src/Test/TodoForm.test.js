import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import TodoForm from '../Component/TodoForm';

describe('TodoForm', () => {
  describe('#render', () => {
    it("should render a label, input, and button for adding todos", () => {
      const todoEdit = {
          id: 1,
          title: "Cooking",
          description: "Cooking some food",
      }
      const wrapper = shallow(<TodoForm  todoEdit={todoEdit}/>);
      const addLabel = wrapper.find('.addLabel');
      const addInputTitle = wrapper.find('.addInput-title');
      const addInputDesc = wrapper.find('.addInput-desc');
      const btn_add = wrapper.find('.btn_add');
      

      expect(addLabel).toHaveLength(1);
      expect(addInputTitle).toHaveLength(1);
      expect(addInputDesc).toHaveLength(1);
      expect(btn_add).toHaveLength(1);
    }) 
    it('should render a label, input, and button for editing todos', () => {
      const todoEdit = {
          id: 1,
          title: "Cooking",
          description: "Cooking some food",
      }
      const wrapper = shallow(<TodoForm  todoEdit={todoEdit}/>);
      const editLabel = wrapper.find('.editLabel');
      const editInputTitle = wrapper.find('.input-title-edit');
      const editInputDesc = wrapper.find('.input-desc-edit');
      const editBtn = wrapper.find('.btn-edit');

      expect(editLabel).toHaveLength(1);
      expect(editInputTitle).toHaveLength(1);
      expect(editInputDesc).toHaveLength(1);
      expect(editBtn).toHaveLength(1);
    })
  })
  describe('#handleAdd', () => {
    it('should invoke handleAdd function with correct title and description arguments', async () => {
      const handleAdd = jest.fn();
      const mockTitleEvent = {
        target: {
          value: 'New task'
        }
      };
      const mockDescEvent = {
        target: {
          value: 'This is a new task'
        }
      };    
      const todoEdit = { 
        id: 1,
        title: "Cooking",
        description: "Cooking some food",
      }
      const wrapper = mount(<TodoForm todoEdit ={todoEdit} handleAdd={handleAdd} />);
      const btnAdd = wrapper.find('.btn_add');
      const addInputTitle = wrapper.find('.addInput-title');
      const addInputDesc = wrapper.find('.addInput-desc');

      await act(async () => {
        await addInputTitle.simulate('change', mockTitleEvent);
        await addInputDesc.simulate('change', mockDescEvent);
        await btnAdd.simulate('click');
      });

      expect(handleAdd).toHaveBeenCalledWith('New task', 'This is a new task');
    });
  });

  describe('#handleEdit', () => { 
    it('should invoke handleEdit function with correct id, title, and description', async () => {
      const handleEdit = jest.fn();
      const todoEdit = {
        _id: "98889asd",
        title: "Cooking",
        description: "Cooking some food",
      }
      const mockEditTitleEvent = {
        target: {
          value: 'Update task'
        }
      };
      const mockEditDescEvent = {
        target: {
          value: 'This is an updated task'
        }
      };
      const wrapper = mount(<TodoForm todoEdit ={todoEdit} handleEdit={handleEdit}/>);
      const btnEdit = wrapper.find('.btn-edit');
      const editInputTitle = wrapper.find('.input-title-edit');
      const editInputDesc = wrapper.find('.input-desc-edit');

      await act(async () => {
        await editInputTitle.simulate('change', mockEditTitleEvent);
        await editInputDesc.simulate('change', mockEditDescEvent);
        await btnEdit.simulate('click');
      });

      expect(handleEdit).toHaveBeenCalledWith("98889asd", 'Update task', 'This is an updated task');
    })
    
  })
});
