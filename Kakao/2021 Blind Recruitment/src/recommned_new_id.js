function solution(new_id) {
    var answer = '';
    
    // 1 ~ 4단계 처리(소문자 변환, 불필요한 문자 제거 등)
    new_id = new_id.toLowerCase()
        .replace(/[^a-z0-9\-\._]/g, '')
        .replace(/\.+/g, '.')
        .replace(/^\.+/,'')
        .replace(/\.+$/, '');
        
    // 5단계 처리
    if (!new_id) new_id = 'a';
    
    // 6단계 처리
    if (new_id.length > 15) {
        new_id = new_id.slice(0, 15)
            .replace(/\.+$/, '');
    }
    
    // 7단계 처리
    while (new_id.length <= 2) {
        new_id += new_id[new_id.length-1];
    }
    
    return answer = new_id;
}
