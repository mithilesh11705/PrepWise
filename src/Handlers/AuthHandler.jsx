import { db } from "@/config/firebaseConfig";
import LoaderPage from "@/Pages/LoaderPage";
import { useAuth, useUser } from "@clerk/clerk-react";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthHanlder = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storeUserData = async () => {
      if (isSignedIn && user) {
        setLoading(true);
        try {
          console.log("Attempting to access user document with ID:", user.id);
          const userRef = doc(db, "users", user.id);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            console.log("User document doesn't exist, creating new one...");
            const userData = {
              id: user.id,
              phoneNo: user.primaryPhoneNumber?.phoneNumber || "N/A",
              name: user.fullName || user.firstName || "Anonymous",
              email: user.primaryEmailAddress?.emailAddress || "N/A",
              imageUrl: user.imageUrl,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            };

            try {
              await setDoc(userRef, userData);
              console.log("Successfully created user document");
            } catch (writeError) {
              console.error("Error writing user document:", writeError);
              throw writeError;
            }
          } else {
            console.log("User document already exists");
          }
        } catch (error) {
          console.error("Error on storing the user data:", error);
          // Add more detailed error information
          if (error.code === "permission-denied") {
            console.error(
              "Firebase permission denied. Please check security rules."
            );
          }
        } finally {
          setLoading(false);
        }
      }
    };

    storeUserData();
  }, [isSignedIn, user, pathname, navigate]);

  if (loading) {
    return <LoaderPage />;
  }

  return null;
};

export default AuthHanlder;
