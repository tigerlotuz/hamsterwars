import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useGetAllHamstersQuery } from "../features/hamsterApi";
import { Link, useHistory } from "react-router-dom";

const Gallery = () => {
  const { data = [], isFetching } = useGetAllHamstersQuery();
  let history = useHistory();

  if (isFetching) return <h2>Loading...</h2>;

  const backToTop = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" m={2}>
          The Hamsters
        </Typography>
      </Grid>

      {data.map((hamster) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={hamster.id}>
          <Link to={"/gallery/" + hamster.id}>
            <Card className="hamster-card">
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
          </Link>
        </Grid>
      ))}

      <Grid container justifyContent="center">
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
          <Button
            onClick={() => history.push("/addhamster")}
            variant="contained"
          >
            Add Hamster
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Gallery;
