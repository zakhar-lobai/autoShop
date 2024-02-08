import { collection } from 'firebase/firestore';
import { db } from "./firebase";

// Cars Collection
export const carsCollection = collection(db, "cars");