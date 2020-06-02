function solution(record) {
  var answer = [];

  var records = new Map();
  for (let i = 0; i < record.length; i++) {
    let tmp = record[i].split(' ');
    if (tmp[0] == 'Enter' || tmp[0] == 'Change') {
        records.set(tmp[1], tmp[2]);
    }
  }

  for (let i = 0; i < record.length; i++) {
    let tmp = record[i].split(' ');
    if (tmp[0] == 'Enter') {
      answer.push(records.get(tmp[1]) + '님이 들어왔습니다.');
    } else if (tmp[0] == 'Leave') {
      answer.push(records.get(tmp[1]) + '님이 나갔습니다.');
    }
  }

  return answer;
}
