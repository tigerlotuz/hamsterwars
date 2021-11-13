import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  useGetAllHamstersQuery,
  useGetOneHamsterQuery,
  useDeleteOneHamsterMutation,
  useGetOneHamsterByIdMutation,
} from "../features/hamsterApi";
import { useGetDefeatedHamstersMutation } from "../features/matchesApi";

import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { Hamster } from "../types/Hamster";

interface RouteParams {
  id: string;
}

const HamsterInfo = () => {
  let history = useHistory();
  const { id } = useParams<RouteParams>();
  const { data, isFetching } = useGetOneHamsterQuery(id);
  const [deleteHamster] = useDeleteOneHamsterMutation();
  const [getOneHamsterById] = useGetOneHamsterByIdMutation();
  const [getDefeatedHamsters] = useGetDefeatedHamstersMutation();
  const { refetch } = useGetAllHamstersQuery();
  const [hamstersDefeated, setHamstersDefeated] = useState<Hamster[]>([]);

  const deleteHamsterFunc = () => {
    deleteHamster(id)
      .unwrap()
      .then((res) => {
        console.log(res);
        refetch();
        history.push("/gallery");
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  useEffect(() => {
    const getWins = async () => {
      try {
        const wins = await getDefeatedHamsters(id).unwrap();

        let defeatedHamsters: Hamster[] = [];

        console.log("number of defated hamsters " + wins.length);

        if (wins && wins.length > 0) {
          wins.forEach(async (win) => {
            const hamster = await getOneHamsterById(win.loserId).unwrap();
            defeatedHamsters.push(hamster);
            setHamstersDefeated(defeatedHamsters);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    console.log("useEffect");
    getWins();
  }, [getOneHamsterById, getDefeatedHamsters, id]);

  if (isFetching)
    return (
      <Grid item xs={12} m={2}>
        <Typography variant="h5">Loading..</Typography>
      </Grid>
    );

  return (
    <Grid container justifyContent="center" gap={2}>
      <Grid item xs={12} m={2}>
        <Typography variant="h2" m={2}>
          {data ? `${data.name}` : "Hamster Info"}
        </Typography>
      </Grid>

      {data ? (
        <Grid container justifyContent="center" gap={2}>
          <Grid item xs={12} sm={6} key={data.id}>
            <Card>
              <CardMedia
                component="img"
                height={400}
                src={data.imgName}
                alt={data.name}
                loading="lazy"
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card sx={{ textAlign: "left" }}>
              <CardContent>
                <Grid item xs={12}>
                  <Typography variant="h6">Namn: {data.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Ålder: {data.age}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Intressen: {data.loves}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Favoritmat: {data.favFood}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Fighter: {data.games}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Segrar: {data.wins}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Förluster: {data.defeats}
                  </Typography>
                </Grid>
                <Grid item xs={12} mt={3}>
                  <Typography variant="h5">Besegrade Hamstrar</Typography>
                </Grid>
                {hamstersDefeated && hamstersDefeated.length > 0 ? (
                  hamstersDefeated.map((hamster) => (
                    <Grid item xs={12} key={hamster.id}>
                      <Typography variant="h6">{hamster.name}</Typography>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography variant="h6">{id ? id : "Ingen.."}</Typography>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} m={2}>
            <Typography variant="h5">
              Kunde inte hitta hamstern med id: {id}..
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          variant="outlined"
          onClick={deleteHamsterFunc}
          sx={{ margin: "2em 0" }}
        >
          DELETE
        </Button>
        <Button
          variant="contained"
          onClick={() => history.push("/gallery")}
          sx={{ margin: "0.5em 0.5em" }}
        >
          GO BACK
        </Button>
      </Grid>
    </Grid>
  );
};
export default HamsterInfo;
