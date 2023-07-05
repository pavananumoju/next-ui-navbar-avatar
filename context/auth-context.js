import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({ email: null, uid: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log('user login success');
        const user = userCredential.user;
        setUser({
          email: user.email,
          uid: user.uid,
        });
        // ...
      })
      .catch((error) => {
        console.log('error while login');
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    // await signOut(auth);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("signout success");
      })
      .catch((error) => {
        // An error happened.
        console.log("error during signout: " + error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : props.children}
    </AuthContext.Provider>
  );
};
