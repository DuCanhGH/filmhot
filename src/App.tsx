import { onAuthStateChanged } from "firebase/auth";
import { FC, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { auth } from "./shared/firebase";
import { useStore } from "./store";

const App: FC = () => {
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const location = useLocation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email ?? "",
          photoURL: user.photoURL ?? "",
          displayName: user.displayName ?? "",
        });
      } else {
        setCurrentUser(null);
      }
    });
  }, [setCurrentUser]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);
  return <Outlet />;
};

export default App;
