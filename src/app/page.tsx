import { Box, Card, Grid, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { getAllUsers } from "./lib/firebase/utils/getAllUsers";
import { authOptions } from "./lib/auth/nextAuthClient";
import AddForm, { SessionWithId } from "./components/todos/AddForm";
import { getAllCars } from "./lib/firebase/utils/getAllCars";
import CarSearchForm from "./components/carSearch/CarSearchForm";
import { CarData } from "./components/carSearch/SearchResult";
import HeaderLoginButton from "./components/layouts/general/subcomponents/HeaderLoginButton";

export default async function Home() {
  const allUsers = await getAllUsers();
  const session = await getServerSession(authOptions);
  const isUserLoggedIn = session?.user?.name ?? false;
  const currentUserId = (session as SessionWithId)?.user?.id ?? null;
  let cars: CarData[] | null = null;
  if (currentUserId) {
    const carsRemote = await getAllCars();
    cars = carsRemote as CarData[];
  }
  return (
    <Box component="main">
      <Grid
        container
        spacing={4}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
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
        {currentUserId ? (
          <>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="h1"
                sx={{ textAlign: "center", px: 2 }}
              >
                ✅ Add a phone number for one of your cars!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AddForm userId={currentUserId} />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <Card sx={{ py: 2, backgroundColor: "rgba(233, 233, 233, 0.5)" }}>
                <Typography
                  variant="h6"
                  component="h1"
                  sx={{ textAlign: "center", px: 2, py: 1 }}
                >
                  ✅ Also, you can add your own phone number for one of your
                  cars if you sign in!
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <HeaderLoginButton />
                </Box>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
