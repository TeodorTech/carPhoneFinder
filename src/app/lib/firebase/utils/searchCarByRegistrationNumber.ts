import { cache } from "react";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { fireStoreDatabase } from "..";

export const revalidate = 20; // revalidate at most every 20 seconds

export const searchCarByRegistrationNumber = cache(
  async (carIdNumber: string) => {
    try {
      const carsCollection = collection(fireStoreDatabase, "carRegistrations");
      const q = query(carsCollection, where("carIdNumber", "==", carIdNumber));
      const carSnpashot = await getDocs(q);
      return carSnpashot.docs.map((doc) => doc.data());
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
