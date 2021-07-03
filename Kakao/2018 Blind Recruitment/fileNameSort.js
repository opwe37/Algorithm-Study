Array.prototype.stableSort = function(cmp) {
    cmp = !!cmp ? cmp : (a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    };
    let stabilizedThis = this.map((el, index) => [el, index]);
    let stableCmp = (a, b) => {
      let order = cmp(a[0], b[0]);
      if (order != 0) return order;
      return a[1] - b[1];
    }
    stabilizedThis.sort(stableCmp);
    for (let i=0; i<this.length; i++) {
      this[i] = stabilizedThis[i][0];
    }
    return this;
  }

  
function solution(files) {
    var answer = [];

    var fileName = [];
    for (var i = 0; i < files.length; i++) {
        var file = splitName(files[i]);
        fileName.push({head: file[0], number: file[1], tail: file[2]});
    }

    fileName.stableSort(function(a, b) {
        var strA = a.head.toUpperCase();
        var strB = b.head.toUpperCase();
        if (strA > strB) return 1;
        else if(strB > strA) return -1;
        return 0;
    });

    fileName.stableSort(function(a, b) {
        var strA = a.head.toUpperCase();
        var strB = b.head.toUpperCase();

        if (strA == strB) {
            return (parseInt(a.number)) - (parseInt(b.number));
        }
        return 0;
    });

    for (var i = 0; i < files.length; i++) {
        answer.push(fileName[i].head + fileName[i].number + fileName[i].tail);
    }

    return answer;
}

function splitName(str) {
    var head_regExp = /[^0-9]+/i;
    var number_regExp = /[0-9]{1,5}/i;

    var head = head_regExp.exec(str);
    var number = number_regExp.exec(str);
    var tail = str.replace(/[^0-9]+[0-9]+/,'');

    return [head[0], number[0], tail];
}
