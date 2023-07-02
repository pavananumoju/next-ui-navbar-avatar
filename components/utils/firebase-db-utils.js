import { db } from "@/firebase/firebase";
import { doc, getDoc, getDocs, setDoc, collection } from "firebase/firestore";

export const getDataFromAPI = (squadId) => {
  const URL = `https://cricbuzz-cricket.p.rapidapi.com/series/v1/5945/squads/${squadId}`;

  // const URL = `https://cricbuzz-cricket.p.rapidapi.com/series/v1/5945`;

  fetch(URL, {
    headers: {
      "X-RapidAPI-Key": "e3a774ef7cmshbdc22cb0186c6b8p16fdbbjsn6a99a1ad3518",
      "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const docRef = getDocRef("Squads", `${squadId}`);
      // const docRef = getDocRef("Fixtures", '2023');
      setDocToDB(docRef, data);
    });
};

export async function getDocFromDB(path, pathSegment) {
  // console.log('getDocFromDB:'+path, pathSegment)
  const ref = getDocRef(path, pathSegment);
  const docSnap = await getDoc(ref);
  // return docSnap.data().player;
  return docSnap;
}

// export async function getDocFromDB(path, pathSegment) {
//   // const ref = getDocRef(path, pathSegment);
//   return await getDoc(ref);
// }

export function setDocToDB(docRef, data) {
  setDoc(docRef, data);
}

export async function getDocsFromDB(path) {
  return await getDocs(collection(db, path));
}

export function getDocRef(path, pathSegment) {
  return doc(db, path, pathSegment);
}