import { Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useState, useEffect } from "react";

import {
  useGetFirstRandomHamsterQuery,
  useGetSecondRandomHamsterQuery,
} from "../features/hamsterApi";

import { Hamster } from "../types/Hamster";

const Vote = () => {
  const { data: warrior1, isFetching: isFetching1 } =
    useGetFirstRandomHamsterQuery();
  const {
    data: warrior2,
    isFetching: isFetching2,
    refetch,
  } = useGetSecondRandomHamsterQuery();
  const [warriors, setWarriors] = useState<Hamster[]>([]);

  useEffect(() => {
    if (warrior1 && warrior2) {
      if (warrior1.id !== warrior2.id) {
        setWarriors((state) => [warrior1, warrior2]);
      } else {
        refetch();
      }
    }
  }, [warrior2, warrior1, refetch]);

  if (isFetching1) return <h2>Loading...</h2>;
  if (isFetching2) return <h2>Loading...</h2>;

  return (
    <Grid container justifyContent="center" gap={2}>
      <Grid item xs={12} m={2}>
        <Typography variant="h2" m={2}>
          Let The War Begin
        </Typography>
      </Grid>

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
        {warriors ? (
          warriors.map((w) => (
            <Grid item xs={6} sm={4} key={w.id}>
              <Card className="hamster-card">
                <CardMedia
                  component="img"
                  height={400}
                  src={
                    w.newImg
                      ? w.newImg
                      : `https://tigerlotuz-hamsterwars.herokuapp.com/img/${w.imgName}`
                  }
                  alt={w.name}
                  loading="lazy"
                  sx={{
                    height: "auto",
                    maxWidth: "100%",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{w.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} m={2}>
              <Typography variant="h5">
                Kunde inte hitta någon hamster..
              </Typography>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} m={2}>
          <Typography variant="h5">To vote, click on your favorite</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Vote;
