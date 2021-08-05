var pathSum = function(root, targetSum) {
  const ans = [];

  if (!root) { return ans; }

  var dfs = function(root, sum, path) {
    const pathSum = sum + root.val;
    const curPath = path.slice();
    curPath.push(root.val);

    if (root.left == null && root.right == null) {
        if (pathSum == targetSum) { ans.push(curPath); }
        return;
    }

    if (root.left) { dfs(root.left, pathSum, curPath); }
    if (root.right) { dfs(root.right, pathSum, curPath); }
  }

  dfs(root, 0, []);
  
  return ans;
};
