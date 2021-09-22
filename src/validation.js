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

module.exports = { isHamstersObject, containsHamsterKeys };
