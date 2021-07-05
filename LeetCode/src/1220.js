var countVowelPermutation = function(n) {
    const charSet = ['a', 'e', 'i', 'o', 'u'];
    const module = 1000000007;
  
    let dp = new Map();
    for (let i = 0; i < charSet.length; i++) { dp.set(charSet[i], 1); }
    
    let k = 1;
    while (k < n) {
        const curStep = new Map();
        for (let i = 0; i < charSet.length; i++) { 
            switch (charSet[i]) {
                case 'a':
                    curStep.set('a', (dp.get('e') + dp.get('u') + dp.get('i')) % module);
                    break;
                case 'e':
                    curStep.set('e', (dp.get('a') + dp.get('i')) % module);
                    break;
                case 'i':
                    curStep.set('i', (dp.get('e') + dp.get('o')) % module);
                    break;
                case 'o':
                    curStep.set('o', (dp.get('i')) % module);
                    break;
                case 'u':
                    curStep.set('u', (dp.get('i') + dp.get('o')) % module);
                    break;
            }
        }
        dp = curStep;
        k += 1;
    }
    
    let ans = 0;
    for (let val of dp.values()) { ans += val; ans %= module; }
    return ans;
};
