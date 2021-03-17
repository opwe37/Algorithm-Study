var addNegabinary = function(arr1, arr2) {
    let carry = 0;
    
    if (arr1.length > arr2.length) {
        [arr1, arr2] = [arr2, arr1];
    }
    
    const result = [];
    while (arr2.length || carry) {
        const arr1_element = arr1.length == 0 ? 0 : arr1.pop();
        const arr2_element = arr2.length == 0 ? 0 : arr2.pop();
        
        const sum = arr1_element + arr2_element + carry;
        switch (sum) {
            case -1:
                result.push(1);
                carry = 1;
                break;
            case 0:
                result.push(0);
                carry = 0;
                break;
            case 1:
                result.push(1);
                carry = 0;
                break;
            case 2:
                result.push(0);
                carry = -1;
                break;
            case 3:
                result.push(1);
                carry = -1;
                break;
        }
    }
    
    while (result[result.length -1] == 0 && result.length > 1) result.pop();
    
    return result.reverse();
};
