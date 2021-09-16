const express = require("express");
const router = express.Router();

const database = require("../database.js");
const connect = database.connect;
const db = connect();
const HAMSTERS = "hamsters";

// ADD ONE

// GET ALL /hamsters
router.get("/", async (req, res) => {
  let array = await getAllHamsters();
  res.send(array);
});

// GET RANDOM /hamster/random
router.get("/random", async (req, res) => {
  let randomHamster = await getRandomHamster();
  res.send(randomHamster);
});

// GET ONE /hamsters/:id
router.get("/:id", async (req, res) => {
  const maybeHamster = await getOneHamster(req.params.id);
  if (maybeHamster) {
    res.send(maybeHamster);
  } else {
    res.sendStatus(404);
  }
});

// GET CUTEST /hamsters/cutest

// UPDATE ONE

// DELETE one

// functions
async function getAllHamsters() {
  const hamstersRef = db.collection(HAMSTERS);
  const hamstersSnapshot = await hamstersRef.get();

  if (hamstersSnapshot.empty) {
    return [];
  }
  const array = [];

  await hamstersSnapshot.forEach(async (docRef) => {
    const data = await docRef.data();
    data.id = docRef.id;
    array.push(data);
  });
  return array;
}

async function getRandomHamster() {
  const hamstersRef = db.collection(HAMSTERS);
  const hamstersSnapshot = await hamstersRef.get();

  if (hamstersSnapshot.empty) {
    return [];
  }
  const array = [];

  await hamstersSnapshot.forEach(async (docRef) => {
    const data = await docRef.data();
    data.id = docRef.id;
    array.push(data);
  });

  const randomHamster = array[Math.floor(Math.random() * array.length)];

  return randomHamster;
}

async function getOneHamster(id) {
  const docRef = db.collection(HAMSTERS).doc(id);
  const docSnapshot = await docRef.get();
  if (docSnapshot.exists) {
    return await docSnapshot.data();
  } else {
    return null;
  }
}

module.exports = router;
