import { Grid, Typography, Button, Card, CardMedia } from "@mui/material";
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
        <Typography variant="h2" mt={2} mb={2}>
          Hamster Wars
        </Typography>
      </Grid>

      {hamster && (
        <Grid item xs={12} sm={8} md={6} lg={5} xl={3} key={hamster[0].id}>
          <Grid item xs={12}>
            <Typography variant="h4" m={2}>
              {hamster[0].name} is the leader
            </Typography>
          </Grid>
          <div className="cutest">
            <Card>
              <CardMedia
                component="img"
                height={400}
                src={
                  hamster[0].newImg
                    ? hamster[0].newImg
                    : `https://tigerlotuz-hamsterwars.herokuapp.com/img/${hamster[0].imgName}`
                }
                alt={hamster[0].name}
                loading="lazy"
                sx={{
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
              />
            </Card>
          </div>
          <Grid item xs={12} mt={2} mb={2}>
            <Typography variant="h6">
              The war of the cutest hamster has just begun..
            </Typography>
            <Typography variant="h6">
              Go to fightpage to vote for your favorite hamster
            </Typography>
          </Grid>
          <Grid item xs={12} m={4}>
            <Button onClick={() => history.push("/fight")} variant="contained">
              Bring me to war
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
export default Start;
