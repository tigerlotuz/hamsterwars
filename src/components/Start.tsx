import {
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useGetCutestHamsterQuery } from "../features/hamsterApi";
import { useHistory } from "react-router-dom";

const Start = () => {
  const { data: hamster, isFetching } = useGetCutestHamsterQuery();
  let history = useHistory();

  if (isFetching)
    return (
      <Grid item xs={12} m={2}>
        <Typography variant="h5">Loading..</Typography>
      </Grid>
    );

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} m={2}>
        <Typography variant="h2" m={2}>
          Hamster Wars
        </Typography>
        <Typography variant="h6" m={2}>
          The war over who is the cutest hamster has just begun, vote for your
          favorite!{" "}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => history.push("/vote")} variant="contained">
          VOTE
        </Button>
      </Grid>

      {hamster && (
        <Grid item xs={12} sm={8} md={6} lg={4} xl={3} key={hamster[0].id}>
          <Card>
            <CardMedia
              component="img"
              height={350}
              src={
                hamster[0].newImg
                  ? hamster[0].newImg
                  : `https://tigerlotuz-hamsterwars.herokuapp.com/img/${hamster[0].imgName}`
              }
              alt={hamster[0].name}
              loading="lazy"
            />
            <CardContent>
              <Typography variant="h6">
                {hamster[0].name} is currently the winner
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};
export default Start;
