/**
 * This function finds the leaf nodes with the greatest depth and
 * returns an array of the paths to these leaf nodes.
 *
 * For example, if the depth of the tree is 5 and there are 3 leaf nodes
 * at this depth, then this function will return an array with 3 paths
 * (each path is an array of `TreeNode`s starting from the root and ending
 * at the leaf node).
 *
 * @param {TreeNode} tree a root tree node
 * @return {Array<Array<TreeNode>>} an array whose items are arrays that
 *   represent path to each leaf node at the greatest depth
 */

interface TreeNode {
  data: string;
  children: TreeNode[];
}

export async function traverseTree (tree: TreeNode): Promise<string[][]> {
  if (!tree) {
    throw new Error('Invalid tree');
  }

  tree.children = tree.children || [];
  
  const queue: TreeNode[][] = [];
  let maxDepth = 0;
  let paths: string[][] = [];

  queue.push([tree]);

  while (queue.length > 0) {
    const currentPath = queue.shift()!;
    const currentNode = currentPath[currentPath.length - 1];

    if (currentPath.length > maxDepth) {
      maxDepth = currentPath.length;
      paths = [currentPath.map(node => node.data)];
    } else if (currentPath.length === maxDepth) {
      paths.push(currentPath.map(node => node.data));
    }

    if(currentNode.children) {
      for (const child of currentNode.children) {
        queue.push([...currentPath, child]);
      }
    }
  }

  return paths;
}