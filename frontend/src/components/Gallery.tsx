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

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1>The Hamsters</h1>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => history.push("/addhamster")} variant="contained">
          Add New Hamster
        </Button>
      </Grid>

      {data.map((hamster) => (
        <Grid item xs={12} sm={6} md={3} key={hamster.id}>
          <Card>
            <CardMedia
              component="img"
              height={260}
              src={`https://tigerlotuz-hamsterwars.herokuapp.com/img/${hamster.imgName}`}
              alt={hamster.name}
              loading="lazy"
            />
            <CardContent>
              <Typography variant="subtitle1">{hamster.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Gallery;
