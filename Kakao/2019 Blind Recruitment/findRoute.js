function solution(nodeinfo) {
  var nodes = [];
  for (let num = 0; num < nodeinfo.length; num++) {
    let node = new Node(num+1, nodeinfo[num]);
    nodes.push(node);
  }

  nodes.sort(function(a, b) {
    if (b.position[1] > a.position[1]) return 1;
    else if(b.position[1] == a.position[1] && a.position[0] > b.position[0]) return 1;
    else return -1;
  });

  var tree = makeBinaryTree(nodes);

  var preorder_result = [];
  function preorder(d_tree) {
    preorder_result.push(d_tree.number);
    if (d_tree.left != -1) preorder(d_tree.left);
    if (d_tree.right != -1) preorder(d_tree.right);
  }
  preorder(tree);

  var postorder_result = [];
  function postorder(d_tree) {
    if (d_tree.left != -1) postorder(d_tree.left);
    if (d_tree.right != -1) postorder(d_tree.right);
    postorder_result.push(d_tree.number);
  }
  postorder(tree);

  var answer = [];
  answer.push(preorder_result);
  answer.push(postorder_result)

  return answer;
}

function makeBinaryTree(nodes) {
  if (nodes.length == 0) {
    return -1;
  }
  var rootNode = nodes.shift();

  var candidateNodeOfLeft = nodes.filter(function(value) {
    return value.position[0] < rootNode.position[0]
  });
  var candidateNodeOfRight = nodes.filter(function(value) {
    return value.position[0] > rootNode.position[0]
  });

  rootNode.left = makeBinaryTree(candidateNodeOfLeft);
  rootNode.right = makeBinaryTree(candidateNodeOfRight);

  return rootNode;
}

class Node {
  constructor(number, position) {
    this.number = number;
    this.position = position;
    this.left;
    this.right;
  }
}
