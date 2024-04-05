"use client";
// we use multiple hooks and onClick actions here, this cannot be a server component
import { FC, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Card,
  Checkbox,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  FormControlLabel,
  CardHeader,
  Box,
} from "@mui/material";
import { DefaultSession } from "next-auth";
import { searchCarByRegistrationNumber } from "@/app/lib/firebase/utils/searchCarByRegistrationNumber";
import SearchIcon from "@mui/icons-material/Search";
import cover from "../../assets/porche.png";
import SearchResult, { CarData } from "./SearchResult";

export interface TodoData {
  title: string;
  id: string;
  description: string;
  completed: boolean;
  authorId: string;
}
// the typescript interface for the fields allows the Hook Form plugin to infer types and names of the fields we are using
interface IAddCarSearch {
  carIdNumber: string;
}

// the validation schema is used against the values on any/every change
const schema = yup.object({
  carIdNumber: yup.string().required(),
});

// we are extending the interface of the session object because we have modified the initial values when we added the ID there, in a real application, we would declare this type to be overwritten globally, by extending it, in a .d.ts file
export type SessionWithId = Omit<DefaultSession, "user"> & {
  user: DefaultSession["user"] & { id: string };
};

const CarSearchForm: FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [foundCars, setFoundCars] = useState<CarData[]>([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IAddCarSearch>({
    resolver: yupResolver(schema),
    defaultValues: {
      carIdNumber: "",
    },
  });

  const formHasErrors = !!Object.keys(errors).length;

  const onSubmit: SubmitHandler<IAddCarSearch> = async (data) => {
    setSubmitting(true);
    // in a real application, we would create a reusable wrapper over this fetch call, but it's good to have it layed out in the open here and now
    searchCarByRegistrationNumber(data.carIdNumber)
      .then((res) => {
        setFoundCars(res as CarData[]);
        // we reset the loading state to false, and clear the form
        setSubmitting(false);
        setValue("carIdNumber", "");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        backgroundImage: `url(${cover.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "400px",
      }}
    >
      <Card
        sx={{
          p: 2,
          m: 2,
          borderRadius: 6,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <Stack spacing={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Box>
                <Typography textAlign={"center"} px={2} fontWeight={"bold"}>
                  Find that phone number you are looking for...
                </Typography>
              </Box>
              <Stack direction="row" justifyContent="space-between" px={1}>
                <Controller
                  name="carIdNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      style={{ width: "100%" }}
                      placeholder="Search car registration number..."
                      helperText={errors.carIdNumber?.message ?? null}
                    />
                  )}
                />

                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={submitting || formHasErrors}
                  size="small"
                >
                  {submitting ? <CircularProgress size={20} /> : <SearchIcon />}
                </Button>
              </Stack>
            </Stack>
          </form>
          {foundCars.length > 0 && <SearchResult cars={foundCars} />}
        </Stack>
      </Card>
    </Box>
  );
};

export default CarSearchForm;
