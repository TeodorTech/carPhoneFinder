import { addDoc, collection } from "firebase/firestore/lite";
import { fireStoreDatabase } from "..";

async function addTodoToFirestore(todo: {
  title: string;
  userId: string;
  description: string;
  completed: boolean;
}) {
  try {
    const docRef = await addDoc(collection(fireStoreDatabase, "todos"), todo);
    console.log(`Document written with ID: ${docRef.id}`);
  } catch (e: any) {
    console.error("Error adding document: ", e);
  }
}

export default addTodoToFirestore;
