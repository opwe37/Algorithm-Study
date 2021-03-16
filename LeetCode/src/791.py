import collections

class Solution:
    def customSortString(self, S: str, T: str) -> str:
        dic = collections.defaultdict(int)
        for key, char in enumerate(S):
            dic[char] = key
        result = sorted(T, key=lambda x: dic[x])
        return ''.join(result)
