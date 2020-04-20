function solution(key, lock) {
    var answer = false;

    var paddingMap = addZeroPadding(lock, key.length);

    var rotatedkey = key.slice()
    for (var i = 0; i < 4; i++) {
        rotatedkey = rotation(rotatedkey);
        if (matchKeyAndLock(rotatedkey, paddingMap)) {
            return true;
        }
    }

    return answer;
}

function matchKeyAndLock(key, lock) {
    var result = false;

    var pivotX = 0, pivotY = 0;
    var size = lock.length - (2 * (key.length - 1));
    while(true) {
        if (pivotY == (lock.length-key.length) && pivotX == (lock.length-key.length)) break;
        var tmplock = JSON.parse(JSON.stringify(lock));
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                tmplock[pivotX+i][pivotY+j] = tmplock[pivotX+i][pivotY+j] ^ key[i][j];
            }
        }

        if (isOpen(tmplock, key.length)) {
            result = true;
            break;
        }

        if (pivotY < lock.length-key.length) pivotY++;
        else {
            pivotX++;
            pivotY = 0;
        }
    }

    return result;
}

function rotation(key) {
    var rotatedKey = new Array(key.length).fill(null).map(() => new Array(key.length).fill(0));

    for (var i = 0; i < key.length; i++) {
        for (var j = 0; j < key.length; j++) {
            rotatedKey[i][j] = key[rotatedKey.length-j-1][i];
        }
    }

    return rotatedKey;
}

function addZeroPadding(map, keySize) {
    var paddingSize = 2 * (keySize - 1);
    var newMap = new Array(map.length+paddingSize).fill(null).map(() => Array(map.length+paddingSize).fill(0));

    var pivot = keySize - 1;
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map.length; j++) {
            newMap[pivot + i][pivot + j] = map[i][j];
        }
    }

    return newMap;
}

function isOpen(lock, keySize) {
    var pivot = keySize - 1;
    var size = lock.length - (2 * (keySize - 1));
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (lock[pivot+i][pivot+j] == 0) return false;
        }
    }
    return true;
}
