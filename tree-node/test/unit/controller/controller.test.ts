
import { TreeNode} from '../../../src/util/treeUtils';
import { controller } from '../../../src/api/controller';
import { Request, Response }  from 'express';

class ResponseMock {
  public statusCode = 200;
  public content = null;
  status(code: number) {
    this.statusCode = code;
    return this;
  };
  send(data: any) {
    this.content = data;
    return this;
  }
  json(data: any) {
    this.content = data;
    return this;
  }
}
 
  
  test('Returns response for valid request', async () => {
    const tree: TreeNode = {
      data: 'root',
      children: [
        { data: 'child1', children: [] },
        { data: 'child2', children: [] },
      ],
    };
  
    
    const response = new ResponseMock();
    await controller({ body: tree } as Request, response as unknown as Response);
  
  
    const expectedPaths = [['root', 'child1'], ['root', 'child2']];
    expect(response.content).toEqual(expectedPaths);
  });
  
  test('throws an error if request body is invalid', async () => {
    const invalidTree ="not an object"
  
    const response = new ResponseMock();
    await controller({ body: invalidTree} as Request, response as unknown as Response);;
  
    expect(response.content).toEqual({ error: 'Invalid tree' });
  });
  
  test('throws an error if request body is empty', async () => {
    const response = new ResponseMock();
    await controller({} as Request, response as unknown as Response);
  
    expect(response.content).toEqual({ error: 'Empty request body' });
  });