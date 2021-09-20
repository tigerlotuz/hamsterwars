function isHamstersObject(maybeHamster) {
  if (typeof maybeHamster !== "object") {
    return false;
  }

  let keys = Object.keys(maybeHamster);

  if (
    !keys.includes("name") ||
    !keys.includes("age") ||
    !keys.includes("imgName") ||
    !keys.includes("favFood") ||
    !keys.includes("loves") ||
    !keys.includes("games") ||
    !keys.includes("wins") ||
    !keys.includes("defeats")
  ) {
    return false;
  }

  return true;
}

module.exports = { isHamstersObject };
