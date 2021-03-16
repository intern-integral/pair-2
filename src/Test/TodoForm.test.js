import React from "react";
import { mount, shallow } from "enzyme";
import TodoForm from '../Component/TodoForm';
import { act } from 'react-dom/test-utils';

describe('TodoForm', () => {
    describe('#handleAdd', () => {
        it('should invoke handleAdd function with correct title and description arguments', async () => {
            const handleAdd = jest.fn();
            const mockTitleEvent = {
                target: {
                  value: "New task"
                },
            };
            const mockDescEvent = {
                target: {
                    value: "This is a new task"
                },
            };
            const wrapper = mount(<TodoForm handleAdd={handleAdd}/>);
            const btn_add = wrapper.find('.btn_add');
            const addInputTitle = wrapper.find('.addInput-title');
            const addInputDesc = wrapper.find('.addInput-desc');

            await act(async () => {
                await addInputTitle.simulate('change', mockTitleEvent);
                await addInputDesc.simulate('change', mockDescEvent);
                await btn_add.simulate('click');
            });

            expect(handleAdd).toHaveBeenCalledWith('New task', 'This is a new task');

        })
    })
})