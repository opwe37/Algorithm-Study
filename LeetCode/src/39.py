class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        results = []
        def dfs(elements: List[int], start: int, k: int) -> None:
            if k <= 0:
                results.append(elements[:]) if k == 0 else None
                return
            
            for idx in range(start, len(candidates)):
                elements.append(candidates[idx])
                dfs(elements, idx, k - candidates[idx])
                elements.pop()
        dfs([], 0, target)
        return results
