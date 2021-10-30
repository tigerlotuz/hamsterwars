import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useGetAllHamstersQuery } from "../features/hamsterApi";

const Gallery = () => {
  const { data = [], isFetching } = useGetAllHamstersQuery();

  if (isFetching) return "Loading...";

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1>The Hamsters</h1>
      </Grid>

      {data.map((hamster) => (
        <Grid item xs={12} sm={6} md={3} key={hamster.id}>
          <Card key={hamster.imgName}>
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
