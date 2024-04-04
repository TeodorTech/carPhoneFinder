import { Box, Card, CardHeader, Stack, Typography } from "@mui/material";
import { FC } from "react";

export interface CarData {
  carIdNumber: string;
  phoneNumber: string;
  createdBy: string;
  createdAt: string;
}

interface FoundCars {
  cars: CarData[];
}

const SearchResult: FC<FoundCars> = ({ cars }) => {
  if (cars.length === 0) {
    return (
      <Typography variant="body1">
        Ooops! We could not find any phone number
      </Typography>
    );
  }
  const car = cars[0];
  const { carIdNumber, phoneNumber } = car;
  return (
    <Box width={"100%"}>
      <Stack spacing={2} alignItems={"center"}>
        <Typography variant="body1">
          Phone number of the car with Reg.No.:{carIdNumber}
        </Typography>
        <Typography variant="h6">
          📞
          <strong>{phoneNumber}</strong> 📞
        </Typography>
      </Stack>
    </Box>
  );
};

export default SearchResult;
