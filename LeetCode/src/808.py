import collections

class Solution:
    def soupServings(self, N: int) -> float:
        if N >= 4800:
            return 1
        
        memo = collections.defaultdict(int)
        opers = [[100, 0], [75, 25], [50, 50], [25, 75]]
        def dfs(a_volume: int, b_volume: int) -> float:
            if a_volume <= 0 or b_volume <= 0:
                return 0.5 if (a_volume <= 0 and b_volume <= 0) else 1 if a_volume <= 0 else 0
            
            if (a_volume, b_volume) in memo:
                return memo[a_volume, b_volume]
            
            prob = 0
            for a_serve, b_serve in opers:
                prob += dfs(a_volume - a_serve, b_volume - b_serve)
            prob *= 0.25
            memo[a_volume, b_volume] = prob
            return memo[a_volume, b_volume]
        return dfs(N, N)
