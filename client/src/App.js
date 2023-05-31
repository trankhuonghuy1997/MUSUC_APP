import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login, Home } from "./Component";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { AnimatePresence } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCredential) => {
      if (userCredential) {
        userCredential.getIdToken().then((token) => {
          validateUser(token).then((data) => {
            dispatch({ type: "SET_USER", payload: data });
          });
        });
      } else {
        setAuth(false);
        dispatch({ type: "SET_USER", payload: null });
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, [auth, firebaseAuth, dispatch, navigate]);

  return (
    <div className="w-auto bg-primary flex justify-center items-center">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
