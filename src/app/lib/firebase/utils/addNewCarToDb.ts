import { addDoc, collection } from "firebase/firestore/lite";
import { fireStoreDatabase } from "..";

async function addCarToFirestore(carRegistration: {
  carIdNumber: string;
  phoneNumber: string;
  createdBy: string;
  createdAt: string;
}) {
  try {
    const docRef = await addDoc(
      collection(fireStoreDatabase, "carRegistrations"),
      carRegistration
    );
    console.log(`Document written with ID: ${docRef.id}`);
  } catch (e: any) {
    console.error("Error adding document: ", e);
  }
}

export default addCarToFirestore;
