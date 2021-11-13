import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  let history = useHistory();
  const [addMatch] = useAddOneMatchMutation();
  const [updateHamster] = useUpdateOneHamsterMutation();
  const [getOneHamsterById] = useGetOneHamsterByIdMutation();
  const [getOneRandomHamster] = useGetOneRandomHamsterMutation();
  const [fightIsOver, setFightIsOver] = useState<Boolean>(false);
  const [winnerHamster, setWinnerHamster] = useState<Hamster>();
  const [loserHamster, setLoserHamster] = useState<Hamster>();
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
      setWinnerHamster(winnerResult);
      const loserResult = await getOneHamsterById(loser.id).unwrap();
      setLoserHamster(loserResult);

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
    <Grid container justifyContent="center" spacing={2} gap={2}>
      {!fightIsOver ? (
        <Grid item xs={12} m={2}>
          <Typography variant="h2" m={2}>
            Let The War Begin
          </Typography>
        </Grid>
      ) : (
        <Grid item xs={12} m={2}>
          <Typography variant="h2" m={2}>
            The winner is..
          </Typography>
        </Grid>
      )}

      {hamster1 && hamster2 ? (
        <Grid
          container
          justifyContent="center"
          gap={2}
          sx={{ position: "relative" }}
        >
          <Grid item xs={5} sm={5} md={5} lg={4} xl={3}>
            <Card
              className={`${fightIsOver ? "" : "hamster-card"} ${
                fightIsOver && hamster1.id === winnerHamster?.id ? "winner" : ""
              } ${
                fightIsOver && hamster1.id === loserHamster?.id ? "loser" : ""
              }`}
              onClick={
                hamster1 && hamster2
                  ? () => matchOver(hamster1, hamster2)
                  : undefined
              }
            >
              <CardMedia
                component="img"
                height={350}
                src={hamster1.imgName}
                alt={hamster1.name}
                loading="lazy"
                sx={{
                  objectPosition: "cover",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <CardContent sx={{ minHeight: "200px" }}>
                <Typography variant="h6" mb={2}>
                  {hamster1.name} {hamster1.age} år
                </Typography>
                <Grid item textAlign="left">
                  <Typography variant="h6">
                    Intressen: {hamster1.loves}
                  </Typography>
                  <Typography variant="h6">
                    Favoritmat: {hamster1.favFood}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
            {fightIsOver && (
              <Card sx={{ margin: "1em 0", textAlign: "left", padding: "2em" }}>
                <Typography variant="h6">Games: {hamster1.games}</Typography>
                <Typography variant="h6">Wins: {hamster1.wins}</Typography>
                <Typography variant="h6">
                  Defeats: {hamster1.defeats}
                </Typography>
              </Card>
            )}
          </Grid>
          <Grid item xs={5} sm={5} md={4} lg={4} xl={3}>
            <Card
              className={`${fightIsOver ? "" : "hamster-card"} ${
                fightIsOver && hamster2.id === winnerHamster?.id ? "winner" : ""
              } ${
                fightIsOver && hamster2.id === loserHamster?.id ? "loser" : ""
              }`}
              onClick={
                hamster2 && hamster1
                  ? () => matchOver(hamster2, hamster1)
                  : undefined
              }
            >
              <CardMedia
                component="img"
                height={350}
                src={hamster2.imgName}
                alt={hamster2.name}
                loading="lazy"
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <CardContent sx={{ minHeight: "200px" }}>
                <Typography variant="h6" mb={2}>
                  {hamster2.name} {hamster2.age} år
                </Typography>
                <Grid item textAlign="left">
                  <Typography variant="h6">
                    Intressen: {hamster2.loves}
                  </Typography>
                  <Typography variant="h6">
                    Favoritmat: {hamster2.favFood}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
            {fightIsOver && (
              <Card sx={{ margin: "1em 0", textAlign: "left", padding: "2em" }}>
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
        <Grid
          item
          xs={12}
          m={4}
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        >
          <Button
            onClick={() => history.push("/")}
            variant="outlined"
            sx={{ margin: "0.25em 0.25em" }}
          >
            Startsidan
          </Button>
          <Button variant="contained" onClick={() => nextFight()}>
            Rösta igen
          </Button>
        </Grid>
      )}
      {!fightIsOver && (
        <Grid item xs={12} m={1}>
          <Grid
            item
            xs={12}
            m={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" mr={2}>
              {hamster1?.name}
            </Typography>
            <Typography variant="h3">VS</Typography>
            <Typography variant="h5" ml={2}>
              {hamster2?.name}
            </Typography>
          </Grid>
          <Typography variant="h6">
            Klicka på din favorit för att den ska få chansen att bli "Cutest
            Hamster"
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
export default Fight;
