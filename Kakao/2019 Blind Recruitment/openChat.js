function solution(record) {
  var answer = [];

  var records = new Map();

  record.forEach(function(e){
    const [type, uid, name] = e.split(' ');
    if (type == 'Enter' || type == 'Change') {
        records.set(uid, name);
    }
  })

  record.forEach(function(e) {
    const [type, uid] = e.split(' ');
    if (type == 'Enter') answer.push(records.get(uid) + '님이 들어왔습니다.');
    if (type == 'Leave') answer.push(records.get(uid) + '님이 나갔습니다.');
  })

  return answer;
}
