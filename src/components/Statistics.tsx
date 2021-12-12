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
      <Grid item xs={12} m={2}>
        <Typography variant="h2" m={2}>
          Statistics
        </Typography>
      </Grid>
      <Grid container justifyContent="center" gap={2}>
        <Grid item xs={12} m={3}>
          <Typography variant="h5">Top 5 Winners</Typography>
        </Grid>

        {WinnersData?.map((winner) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={winner.id}>
            <Card>
              <CardMedia
                component="img"
                height={260}
                src={winner.imgName}
                alt={winner.name}
                loading="lazy"
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <CardContent>
                <Typography variant="h5" mb={2}>
                  {winner.name}
                </Typography>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Segrar: {winner.wins}</Typography>
                  <Typography variant="h6">
                    Förluster: {winner.defeats}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent="center" gap={2}>
        <Grid item xs={12} m={3}>
          <Typography variant="h5">Top 5 Losers</Typography>
        </Grid>

        {LosersData?.map((loser) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={loser.id} mb={6}>
            <Card>
              <CardMedia
                component="img"
                height={260}
                src={loser.imgName}
                alt={loser.name}
                loading="lazy"
                sx={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <CardContent>
                <Typography variant="h5" mb={2}>
                  {loser.name}
                </Typography>
                <Grid
                  item
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Segrar: {loser.wins}</Typography>
                  <Typography variant="h6">
                    Förluster: {loser.defeats}
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          m={2}
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        >
          <Button
            onClick={backToTop}
            variant="contained"
            sx={{ margin: "0.5em 0.5em" }}
          >
            upp
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Statistics;
