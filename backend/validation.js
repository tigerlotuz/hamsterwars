const hamsterObject = {
  name: "name",
  age: "age",
  imgName: "imgName",
  newImg: "newImg",
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
    } else {
      return false;
    }
  }

  if (containsHamsterKeys(object)) {
    return true;
  }
  return false;
}

function containsHamsterKeys(object) {
  if (typeof object !== "object") {
    return false;
  }

  for (const key of Object.keys(object)) {
    if (key in hamsterObject || key === "id") {
    } else {
      console.log("key not in hamster object", key);
      return false;
    }
  }
  return true;
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
    } else {
      return false;
    }
  }
  return true;
  // if (containsMatchKeys(object)) {
  //   return true;
  // }
}
module.exports = { isHamstersObject, containsHamsterKeys, isMatchObject };
