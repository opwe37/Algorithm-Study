var GetImportance = function(employees, id) {
    let ans = 0;
    
    const id2index = new Map();
    for (let idx in employees) {
        id2index.set(employees[idx].id, idx);
    }
    
    const q = [id];
    while (q.length) {
        const idx = id2index.get(q.shift());
        const employee = employees[idx];
        
        ans += employee.importance;
        
        if (employee.subordinates.length) {
            for (let subordinateId of employee.subordinates) {
                q.push(subordinateId);
            }
        }
    }
    
    return ans;
};
