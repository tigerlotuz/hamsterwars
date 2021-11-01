import { Grid, Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useAddOneHamsterMutation } from "../features/hamsterApi";
import { Hamster } from "../types/Hamster";
import TextFieldWrapper from "./TextFieldWrapper";

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
    .required("Du måste ange en ålder"),
  loves: yup.string().required("Du måste ange ett intresse"),
  favFood: yup.string().required("Du måste ange en maträtt"),
  newImg: yup.string().required("Du måste ange en bild-url"),
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

  const addHamsterFunc = (values: initialValues) => {
    const newHamster: Hamster = {
      ...values,
      age: Number(values.age),
    };

    addHamster(newHamster);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1>Add New Hamster</h1>
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

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ margin: "2em 0" }}
                >
                  Add Hamster
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
