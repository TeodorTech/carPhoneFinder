import { Box, Card, Grid, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { getAllUsers } from "./lib/firebase/utils/getAllUsers";
import { authOptions } from "./lib/auth/nextAuthClient";
import AddForm, { SessionWithId } from "./components/todos/AddForm";
import { getAllCars } from "./lib/firebase/utils/getAllCars";
import CarSearchForm from "./components/carSearch/CarSearchForm";
import { CarData } from "./components/carSearch/SearchResult";

export default async function Home() {
  const allUsers = await getAllUsers();
  const session = await getServerSession(authOptions);
  const isUserLoggedIn = session?.user?.name ?? false;
  const currentUserId = (session as SessionWithId)?.user?.id ?? null;
  console.log(session?.user);
  let cars: CarData[] | null = null;
  if (currentUserId) {
    const carsRemote = await getAllCars();
    cars = carsRemote as CarData[];
  }
  return (
    <Box component="main">
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} alignSelf={"center"}>
          <Card
            elevation={2}
            sx={{
              width: 400,
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              sx={{ textAlign: "center", my: 2 }}
            >
              Welcome to CarPhoneFinder!
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            elevation={2}
            sx={{
              width: 400,
            }}
          >
            <CarSearchForm />
          </Card>
        </Grid>
        {currentUserId && (
          <Grid item xs={12}>
            <AddForm userId={currentUserId} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
