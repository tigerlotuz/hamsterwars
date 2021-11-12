import { useState, useEffect } from "react";
import {
  useUpdateOneHamsterMutation,
  useGetOneHamsterByIdMutation,
  useGetOneRandomHamsterMutation,
} from "../features/hamsterApi";
import { useAddOneMatchMutation } from "../features/matchesApi";
import { Hamster } from "../types/Hamster";
import { Match } from "../types/Match";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";

const Fight = () => {
  const [addMatch] = useAddOneMatchMutation();
  const [updateHamster] = useUpdateOneHamsterMutation();
  const [getOneHamsterById] = useGetOneHamsterByIdMutation();
  const [getOneRandomHamster] = useGetOneRandomHamsterMutation();
  const [fightIsOver, setFightIsOver] = useState<Boolean>(false);

  const [hamster1, setHamster1] = useState<Hamster>();
  const [hamster2, setHamster2] = useState<Hamster>();

  useEffect(() => {
    const getHamsters = async () => {
      const firstHamster = await getOneRandomHamster().unwrap();
      let secondHamster = await getOneRandomHamster().unwrap();

      while (firstHamster.id === secondHamster.id) {
        secondHamster = await getOneRandomHamster().unwrap();
      }

      setHamster1(firstHamster);
      setHamster2(secondHamster);
    };
    getHamsters();
  }, [getOneRandomHamster]);

  const nextFight = async () => {
    const firstHamster = await getOneRandomHamster().unwrap();
    let secondHamster = await getOneRandomHamster().unwrap();

    while (firstHamster.id === secondHamster.id) {
      secondHamster = await getOneRandomHamster().unwrap();
    }

    setFightIsOver(false);
    setHamster1(firstHamster);
    setHamster2(secondHamster);
  };

  const matchOver = async (winner: Hamster, loser: Hamster) => {
    let match: Match = {
      winnerId: winner.id,
      loserId: loser.id,
    };

    try {
      const matchResult = await addMatch(match).unwrap();
      console.log(matchResult);
    } catch (error) {
      console.log(error);
    }

    try {
      await updateHamster({
        id: winner.id,
        hamster: {
          ...winner,
          games: winner.games + 1,
          wins: winner.wins + 1,
        },
      });

      await updateHamster({
        id: loser.id,
        hamster: {
          ...loser,
          games: loser.games + 1,
          defeats: loser.defeats + 1,
        },
      });

      const winnerResult = await getOneHamsterById(winner.id).unwrap();
      const loserResult = await getOneHamsterById(loser.id).unwrap();

      if (hamster1 && hamster2) {
        if (hamster1.id === winnerResult.id) {
          setHamster1(winnerResult);
          setHamster2(loserResult);
        } else {
          setHamster1(loserResult);
          setHamster2(winnerResult);
        }
        setFightIsOver(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container justifyContent="center" gap={2}>
      {!fightIsOver && (
        <Grid item xs={12} m={2}>
          <Typography variant="h2" m={2}>
            Let The War Begin
          </Typography>
        </Grid>
      )}

      {hamster1 && hamster2 ? (
        <Grid
          container
          justifyContent="space-evenly"
          spacing={2}
          sx={{ position: "relative" }}
        >
          <Typography
            variant="h3"
            sx={{ position: "absolute", top: "50%", left: "50%, " }}
          >
            VS
          </Typography>

          <Grid item xs={6} sm={4}>
            <Card
              className="hamster-card"
              onClick={
                hamster1 && hamster2
                  ? () => matchOver(hamster1, hamster2)
                  : undefined
              }
            >
              <CardMedia
                component="img"
                height={250}
                src={
                  hamster1.newImg
                    ? hamster1.newImg
                    : `https://tigerlotuz-hamsterwars.herokuapp.com/img/${hamster1.imgName}`
                }
                alt={hamster1.name}
                loading="lazy"
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <CardContent>
                <Typography variant="h6">{hamster1.name}</Typography>
              </CardContent>
            </Card>
            {fightIsOver && (
              <Card>
                <Typography variant="h6">Games: {hamster1.games}</Typography>
                <Typography variant="h6">Wins: {hamster1.wins}</Typography>
                <Typography variant="h6">
                  Defeats: {hamster1.defeats}
                </Typography>
              </Card>
            )}
          </Grid>
          <Grid item xs={6} sm={4}>
            <Card
              className="hamster-card"
              onClick={
                hamster2 && hamster1
                  ? () => matchOver(hamster2, hamster1)
                  : undefined
              }
            >
              <CardMedia
                component="img"
                height={250}
                src={
                  hamster2.newImg
                    ? hamster2.newImg
                    : `https://tigerlotuz-hamsterwars.herokuapp.com/img/${hamster2.imgName}`
                }
                alt={hamster2.name}
                loading="lazy"
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <CardContent>
                <Typography variant="h6">{hamster2.name}</Typography>
              </CardContent>
            </Card>
            {fightIsOver && (
              <Card>
                <Typography variant="h6">Games: {hamster2.games}</Typography>
                <Typography variant="h6">Wins: {hamster2.wins}</Typography>
                <Typography variant="h6">
                  Defeats: {hamster2.defeats}
                </Typography>
              </Card>
            )}
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} m={2}>
            <Typography variant="h5">
              Kunde inte hitta någon hamster..
            </Typography>
          </Grid>
        </Grid>
      )}
      {fightIsOver && (
        <Grid item xs={12} m={4}>
          <Button variant="contained" onClick={() => nextFight()}>
            New Game
          </Button>
        </Grid>
      )}
      {!fightIsOver && (
        <Grid item xs={12} m={2}>
          <Typography variant="h5">To vote, click on your favorite</Typography>
        </Grid>
      )}
    </Grid>
  );
};
export default Fight;
