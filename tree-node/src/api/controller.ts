// todo: Implement an API controller with a REST endpoint
//  The endpoint should receives a tree in the request body via a POST and then returns the path in the response
import express from 'express';
import { traverseTree } from '../util/treeUtils'; // Import the traverseTree function and TreeNode interface

interface TreeNode {
  data: string;
  children: TreeNode[];
}

const app = express();
app.use(express.json()); // for parsing application/json

app.post('/path', async (req, res) => {
  const tree: TreeNode = req.body;
  try {
    const paths = await traverseTree(tree);
    res.json(paths);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});