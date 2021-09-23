const { connect } = require("./database.js");
const db = connect();

const HAMSTERS = "hamsters";
const MATCHES = "matches";

// FUNCTION GET ALL HAMSTERS
async function getAllHamsters() {
  const hamstersRef = db.collection(HAMSTERS);
  const hamstersSnapshot = await hamstersRef.get();

  if (hamstersSnapshot.empty) {
    return [];
  }
  let array = [];

  await hamstersSnapshot.forEach(async (docRef) => {
    let data = await docRef.data();
    data.id = docRef.id;
    array.push(data);
  });
  return array;
}

// FUNCTION GET ALL MATCHES
async function getAllMatches() {
  const matchesRef = db.collection(MATCHES);
  const matchesSnapshot = await matchesRef.get();

  if (matchesSnapshot.empty) {
    return [];
  }
  let array = [];

  await matchesSnapshot.forEach(async (docRef) => {
    let data = await docRef.data();
    data.id = docRef.id;
    array.push(data);
  });
  return array;
}

module.exports = { getAllHamsters, getAllMatches };
