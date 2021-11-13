import { Grid, Typography, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const Error = () => {
  let history = useHistory();

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
      <Grid container justifyContent="center" sx={{ margin: "1.5em 0" }}>
        <Grid
          item
          xs={12}
          sx={{ position: "fixed", bottom: 16, left: 0, right: 0 }}
        >
          <Button onClick={() => history.push("/")} variant="contained">
            Startpage
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Error;
