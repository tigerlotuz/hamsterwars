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
    <Grid container gap={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" m={2}>
          {data ? `${data.name}` : "Hamster Info"}
        </Typography>
      </Grid>

      {data ? (
        <Grid container justifyContent="center" key={data.id}>
          <Card sx={{ textAlign: "left" }}>
            <Grid container>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardContent>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      namn: {data.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      ålder: {data.age}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      intressen: {data.loves}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      favoritmat: {data.favFood}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      games: {data.games}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      wins: {data.wins}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      defeats: {data.defeats}
                    </Typography>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
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
              sx={{ margin: "2em 0" }}
            >
              GO BACK
            </Button>
          </Grid>
        </Grid>
      ) : (
        <div> Kunde inte hitta hamstern med id: {id}.</div>
      )}
    </Grid>
  );
};
export default HamsterInfo;
