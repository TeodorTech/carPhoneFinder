import { cache } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { fireStoreDatabase } from "..";

export const revalidate = 20; // revalidate at most every 20 seconds

export const getAllCars = cache(async () => {
  try {
    const carsCollection = collection(fireStoreDatabase, "carRegistrations");
    const carsSnapshot = await getDocs(carsCollection);
    const cars = carsSnapshot.docs.map((doc) => doc.data());
    return cars;
  } catch (error: any) {
    throw new Error(error.message);
  }
});
