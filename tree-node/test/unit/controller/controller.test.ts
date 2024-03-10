import request from 'supertest';
import express from 'express';
import { traverseTree ,TreeNode} from '../../../src/util/treeUtils';


  const app = express();
  app.use(express.json());
  
  app.post('/path', async (req, res) => {
    const tree: TreeNode = req.body;
  
    if (!tree) {
      res.status(500).send({ error: 'Empty request body' });
      return;
    }
  
    if (typeof tree !== 'object' || Array.isArray(tree) || !('data' in tree)) {
      res.status(500).send({ error: 'Invalid tree' });
      return;
    }
  
    try {
      const paths = await traverseTree(tree);
      res.json(paths);
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while traversing the tree.' });
    }
  });
  
  test('Returns response for valid request', async () => {
    const tree: TreeNode = {
      data: 'root',
      children: [
        { data: 'child1', children: [] },
        { data: 'child2', children: [] },
      ],
    };
  
    const response = await request(app)
      .post('/path')
      .send(tree)
      .expect('Content-Type', /json/)
      .expect(200);
  
    // Replace with the expected paths
    const expectedPaths = [['root', 'child1'], ['root', 'child2']];
    expect(response.body).toEqual(expectedPaths);
  });
  
  test('throws an error if request body is invalid', async () => {
    const invalidTree ="not an object"
  
    const response = await request(app)
      .post('/path')
      .send(invalidTree)
      .expect(500);
  
    expect(response.body).toEqual({ error: 'Invalid tree' });
  });
  
  test('throws an error if request body is empty', async () => {
    const response = await request(app)
      .post('/path')
      .send()
      .expect(500);
  
    expect(response.body).toEqual({ error: 'Invalid tree' });
  });