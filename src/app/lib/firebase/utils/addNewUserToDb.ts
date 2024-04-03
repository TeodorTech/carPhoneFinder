import { User } from "next-auth";
import { fireStoreDatabase } from "..";
import { collection, doc, getDoc, setDoc } from "firebase/firestore/lite";

export const addNewUserToDb = async (user: User) => {
  const loggedinUserId = user.id;
  const usersCollection = collection(fireStoreDatabase, "users");

  // Get a reference to the user's document by their ID
  const userDocRef = doc(usersCollection, loggedinUserId);

  // Fetch the user's document from Firestore
  const userSnapshot = await getDoc(userDocRef);

  // Check if the user's document exists in Firestore
  try {
    if (!userSnapshot.exists()) {
      console.log("No such user! Adding them to Firestore...");

      const processedUser: Record<string, any> = { ...user };
      // firestore does not allow us to add 'undefined' as a value in database, so we will replace with null
      Object.keys(processedUser).forEach((key) => {
        const value = processedUser[key];
        if (!value) {
          processedUser[key] = null;
        }
      });
      // Insert the user into Firestore
      await setDoc(userDocRef, processedUser);
    }
  } catch (err) {
    console.log(err);
  }
};
