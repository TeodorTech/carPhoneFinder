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
} from "@mui/material";
import { DefaultSession } from "next-auth";

// the typescript interface for the fields allows the Hook Form plugin to infer types and names of the fields we are using
interface IAddCarRegistration {
  carIdNumber: string;
  phoneNumber: string;
}

// the validation schema is used against the values on any/every change
const schema = yup.object({
  carIdNumber: yup.string().required(),
  phoneNumber: yup.string().required(),
});

// we are extending the interface of the session object because we have modified the initial values when we added the ID there, in a real application, we would declare this type to be overwritten globally, by extending it, in a .d.ts file
export type SessionWithId = Omit<DefaultSession, "user"> & {
  user: DefaultSession["user"] & { id: string };
};

const AddForm: FC<{ userId: string }> = ({ userId }) => {
  const [submitting, setSubmitting] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IAddCarRegistration>({
    resolver: yupResolver(schema),
    defaultValues: {
      carIdNumber: "",
      phoneNumber: "",
    },
  });

  const formHasErrors = !!Object.keys(errors).length;

  const onSubmit: SubmitHandler<IAddCarRegistration> = async (data) => {
    setSubmitting(true);

    // in a real application, we would create a reusable wrapper over this fetch call, but it's good to have it layed out in the open here and now
    return await fetch(`/todos/${userId}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        // we reset the loading state to false, and clear the form
        setSubmitting(false);
        setValue("carIdNumber", "");
        setValue("phoneNumber", "");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Card elevation={2} sx={{ p: 2, width: "100vw" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant="h5">Register New Car</Typography>
          {/* the Controller wrapper is provided by Hook Form in order to support any UI framework, it exposes the onChange functions and all the rest */}
          <Controller
            name="carIdNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Registration Number"
                helperText={errors.carIdNumber?.message ?? null}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Phone Number"
                helperText={errors.phoneNumber?.message ?? null}
              />
            )}
          />

          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={submitting || formHasErrors}
            endIcon={submitting ? <CircularProgress size={20} /> : null}
          >
            <span>Add</span>
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default AddForm;
