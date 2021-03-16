import React from "react";
import { mount, shallow } from "enzyme";
import TodoList from "../Component/TodoList.js";
import data from "../Component/data";

describe("TodoList", () => {
  describe("#render", () => {
    it("should render a todolist that's not empty", () => {
      const wrapper = shallow(<TodoList todos={data} />);

      const todos = wrapper.find(".todos");

      expect(todos).toHaveLength(2);
    });
  });

  describe("#handleDelete", () => {
    it("should delete a todo when the button is clicked", () => {
      const handleDelete = jest.fn();
      const wrapper = shallow(
        <TodoList todos={data} handleDelete={handleDelete} />
      );

      const btn = wrapper.find(".btn-delete").at(0);
      btn.simulate("click");

      expect(handleDelete).toHaveBeenCalledWith(1);
    });
  });
});
