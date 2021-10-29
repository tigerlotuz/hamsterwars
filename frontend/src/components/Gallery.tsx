import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

const Gallery = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1>The Hamsters</h1>
      </Grid>

      {itemData.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.img}>
          <Card key={item.img}>
            <CardMedia
              component="img"
              height={200}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <CardContent>
              <Typography variant="subtitle1">{item.title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const itemData = [
  {
    img: "https://tigerlotuz-hamsterwars.herokuapp.com/img/hamster-2.jpg",
    title: "Hamster",
  },
  {
    img: "https://tigerlotuz-hamsterwars.herokuapp.com/img/hamster-2.jpg",
    title: "Hamster",
  },
  {
    img: "https://tigerlotuz-hamsterwars.herokuapp.com/img/hamster-2.jpg",
    title: "Hamster",
  },
  {
    img: "https://tigerlotuz-hamsterwars.herokuapp.com/img/hamster-2.jpg",
    title: "Hamster",
  },
  {
    img: "https://tigerlotuz-hamsterwars.herokuapp.com/img/hamster-2.jpg",
    title: "Hamster",
  },
  {
    img: "https://tigerlotuz-hamsterwars.herokuapp.com/img/hamster-2.jpg",
    title: "Hamster",
  },
  {
    img: "https://tigerlotuz-hamsterwars.herokuapp.com/img/hamster-2.jpg",
    title: "Hamster",
  },
  {
    img: "https://tigerlotuz-hamsterwars.herokuapp.com/img/hamster-2.jpg",
    title: "Hamster",
  },
  {
    img: "https://tigerlotuz-hamsterwars.herokuapp.com/img/hamster-2.jpg",
    title: "Hamster",
  },
  {
    img: "https://tigerlotuz-hamsterwars.herokuapp.com/img/hamster-2.jpg",
    title: "Hamster",
  },
  {
    img: "https://tigerlotuz-hamsterwars.herokuapp.com/img/hamster-2.jpg",
    title: "Hamster",
  },
  {
    img: "https://tigerlotuz-hamsterwars.herokuapp.com/img/hamster-2.jpg",
    title: "Hamster",
  },
];

export default Gallery;
