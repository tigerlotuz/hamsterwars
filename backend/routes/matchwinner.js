const router = require("express").Router();
const { getAllMatches } = require("../functions.js");

// GET ONE MATCHWINNER
router.get("/:id", async (req, res) => {
  try {
    let array = await getAllMatches();

    const hasMinOneWin = await array.some(
      (match) => match.winnerId === req.params.id
    );

    if (hasMinOneWin === true) {
      const winnerArray = array.filter((match) => {
        return match.winnerId === req.params.id;
      });
      res.status(200).send(winnerArray);
    } else {
      res.status(404).send("Hamster not found or hamster have no wins");
    }
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
