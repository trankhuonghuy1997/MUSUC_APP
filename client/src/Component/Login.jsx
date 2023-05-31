import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    localStorage.removeItem("auth");
  }, []);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCredential) => {
      if (userCredential) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        firebaseAuth.onAuthStateChanged((userCredential) => {
          if (userCredential) {
            dispatch({ type: "SET_USER", payload: userCredential });
            navigate("/", { replace: false });
          } else {
            dispatch({ type: "SET_USER", payload: null });
            setAuth(false);
            navigate("login");
          }
        });
      }
    });
  };
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center">
        <div className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
          <div
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
