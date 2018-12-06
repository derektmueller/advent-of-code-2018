const input = [
[242, 164],
[275, 358],
[244, 318],
[301, 335],
[310, 234],
[159, 270],
[82, 142],
[229, 286],
[339, 256],
[305, 358],
[224, 339],
[266, 253],
[67, 53],
[100, 143],
[64, 294],
[336, 303],
[261, 267],
[202, 86],
[273, 43],
[115, 256],
[78, 356],
[91, 234],
[114, 146],
[114, 260],
[353, 346],
[336, 283],
[312, 341],
[234, 119],
[281, 232],
[65, 203],
[95, 85],
[328, 72],
[285, 279],
[61, 123],
[225, 179],
[97, 140],
[329, 305],
[236, 337],
[277, 110],
[321, 335],
[261, 258],
[304, 190],
[41, 95],
[348, 53],
[226, 298],
[263, 187],
[106, 338],
[166, 169],
[310, 295],
[236, 191]

//[1, 1],
//[1, 6],
//[8, 3],
//[3, 4],
//[5, 5],
//[8, 9]
];

function dist(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

const maxX = Math.max.apply(null, input.map(p => p[0]));
const maxY = Math.max.apply(null, input.map(p => p[1]));

let matrix = [...(new Array(maxY))].map(_ => { 
  return (new Array(maxX)).fill('.');
});

let counts = (new Array(input.length)).fill(0);

var x2, y2, d, closest, min;
for(var x1 = 0; x1 <= maxX; x1++) {
  for(var y1 = 0; y1 <= maxY; y1++) {
    closest = null;
    min = Infinity;
    for(var j = 0; j < input.length; j++) {
      [x2, y2] = input[j];
      d = dist(x1, y1, x2, y2);
      if(d === min) {
        closest = null;
      } else if (d < min) {
        closest = j;
        min = d;
      }
    }
    if(closest) {
      matrix[x1][y1] = closest;
      counts[closest]++;
    }
  }
}

var x1 = maxX + 1;
for(var y1 = -1; y1 <= maxY + 1; y1++) {
  closest = null;
  min = Infinity;
  for(var j = 0; j < input.length; j++) {
    [x2, y2] = input[j];
    d = dist(x1, y1, x2, y2);
    if(d === min) {
      closest = null;
    } else if (d < min) {
      closest = j;
      min = d;
    }
  }
  if(closest) {
    counts[closest] = 0;
  }
}

var x1 = -1;
for(var y1 = -1; y1 <= maxY + 1; y1++) {
  closest = null;
  min = Infinity;
  for(var j = 0; j < input.length; j++) {
    [x2, y2] = input[j];
    d = dist(x1, y1, x2, y2);
    if(d === min) {
      closest = null;
    } else if (d < min) {
      closest = j;
      min = d;
    }
  }
  if(closest) {
    counts[closest] = 0;
  }
}

var y1 = maxY + 1;
for(var x1 = -1; x1 <= maxX + 1; x1++) {
  closest = null;
  min = Infinity;
  for(var j = 0; j < input.length; j++) {
    [x2, y2] = input[j];
    d = dist(x1, y1, x2, y2);
    if(d === min) {
      closest = null;
    } else if (d < min) {
      closest = j;
      min = d;
    }
  }
  if(closest) {
    counts[closest] = 0;
  }
}

var y1 = -1;
for(var x1 = -1; x1 <= maxX + 1; x1++) {
  closest = null;
  min = Infinity;
  for(var j = 0; j < input.length; j++) {
    [x2, y2] = input[j];
    d = dist(x1, y1, x2, y2);
    if(d === min) {
      closest = null;
    } else if (d < min) {
      closest = j;
      min = d;
    }
  }
  if(closest) {
    counts[closest] = 0;
  }
}

console.log(counts);

console.log(counts.reduce((acc, x, i) => {
  if(x > acc[0]) {
    return [x, i];
  } else {
    return acc;
  }
}, [-Infinity, null]));


var x2, y2, d, closest, min, totalD;
var regionSize = 0;
var extra = 0;
var maxDist = 10000;
for(var x1 = -extra; x1 <= maxX + extra; x1++) {
  for(var y1 = -extra; y1 <= maxY + extra; y1++) {
    totalD = 0;
    for(var j = 0; j < input.length; j++) {
      [x2, y2] = input[j];
      totalD += dist(x1, y1, x2, y2);
      if(totalD >= maxDist) {
        break;
      }
    }
    if(totalD < maxDist) {
      regionSize++;
    }
  }
}

console.log(regionSize);
