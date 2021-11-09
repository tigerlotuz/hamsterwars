import { Grid, Button, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useAddOneHamsterMutation } from "../features/hamsterApi";
import { Hamster } from "../types/Hamster";
import TextFieldWrapper from "./TextFieldWrapper";
import { useHistory } from "react-router-dom";
import { useGetAllHamstersQuery } from "../features/hamsterApi";

interface initialValues {
  name: string;
  age: string;
  imgName: string;
  newImg?: string;
  favFood: string;
  loves: string;
  games: number;
  wins: number;
  defeats: number;
}

const FORM_VALIDATION = yup.object().shape({
  name: yup.string().required("Du måste ange ett namn"),
  age: yup
    .number()
    .typeError("Du måste ange en siffra")
    .positive("Du måste ange ett positivt tal")
    .integer("Du måste ange ett heltal")
    .required("Du måste ange en ålder"),
  loves: yup.string().required("Du måste ange ett intresse"),
  favFood: yup.string().required("Du måste ange en maträtt"),
  newImg: yup
    .string()
    .url("Du måste ange en giltig URL")
    .required("Du måste ange en bild URL"),
});

const INITIAL_FORM_STATE: initialValues = {
  name: "",
  age: "",
  imgName: "",
  newImg: "",
  favFood: "",
  loves: "",
  games: 0,
  wins: 0,
  defeats: 0,
};

const AddHamster = () => {
  const [addHamster] = useAddOneHamsterMutation();
  const { refetch } = useGetAllHamstersQuery();
  let history = useHistory();

  const addHamsterFunc = (values: initialValues) => {
    const newHamster: Hamster = {
      ...values,
      age: Number(values.age),
    };

    addHamster(newHamster)
      .unwrap()
      .then(() => {
        refetch();
        history.push("/gallery");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container justifyContent="center" spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h4" m={2}>
          Add New Hamster
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            addHamsterFunc(values);
          }}
        >
          <Form>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextFieldWrapper name="name" label="Namn" />
              </Grid>
              <Grid item xs={12}>
                <TextFieldWrapper name="age" label="Ålder" />
              </Grid>
              <Grid item xs={12}>
                <TextFieldWrapper name="loves" label="Intressen" />
              </Grid>
              <Grid item xs={12}>
                <TextFieldWrapper name="favFood" label="Favoritmat" />
              </Grid>
              <Grid item xs={12}>
                <TextFieldWrapper name="newImg" label="Bild url" />
              </Grid>

              <Grid item xs={12} m={5}>
                <Button
                  onClick={() => history.push("/gallery")}
                  variant="outlined"
                  sx={{ margin: "0.25em 0.25em" }}
                >
                  CANCEL
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ margin: "0.25em 0.25em" }}
                >
                  ADD HAMSTER
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AddHamster;
