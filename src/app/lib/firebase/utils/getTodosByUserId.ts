import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { cache } from "react";
import { fireStoreDatabase } from "..";

export const revalidate = 20; // revalidate at most every 20 seconds

export const getTodosByAuthorId = cache(async (authorId: string) => {
  try {
    const todosCollection = collection(fireStoreDatabase, "todos");
    const q = query(todosCollection, where("authorId", "==", authorId));
    const todosSnapshot = await getDocs(q);
    const todos = todosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return todos;
  } catch (error: any) {
    throw new Error(error.message);
  }
});
