const hamsterObject = {
  name: "name",
  age: "age",
  imgName: "imgName",
  favFood: "favFood",
  loves: "loves",
  games: "games",
  wins: "wins",
  defeats: "defeats",
};

function isHamstersObject(object) {
  if (typeof object !== "object") {
    return false;
  }
  for (const key of Object.keys(hamsterObject)) {
    if (key in object) {
      return true;
    } else {
      return false;
    }
  }

  if (containsHamsterKeys(object)) {
    return true;
  }
}

function containsHamsterKeys(object) {
  if (typeof object !== "object") {
    return false;
  }

  for (const key of Object.keys(object)) {
    if (key in hamsterObject) {
      return true;
    } else {
      return false;
    }
  }
}

const matchObject = {
  winnerId: "winnerId",
  loserId: "loserId",
};

function isMatchObject(object) {
  if (typeof object !== "object") {
    return false;
  }
  for (const key of Object.keys(matchObject)) {
    if (key in object) {
      return true;
    } else {
      return false;
    }
  }

  if (containsMatchKeys(object)) {
    return true;
  }
}
module.exports = { isHamstersObject, containsHamsterKeys, isMatchObject };
