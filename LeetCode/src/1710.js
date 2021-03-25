var maximumUnits = function(boxTypes, truckSize) {
    boxTypes.sort((a, b) => b[1] - a[1]);
    let num_of_box = 0;
    let num_of_unit = 0;
    for (let i = 0; i < boxTypes.length; i++) {
        if (num_of_box + boxTypes[i][0] > truckSize) {
            num_of_unit += (truckSize - num_of_box) * boxTypes[i][1];
            break;
        }
        num_of_box += boxTypes[i][0];
        num_of_unit += boxTypes[i][0] * boxTypes[i][1];
    }
    return num_of_unit;
};
