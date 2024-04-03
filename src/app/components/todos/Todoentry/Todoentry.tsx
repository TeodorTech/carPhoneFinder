import { Card, CardHeader } from "@mui/material";
import { FC } from "react";

export interface TodoData {
  title: string;
  id: string;
  description: string;
  completed: boolean;
  authorId: string;
}

const Todoentry: FC<TodoData> = ({ completed, description, id, title }) => {
  return (
    <Card elevation={2}>
      <CardHeader title={title} subheader={description} />
    </Card>
  );
};

export default Todoentry;
