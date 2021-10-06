N = list(map(int, list(input().rstrip())))

min_val = float('inf')
max_val = float('-inf')

answer = [float('inf'), float('-inf')]
def findMinMax(arr, count, result):
    for val in arr:
        count += (val % 2)        

    if len(arr) == 1:
        result[0] = min(result[0], count)
        result[1] = max(result[1], count)
        return

    if len(arr) == 2:
        new_num = arr[0] + arr[1]
        findMinMax(list(map(int, list(str(new_num)))), count, result)
        return
    
    for i in range(len(arr)-2):
        num_1 = int(''.join(map(str, arr[:i+1])))
        for j in range(i+1, len(arr)-1):
            num_2 = int(''.join(map(str, arr[i+1:j+1])))
            num_3 = int(''.join(map(str, arr[j+1:])))
            new_num = num_1 + num_2 + num_3
            findMinMax(list(map(int, list(str(new_num)))), count, result)

findMinMax(N, 0, answer)
print(f'{answer[0]} {answer[1]}')
