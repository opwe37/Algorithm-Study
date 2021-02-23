var findMedianSortedArrays = function(nums1, nums2) {
    let m = nums1.length,
        n = nums2.length;
    const left_half_length = (m + n + 1) / 2
    
    // nums1은 항상 작은 길이의 배열
    if (m > n) {
        [nums1, nums2] = [nums2, nums1];
        [m, n] = [n, m];
    }
    
    // a_min : merged arr의 left_half에 포함될 수 있는 nums1의 최소 수
    // a_max : merged arr의 left_half에 포함될 수 있는 nums1의 최대 수
    let a_min = 0,
        a_max = nums1.length;
        
    while (a_min <= a_max) {
    
        // a_count : nums1의 위치를 a_max와 a_min값을 이용하여 특정
        // 일종의 이분 탐색 형식으로 진행
        
        const a_count = a_min + Math.floor((a_max - a_min) / 2),
              b_count = left_half_length - a_count;
        
        if (a_count > 0 && nums1[a_count - 1] > nums2[b_count]) {
            
            // nums1[a_count - 1]이 nums2[b_count]보다 크기 때문에
            // left_half에 nums1은 a_count보다 작은 원소의 개수가 포함되어야 함을 의미
            
            a_max = a_count - 1;
            
        } else if (b_count > 0 && nums2[b_count - 1] > nums1[a_count]) {
            
            // nums2[b_count - 1]이 nums1[a_count]보다 크기 때문에
            // left_half에 nums1은 a_count보다 많은 원소의 개수가 포함되어야 함을 의미
            
            a_min = a_count + 1;
            
        } else {
            
            const left_half_end = (a_count == 0) ?
                  nums2[b_count-1] : (b_count == 0) ?
                  nums1[a_count-1] : Math.max(nums1[a_count-1], nums2[b_count-1]);
            
            if (isOdd(m+n)) {
                return left_half_end;
            }
            
            const right_half_start = (a_count == m) ? 
                  nums2[b_count] : (b_count == n) ? 
                  nums1[a_count] : Math.min(nums1[a_count], nums2[b_count]);
            
            return (left_half_end + right_half_start) / 2
        }
    }
    return -1;
};

var isOdd = (x) => (x & 1) == 1;
