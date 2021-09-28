var numUniqueEmails = function(emails) {
    const uniqueEmails = new Set();
    emails.forEach(email => {
    	uniqueEmails.add(applyRule(email));
    });
    return uniqueEmails.size;
}

function applyRule(email) {
    const [local, domain] = email.split('@');
    
    let tmpLocal = "";
    
    for (let i = 0; i < local.length; i++) {
    	if (local[i] == '+') { break; }
    	if (local[i] == '.') { continue; }
        tmpLocal += local[i];
    }
    
    return tmpLocal + '@' + domain;
}

// 위 함수와 동일한 기능, 자바스크립트의 내장 함수를 이용한 코드
// function applyRule(mail) {
//     let [local, domain] = mail.split('@');
//     local = local.replaceAll('.', '').split('+')[0];
//     return local + '@' + domain;
// }
