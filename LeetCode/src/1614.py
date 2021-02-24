class Solution:
    def maxDepth(self, s: str) -> int:
        depth, max_depth = 0, 0
        for ch in s:
            if ch == '(':
                depth += 1
            elif ch == ')':
                max_depth = max(depth, max_depth)
                depth -= 1
        return max_depth
