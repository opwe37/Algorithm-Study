# Python의 경우, 내부적으로 heapq 통한 이용하여 min-heap 구조를 지원하기 때문에
# 각 단계에서 최소/최대 값을 찾는 과정을 손쉽게 수행할 수 있음

import heapq

class Solution:
    def smallestRange(self, nums: List[List[int]]) -> List[int]:
        global_min = float('-inf')
        global_max = float('inf')
        
        pointer = [0] * len(nums)
        
        min_heap = [(nums[idx][0], idx) for idx in range(0, len(nums))]
        max_heap = [(-nums[idx][0], idx) for idx in range(0, len(nums))]
        heapq.heapify(min_heap)
        heapq.heapify(max_heap)
        
        while True:
            local_min, idx = min_heap[0]
            local_max = -max_heap[0][0]
            
            if (local_max - local_min) < (global_max - global_min):
                global_max, global_min = local_max, local_min
            
            pointer[idx] += 1
            if pointer[idx] >= len(nums[idx]):
                break
            heapq.heappop(min_heap)
            heapq.heappush(min_heap, (nums[idx][pointer[idx]], idx))
            heapq.heappush(max_heap, (-nums[idx][pointer[idx]], idx))
            
        return [global_min, global_max]
