function nthSuperUglyNumber(n, primes) {
  const seq = [1];
  const pos = new Array(primes.length).fill(0);

  while (seq.length < n) {
      let minVal = primes[0] * seq[pos[0]];
      let minList = [0];
      for (let i = 1; i < n; i++) {
        const val = primes[i] * seq[pos[i]];
          if (minVal > val) {
            index = i;
              minVal = val;
              minList = [i];
          } else if (minVal == val) {
              minList.push(i);
          }
      }

      seq.push(minVal);
      minList.forEach(val => pos[val] += 1);
  }
    
  return seq[n-1];
}
