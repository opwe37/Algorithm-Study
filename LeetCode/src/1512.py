import collections

class Solution:
    def numIdenticalPairs(self, nums: List[int]) -> int:
        elements_count = collections.defaultdict(int)
        answer = 0
        for n in nums:
            answer += elements_count[n]
            elements_count[n] += 1
        return answer
