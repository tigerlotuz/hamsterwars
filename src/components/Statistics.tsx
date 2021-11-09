import {
  useGetAllWinnersQuery,
  useGetAllLosersQuery,
} from "../features/matchesApi";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const Statistics = () => {
  const { data: WinnersData, isFetching: fetchingWinners } =
    useGetAllWinnersQuery();
  const { data: LosersData, isFetching: fetchingLosers } =
    useGetAllLosersQuery();

  if (fetchingWinners || fetchingLosers)
    return (
      <Grid item xs={12} m={2}>
        <Typography variant="h5">Loading..</Typography>
      </Grid>
    );

  const backToTop = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  return (
    <Grid container justifyContent="center">
      <Grid container justifyContent="center" gap={2}>
        <Grid item xs={12} m={2}>
          <Typography variant="h4" m={2}>
            Top 5 Winners
          </Typography>
        </Grid>

        {WinnersData?.map((winner) => (
          <Grid item xs={12} sm={3} md={3} lg={2} xl={2} key={winner.id}>
            <Card className="hamster-card">
              <CardMedia
                component="img"
                height={200}
                src={
                  winner.newImg
                    ? winner.newImg
                    : `https://tigerlotuz-hamsterwars.herokuapp.com/img/${winner.imgName}`
                }
                alt={winner.name}
                loading="lazy"
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <CardContent>
                <Typography variant="h5">{winner.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent="center" gap={2}>
        <Grid item xs={12} m={3}>
          <Typography variant="h4" m={2}>
            Top 5 Losers
          </Typography>
        </Grid>

        {LosersData?.map((loser) => (
          <Grid item xs={12} sm={3} md={3} lg={2} xl={2} key={loser.id}>
            <Card className="hamster-card">
              <CardMedia
                component="img"
                height={200}
                src={
                  loser.newImg
                    ? loser.newImg
                    : `https://tigerlotuz-hamsterwars.herokuapp.com/img/${loser.imgName}`
                }
                alt={loser.name}
                loading="lazy"
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <CardContent>
                <Typography variant="h5">{loser.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent="center" sx={{ margin: "1.5em 0" }}>
        <Grid
          item
          xs={12}
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        >
          <Button
            onClick={backToTop}
            variant="contained"
            sx={{ margin: "0.5em 0.5em" }}
          >
            To Top
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Statistics;
