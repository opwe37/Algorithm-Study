function solution(n, m, t, timetable) {
    var answer = '';

    timetable = sortTime(timetable);
    var firstBusTime = 9*60*60*1000;
    answer = rideOnBus(n, m, t, firstBusTime, [], timetable);

    return answer;
}

function sortTime(timetable) {
    var timeArray = new Array();

    for (var i=0; i<timetable.length; i++) {
        var tmp = timetable[i].split(':');
        var timestamp = (tmp[0]*60*60*1000) + (tmp[1]*60*1000)
        timeArray.push(timestamp);
    }

    timeArray.sort(function(a,b){
        return a-b;
    })

    return timeArray;
}

function rideOnBus(n, t, m, time, personInBus, personOutBus) {
    if (n == 0) {
        var ms_result = 0;
        var resultHours;
        var resultMinute;

        if (personInBus.length != 0) {
            var lastPerson = personInBus.reduce(function(prev, current) {
                return (prev[0] > current[0]) ? prev : current
            });

            if (lastPerson[1] < m) {
                ms_result = time-(t*60*1000);
                resultHours = Math.floor(ms_result / (60 * 60 * 1000));
                resultMinute = Math.floor((ms_result % (60 * 60 * 1000)/60000)).toFixed(0);
            } else if (lastPerson[1] == m) {
                ms_result = lastPerson[0] - 1000;
                resultHours = Math.floor(ms_result / (60 * 60 * 1000));
                resultMinute = Math.floor((ms_result % (60*60 * 1000)/60000)).toFixed(0);
            }
        } else if (personInBus.length == 0) {
            ms_result = time-(t*60*1000);
            resultHours = Math.floor(ms_result / (60 * 60 * 1000));
            resultMinute = Math.floor((ms_result % (60 * 60 * 1000)/60000)).toFixed(0);
        }

        if (resultHours < 10) resultHours = "0" + resultHours;
        if (resultMinute < 10) resultMinute = "0" + resultMinute;

        return resultHours + ':' + resultMinute;
    }

    var currentTime = new Array();
    var removeIndex = 0;
    for (var i = 0; i < m; i++) {
        if (personOutBus[i] <= time) {
            currentTime.push([personOutBus[i], i+1]);
            removeIndex++;
        }
    }
    personOutBus.splice(0, removeIndex);
    return rideOnBus(n-1, t, m, time+(t*60*1000), currentTime, personOutBus);
}
