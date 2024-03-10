import { TreeNode, traverseTree} from '../util/treeUtils'
import { Request, Response } from 'express';

export async function controller (req:Request, res:Response) {
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
    const paths =  traverseTree(tree);
    res.json(paths);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while traversing the tree.' });
 
  }
}