class Solution:
    def countBits(self, num: int) -> List[int]:
        return [f'{n:b}'.count('1') for n in range(0, num+1)]
