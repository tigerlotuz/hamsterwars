import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import {
  useGetAllMatchesQuery,
  useDeleteOneMatchMutation,
} from "../features/matchesApi";
import { useParams } from "react-router-dom";
import { useGetAllHamstersQuery } from "../features/hamsterApi";

interface RouteParams {
  id: string;
}

const History = () => {
  const { id } = useParams<RouteParams>();
  const { data: MatchesData = [], isFetching: isFetchingMatches } =
    useGetAllMatchesQuery();
  const { data: HamsterData = [], isFetching: isFetchingHamsters } =
    useGetAllHamstersQuery();
  const [deleteMatch] = useDeleteOneMatchMutation();
  const { refetch } = useGetAllMatchesQuery();

  const deleteMatchFunc = () => {
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
          <Grid
            container
            gap={2}
            key={m.id}
            sx={{
              position: "relative",
              border: " 1px solid black",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
              onClick={deleteMatchFunc}
              sx={{ position: "absolute", top: "8px", right: "8px" }}
            >
              <DeleteForeverRoundedIcon />
            </Button>
            {HamsterData?.map((h) => {
              if (h.id === m.winnerId) {
                return (
                  <Grid item xs={5} key={h.id + m.winnerId}>
                    <Card className="hamster-card">
                      <CardMedia
                        component="img"
                        height={200}
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
                        height={200}
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
