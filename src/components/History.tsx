import CloseIcon from "@mui/icons-material/Close";
import { Grid, Typography, Card, CardMedia, Button, Box } from "@mui/material";
import {
  useGetAllMatchesQuery,
  useDeleteOneMatchMutation,
} from "../features/matchesApi";
import { useGetAllHamstersQuery } from "../features/hamsterApi";

const History = () => {
  const { data: MatchesData = [], isFetching: isFetchingMatches } =
    useGetAllMatchesQuery();
  const { data: HamsterData = [], isFetching: isFetchingHamsters } =
    useGetAllHamstersQuery();
  const [deleteMatch] = useDeleteOneMatchMutation();
  const { refetch } = useGetAllMatchesQuery();

  const deleteMatchFunc = (id: any) => {
    deleteMatch(id)
      .unwrap()
      .then((res) => {
        console.log(res);
        refetch();
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  if (isFetchingMatches || isFetchingHamsters)
    return (
      <Grid item xs={12} m={2}>
        <Typography variant="h5">Loading..</Typography>
      </Grid>
    );

  const backToTop = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  return (
    <Grid container justifyContent="center" gap={2}>
      <Grid item xs={12} m={2}>
        <Typography variant="h2" m={2}>
          History
        </Typography>
      </Grid>

      {MatchesData ? (
        MatchesData.map((m) => (
          <Card
            key={m.id}
            sx={{
              display: "flex",
              position: "relative",
              boxShadow: 3,
              padding: "1em",
            }}
          >
            <CloseIcon
              className="delete-icon"
              onClick={() => deleteMatchFunc(m.id)}
              color="secondary"
              fontSize="small"
              sx={{
                position: "absolute",
                top: ".5em",
                right: ".5em",
                zIndex: "1",
                backgroundColor: "#333d79ff",
                borderRadius: "15%",
              }}
            ></CloseIcon>

            {HamsterData?.map((h) => {
              if (h.id === m.winnerId) {
                return (
                  <Box key={h.id} sx={{ position: "relative" }}>
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      sx={{
                        position: "absolute",
                        width: "100%",
                        top: "75%",
                        left: "0%",
                        backgroundColor: "rgba(51, 61, 121, 0.6)",
                      }}
                    >
                      Winner: {h.name}
                    </Typography>
                    <CardMedia
                      component="img"
                      sx={{ width: 150, height: 150 }}
                      src={
                        h.newImg
                          ? h.newImg
                          : `https://tigerlotuz-hamsterwars.herokuapp.com/img/${h.imgName}`
                      }
                      alt={h.name}
                    />
                  </Box>
                );
              } else if (h.id === m.loserId) {
                return (
                  <Box key={h.id} sx={{ position: "relative" }}>
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      sx={{
                        position: "absolute",
                        width: "100%",
                        top: "75%",
                        left: "0%",
                        backgroundColor: "rgba(51, 61, 121, 0.6)",
                      }}
                    >
                      Looser: {h.name}
                    </Typography>
                    <CardMedia
                      component="img"
                      sx={{ width: 150, height: 150 }}
                      src={
                        h.newImg
                          ? h.newImg
                          : `https://tigerlotuz-hamsterwars.herokuapp.com/img/${h.imgName}`
                      }
                      alt={h.name}
                    />
                  </Box>
                );
              } else {
                return null;
              }
            })}
          </Card>
        ))
      ) : (
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} m={2}>
            <Typography variant="h5">Kunde inte hitta någon match..</Typography>
          </Grid>
        </Grid>
      )}

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
export default History;
