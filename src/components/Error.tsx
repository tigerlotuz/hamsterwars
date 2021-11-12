import { Grid, Typography } from "@mui/material";

const Error = () => {
  return (
    <Grid container justifyContent="center" gap={2}>
      <Grid item xs={12} mt={22} className="bouncing-404">
        <Typography variant="h2" m={2}>
          404
        </Typography>
      </Grid>
      <Grid item xs={12} m={2}>
        <Typography variant="h2" m={2}>
          Page not found
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Error;
