class Solution:
    def findMinMoves(self, machines: List[int]) -> int:
        _sum = sum(machines)
        target, r = _sum // len(machines), _sum % len(machines)
        if r != 0:
            return -1
        
        _max, total = 0, 0
        for d in machines:
            sub = d - target
            total += sub
            _max = max(_max, sub, abs(total))
            
        return _max
