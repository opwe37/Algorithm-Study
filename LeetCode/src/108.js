/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

var sortedArrayToBST = function(nums) {
    var buildBST = function (nums, lo, hi) {
        if (lo > hi) { return null; }
        
        const mid = lo + Math.floor((hi - lo) / 2);
        
        const newNode = new TreeNode(nums[mid]);
        newNode.left = buildBST(nums, lo, mid-1);
        newNode.right = buildBST(nums, mid+1, hi);
        
        return newNode
    }
    
    return buildBST(nums, 0, nums.length-1);
};
