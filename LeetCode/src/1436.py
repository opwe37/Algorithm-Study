import collections
class Solution:
    def destCity(self, paths: List[List[str]]) -> str:
        cities = collections.defaultdict(int)
        for start, end in paths:
            cities[start], cities[end]
            cities[start] = 1
        
        for key, val in cities.items():
            if val == 0:
                return key
        return -1
