class Solution:
    def buildArray(self, target: List[int], n: int) -> List[str]:
        result = list()
        element = 1
        for val in target:
            while element <= val:
                result.append('Push') 
                (element != val) and result.append('Pop')
                element += 1
        return result
