class Solution:
    def findJudge(self, N: int, trust: List[List[int]]) -> int:
        reliability = [1 for i in range(N)]
        for a, b in trust:
            reliability[a-1] -= 1
            reliability[b-1] += 1
        for i in range(N):
            if reliability[i] == N:
                return i+1
        return -1
