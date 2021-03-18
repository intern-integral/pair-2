import {getTodos, postTodo, editTodo} from "../services/TodoServices";
import axios from 'axios' 

jest.mock('axios', () =>({
  get : jest.fn(),
  post : jest.fn(),
  patch : jest.fn()
}))

const TODO_URL = "http://localhost:3030/api/todos/";
const header =  {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
const expectedValue = {data: {data : [
          {
        id: 1,
        title: "Cooking",
        description: "Cooking some food",
      },
      {
        id: 2,
        title: "Running",
        description: "Running around my neighborhood",
      }
        ]}};

describe("TodoServices", () => {
  describe("#getTodos", () => {
    beforeEach(() => {
      
      // jest.spyOn(axios, 'get').mockReturnValue(expectedValue);
       axios.get.mockReturnValue(expectedValue);
    })
    afterEach(() => {
      jest.clearAllMocks();
      // jest.resetAllMocks();
    })
    it("should get all todos when called", async () => {
      const fetchedData = await getTodos();
      await Promise.resolve();
      
      expect(fetchedData).toEqual(expectedValue);
    });

    it("should get all todos when called using mock", async () => {
      const fetchedData = await getTodos();
      
      expect(fetchedData).toEqual(expectedValue);
    })
  })

  describe('#postTodo', () => { 
    it('should call axios post when called with correct params', async () => {
      const data = {
        title: "Running",
        description: "Running around my neighborhood",
      } 

      await postTodo(data);

      expect(axios.post).toHaveBeenCalledWith(TODO_URL, data, header);
    })
  })

  describe('#editTodo', () => {
    it('should call axios edit  when called with correct params', async () => {
      const id = "45234tgr3g2"
      const data = {
        title: "UpdatedTitle",
        description: "UpdatedDescription"
      }

      await editTodo(id, data)

      expect(axios.patch).toHaveBeenCalledWith(`${TODO_URL}/${id}`, data, header);
    })
  })
})