import { useParams, useHistory } from "react-router-dom";
import {
  useGetAllHamstersQuery,
  useGetOneHamsterQuery,
  useDeleteOneHamsterMutation,
} from "../features/hamsterApi";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@mui/material";

interface RouteParams {
  id: string;
}

const HamsterInfo = () => {
  const { id } = useParams<RouteParams>();
  const { data, isFetching } = useGetOneHamsterQuery(id);
  const [deleteHamster] = useDeleteOneHamsterMutation();
  const { refetch } = useGetAllHamstersQuery();
  let history = useHistory();

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

  if (isFetching) return <h2>Loading...</h2>;
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
                src={
                  data.newImg
                    ? data.newImg
                    : `https://tigerlotuz-hamsterwars.herokuapp.com/img/${data.imgName}`
                }
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
