import React from "react";
import { shallow } from "enzyme";
import App from "../App"

describe('App', () => {
  
  describe('#render', () => {
    it('should render a TodoPage component', () => {
      const wrapper = shallow(<App />);
      const TodoPage = wrapper.find('TodoPage');
    
      expect(TodoPage).toHaveLength(1);
    })
  })

});
