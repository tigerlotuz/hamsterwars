import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useGetAllHamstersQuery } from "../features/hamsterApi";
import { useHistory } from "react-router-dom";

const Gallery = () => {
  const { data = [], isFetching } = useGetAllHamstersQuery();
  let history = useHistory();

  if (isFetching) return <h2>Loading...</h2>;

  const backToTop = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h3" m={2}>
          The Hamsters
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => history.push("/addhamster")}
          variant="contained"
          sx={{ margin: "2em 0" }}
        >
          Add New Hamster
        </Button>
      </Grid>

      {data.map((hamster) => (
        <Grid item xs={12} sm={6} md={3} key={hamster.id}>
          <Card>
            {}
            <CardMedia
              component="img"
              height={260}
              src={
                hamster.newImg
                  ? hamster.newImg
                  : `https://tigerlotuz-hamsterwars.herokuapp.com/img/${hamster.imgName}`
              }
              alt={hamster.name}
              loading="lazy"
            />
            <CardContent>
              <Typography variant="subtitle1">{hamster.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Button
          onClick={backToTop}
          variant="contained"
          sx={{ margin: "2em 0" }}
        >
          Back To Top
        </Button>
      </Grid>
    </Grid>
  );
};

export default Gallery;
