var strWithout3a3b = function(a, b) {
    let s = ''
    while (a > 0 || b > 0) {
        let write_a = a >= b ? true : false;
        if (s.length >= 2 && s[s.length-1] == s[s.length-2]) {
            if (s[s.length-1] == 'a') { write_a = false }
            else { write_a = true; }
        }
        
        if (write_a) { 
            s += 'a'
            a -= 1;
        } else { 
            s += 'b' 
            b -= 1;
        }
    }
    return s;
};
