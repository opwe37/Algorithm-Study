var licenseKeyFormatting = function(s, k) {
    s = s.replaceAll('-', '').toUpperCase();
    
    const cntFrist = s.length % k > 0 ? s.length % k : k;
    let answer = [s.slice(0, cntFrist)];
    
    let i = cntFrist;
    while ( i+k <= s.length ) {
        answer.push(s.slice(i, i+k));
        i += k;
    }
    
    return answer.join('-');
};
