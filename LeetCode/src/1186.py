class Solution:
    def maximumSum(self, arr: List[int]) -> int:
        noDeletion = [arr[0]]
        for i in range(1, len(arr)):
            noDeletion.append(max(arr[i], arr[i] + noDeletion[i-1]))
        
        oneDeletion = [arr[0]]
        for i in range(1, len(arr)):
            oneDeletion.append(max(noDeletion[i], noDeletion[i-1], arr[i] + oneDeletion[i-1]))
        
        return max(oneDeletion)
