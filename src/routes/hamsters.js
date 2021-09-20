const express = require("express");
const router = express.Router();

const { isHamstersObject } = require("../validation.js");

const database = require("../database.js");
const connect = database.connect;
const db = connect();
const HAMSTERS = "hamsters";

// ADD ONE
router.post("/", async (req, res) => {
  let maybeBody = await req.body;
  if (!isHamstersObject(maybeBody)) {
    res.status(400);
    return;
  } else {
    let newHamster = await addOneHamster(maybeBody);
    res.send(newHamster);
  }
});

// GET ALL /hamsters
router.get("/", async (req, res) => {
  let array = await getAllHamsters();
  res.send(array);
});

// GET RANDOM /hamsters/random
router.get("/random", async (req, res) => {
  let randomHamster = await getRandomHamster();
  res.send(randomHamster);
});

// GET ONE /hamsters/:id
router.get("/:id", async (req, res) => {
  let oneHamster = await getOneHamster(req.params.id);
  if (oneHamster) {
    res.send(oneHamster);
  } else {
    res.sendStatus(404);
  }
});

// GET CUTEST /hamsters/cutest

// UPDATE ONE
router.put("/:id", async (req, res) => {
  let hamsterId = await getAllHamsters(req.params.id);
  if (!hamsterId) {
    res.sendStatus(404);
  }

  let maybeBody = req.body;
  if (!isHamstersObject(maybeBody)) {
    res.status(400);
  }

  await updateOneHamster(req.params.id, maybeBody);
  res.sendStatus(200);
});

// DELETE one
router.delete("/:id", async (req, res) => {
  let maybeId = await deleteOneHamster(req.params.id);
  if (!maybeId) {
    res.status(404);
  } else {
    res.sendStatus(200);
  }
});

// functions

// ADD ONE
async function addOneHamster(newHamsterObject) {
  const docRef = await db.collection(HAMSTERS).add(newHamsterObject);
  return { id: docRef.id };
}

// GET ALL
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

// GET ONE
async function getOneHamster(id) {
  const docRef = db.collection(HAMSTERS).doc(id);
  const docSnapshot = await docRef.get();

  if (docSnapshot.exists) {
    return await docSnapshot.data();
  } else {
    return null;
  }
}

// GET RANDOM
async function getRandomHamster() {
  let array = await getAllHamsters();
  let randomHamster = array[Math.floor(Math.random() * array.length)];

  return randomHamster;
}

// GET CUTEST

// UPDATE ONE
async function updateOneHamster(id, object) {
  const docRef = db.collection(HAMSTERS).doc(id);
  const settings = { merge: true };
  docRef.set(object, settings);
}

// DELETE ONE
async function deleteOneHamster(id) {
  const docRef = db.collection(HAMSTERS).doc(id);
  const docSnapshot = await docRef.get();
  if (docSnapshot.exists) {
    await docRef.delete();
    return true;
  } else {
    return false;
  }
}

module.exports = router;
