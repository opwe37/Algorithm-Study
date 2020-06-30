function solution(budgets, M) {
    var answer = 0;
    
    var min = 0
      , max = 0;
    
    var sumOfBudget = 0;
    for (let budget of budgets) {
        if (max < budget) max = budget;
        sumOfBudget += budget;
    }
    if (sumOfBudget <= M) return max;
    
    while((min+1) != max) {
        let mid = Math.floor((max+min)/2);
        sumOfBudget = 0;
        for (let budget of budgets) {
            if (budget <= mid) {
                sumOfBudget += budget;
            } else {
                sumOfBudget += mid;
            }
        }
        if (sumOfBudget <= M) {
            min = mid;
        } else {
            max = mid;
        }
    }
    
    return answer = min;
}
