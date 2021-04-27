var checkOnesSegment_1 = function(s) {
    for (let i = 1; i < s.length; i++) {
        if (s[i] == 1 && s[i-1] == 0) {
            return false;
        }
    }
    return true;
};

// Using Regex
var checkOnesSegment_2 = function(s) {
    return !(/01/.test(s));
};
