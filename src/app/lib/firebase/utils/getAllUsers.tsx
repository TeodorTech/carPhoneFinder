import { cache } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { fireStoreDatabase } from "..";

export const revalidate = 20; // revalidate at most every 20 seconds

export const getAllUsers = cache(async () => {
  try {
    const usersCollection = collection(fireStoreDatabase, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => doc.data());
    return users;
  } catch (error: any) {
    throw new Error(error.message);
  }
});
