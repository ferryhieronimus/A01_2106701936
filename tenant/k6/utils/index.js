export function randomString(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

// https://help.qresearchsoftware.com/hc/en-us/articles/4417233713935-How-to-Generate-Random-Numbers-Poisson-Distribution
export function generatePoisson(mean) {
  var L = Math.exp(-mean);
  var p = 1.0;
  var k = 0;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

export function generateNPoisson(n, mean) {
  const numbers = [];
  for (let i = 0; i < n; i++) {
    numbers.push(generatePoisson(mean));
  }
  return numbers;
}

export function generateNPoissonWithSpike(n, mean) {
  const numbers = [];

  const middlePosition = Math.floor(n / 2);

  for (let i = 0; i < middlePosition; i++) {
    numbers.push(generatePoisson(mean));
  }

  const spikeValue = Math.round(mean * 100);
  numbers.push(spikeValue);

  const aftershock1 = Math.round(mean * 50);
  numbers.push(aftershock1);

  const aftershock2 = Math.round(mean * 25);
  numbers.push(aftershock2);

  for (let i = middlePosition + 3; i < n; i++) {
    numbers.push(generatePoisson(mean));
  }

  return numbers;
}