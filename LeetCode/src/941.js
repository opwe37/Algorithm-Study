var validMountainArray = function(arr) {
    const N = arr.length;
    
    if (arr[0] >= arr[1] || arr.length < 3) { return false; }
    if (arr[0] < arr[1]) {
        let peak = -1;
        
        // 오르막 찾기
        for (let i = 1; i < N; i++) {
            if (arr[i-1] > arr[i]) { peak = i-1; break; }
            if (arr[i-1] == arr[i]) { return false; }
        }
        
        // 정상 위치 체크
        // 정상 위치가 배열의 시작이거나 배열의 끝인 경우 하락 또는 상승 경사가 없는 것이기에
        // 산이 아님
        if (peak == -1 || peak == N-1) {return false;}
        
        // 내리막 찾기
        for (let j = peak+1; j < N; j++) {
            if (arr[j-1] > arr[j]) { continue; }
            if (arr[j-1] <= arr[j]) { return false }
        }
    }
    
    return true;
};
