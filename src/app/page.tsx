import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { getAllUsers } from "./lib/firebase/utils/getAllUsers";
import { authOptions } from "./lib/auth/nextAuthClient";
import AddForm, { SessionWithId } from "./components/todos/AddForm";
import Todoentry, { TodoData } from "./components/todos/Todoentry/Todoentry";
import { getTodosByAuthorId } from "./lib/firebase/utils/getTodosByUserId";

export default async function Home() {
  const allUsers = await getAllUsers();
  const session = await getServerSession(authOptions);
  const isUserLoggedIn = session?.user?.name ?? false;
  const currentUserId = (session as SessionWithId)?.user?.id ?? null;

  let todos: TodoData[] | null = null;
  if (currentUserId) {
    const todosRemote = await getTodosByAuthorId(currentUserId);
    todos = todosRemote as TodoData[];
  }
  return (
    <Box component="main">
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ textAlign: "center", my: 2 }}
          >
            {isUserLoggedIn
              ? `Welcome ${session?.user?.name}!`
              : "Welcome Guest!"}
          </Typography>
        </Grid>

        {currentUserId && (
          <Grid item xs={12} md={6} lg={4}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", my: 2 }}
            >
              Your Todos
            </Typography>
            {todos && todos.length > 0 ? (
              <Stack spacing={2}>
                {todos.map((todo) => {
                  return <Todoentry {...todo} key={todo.id} />;
                })}
              </Stack>
            ) : (
              "You have no todos yet"
            )}
          </Grid>
        )}
        {currentUserId && (
          <Grid item xs={12} md={6} lg={4}>
            <AddForm userId={currentUserId} />
          </Grid>
        )}

        <Grid item xs={12} md={6} lg={4}>
          <Card
            elevation={2}
            sx={{
              width: 400,
            }}
          >
            <CardHeader title="Users" />
            <CardContent>
              {allUsers.length > 0 ? (
                <List>
                  {allUsers.map((user) => (
                    <ListItem key={user.id}>
                      <ListItemButton
                        component={Link}
                        href={`/user/${user.id}`}
                      >
                        <ListItemText
                          sx={{
                            color: "common.white",
                            textDecoration: "none",
                          }}
                        >
                          {user.name}
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                "No users found"
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
