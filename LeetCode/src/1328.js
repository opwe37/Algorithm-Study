var breakPalindrome = function(palindrome) {
    const N = palindrome.length;
    
    if (N == 1) return '';
    
    for (let i = 0; i < Math.floor(N/2); i++) {
    	if (palindrome[i] != 'a') {
            return palindrome.slice(0, i) + 'a' + palindrome.slice(i+1);
        }
    }
    
    return palindrome.slice(0, N-1) + 'b'
}
