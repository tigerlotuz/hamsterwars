import { Grid, Typography, Button, Card, CardMedia } from "@mui/material";
import { useGetCutestHamsterQuery } from "../features/hamsterApi";
import { useHistory } from "react-router-dom";

const Start = () => {
  const { data: hamster, isFetching } = useGetCutestHamsterQuery();
  let history = useHistory();

  if (isFetching)
    return (
      <Grid item xs={12} m={2}>
        <Typography variant="h5">Loading..</Typography>
      </Grid>
    );

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} m={2}>
        <Typography variant="h2" mt={2} mb={2}>
          Hamster Wars
        </Typography>
      </Grid>

      {hamster && (
        <Grid item xs={12} sm={8} md={6} lg={5} xl={3} key={hamster[0].id}>
          <div className="cutest">
            <Card>
              <CardMedia
                component="img"
                height={400}
                src={hamster[0].imgName}
                // src={
                //   hamster[0].newImg
                //     ? hamster[0].newImg
                //     : `/img/${hamster[0].imgName}`
                // }
                alt={hamster[0].name}
                loading="lazy"
                sx={{
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
              />
            </Card>
          </div>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" m={2}>
              "Cutest Hamster" just nu:
            </Typography>
            <Typography variant="h4" m={2}>
              {hamster[0].name}
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2} mb={2}>
            <Typography variant="h6">
              Tävlingen om vem som blir "Cutest Hamster" har startat..
            </Typography>
            <Typography variant="h6">
              Gå till tävlingssidan för att rösta på din favorithamster!
            </Typography>
          </Grid>
          <Grid container justifyContent="center">
            <Grid
              item
              xs={12}
              m={2}
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            >
              <Button
                onClick={() => history.push("/compete")}
                variant="contained"
                sx={{ margin: "0.5em 0.5em" }}
              >
                Tävla
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
export default Start;
