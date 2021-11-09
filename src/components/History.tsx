import { Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useGetAllMatchesQuery } from "../features/matchesApi";
import { useGetAllHamstersQuery } from "../features/hamsterApi";

const History = () => {
  const { data: MatchesData = [], isFetching: isFetchingMatches } =
    useGetAllMatchesQuery();
  const { data: HamsterData = [], isFetching: isFetchingHamsters } =
    useGetAllHamstersQuery();

  if (isFetchingMatches || isFetchingHamsters)
    return (
      <Grid item xs={12} m={2}>
        <Typography variant="h5">Loading..</Typography>
      </Grid>
    );

  return (
    <Grid container justifyContent="center" gap={2}>
      <Grid item xs={12} m={2}>
        <Typography variant="h2" m={2}>
          History
        </Typography>
      </Grid>

      {MatchesData ? (
        MatchesData.map((m) => (
          <Grid
            container
            gap={2}
            key={m.id}
            sx={{
              border: " 1px solid black",

              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {HamsterData?.map((h) => {
              if (h.id === m.winnerId) {
                return (
                  <Grid item xs={5} key={h.id + m.winnerId}>
                    <Card className="hamster-card">
                      <CardMedia
                        component="img"
                        height={300}
                        src={
                          h.newImg
                            ? h.newImg
                            : `https://tigerlotuz-hamsterwars.herokuapp.com/img/${h.imgName}`
                        }
                        alt={h.name}
                        loading="lazy"
                        sx={{
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                      <CardContent>
                        <Typography variant="h6">Winner: {h.name}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              } else if (h.id === m.loserId) {
                return (
                  <Grid item xs={5} key={h.id + m.loserId}>
                    <Card className="hamster-card">
                      <CardMedia
                        component="img"
                        height={300}
                        src={
                          h.newImg
                            ? h.newImg
                            : `https://tigerlotuz-hamsterwars.herokuapp.com/img/${h.imgName}`
                        }
                        alt={h.name}
                        loading="lazy"
                        sx={{
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                      <CardContent>
                        <Typography variant="h6">Looser: {h.name}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        ))
      ) : (
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} m={2}>
            <Typography variant="h5">Kunde inte hitta någon match..</Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
export default History;
