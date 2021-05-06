var longestMountain = function(arr) {
    let answer = 0;
    let base = 0;
    while (base < arr.length) {
        let i = base;
        if (i < arr.length-1 && arr[i] < arr[i+1]) {
            while (i < arr.length-1 && arr[i] < arr[i+1]) i += 1;

            if (i < arr.length-1 && arr[i] > arr[i+1]) {
                while (i < arr.length-1 && arr[i] > arr[i+1]) i += 1;
                answer = Math.max(answer, i - base + 1);
            }
        }
        base = Math.max(i, base+1);
    }
    return answer;
};

// 아무것도 참고하지 않은채 작성한 코드
var longestMountain_original = function(arr) {
    if (arr.length < 3) return 0;
    
    let max_len = 0;
    
    let len = 0,
        isClimb = false,
        isTop = false;
    for (let i = 0; i < arr.length-1; i++) {
        if (!isTop) {
            // 산 정상 찾기
            if (arr[i] < arr[i+1]) {
                isClimb = true;
                len += 1;
            }
            
            if (isClimb && arr[i] > arr[i+1]) {
                isTop = true;
                isClimb = false;
                len += 1;
                max_len = Math.max(max_len, len + 1);
            }
        } else {
            if (arr[i] > arr[i+1]) {
                len += 1;
                max_len = Math.max(max_len, len + 1);
            }
            
            if (arr[i] < arr[i+1]) {
                isClimb = true;
                isTop = false;
                len = 1;
            }
        }
        
        if (arr[i] == arr[i+1]) {
            isClimb = false;
            isTop = false;
            len = 0;
        }
    }
    
    return max_len;
};
