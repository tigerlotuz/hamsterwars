const router = require("express").Router();
const { getAllHamsters } = require("../functions.js");

// GET WINNERS
router.get("/", async (req, res) => {
  try {
    const array = await getAllHamsters();

    const sortedArray = array.sort((a, b) => {
      return b.wins - a.wins;
    });

    let mostWinsArray = sortedArray.slice(0, 5);

    res.status(200).send(mostWinsArray);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Ooops! Something went wrong with the servers.",
      error,
    });
  }
});

module.exports = router;
