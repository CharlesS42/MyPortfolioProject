import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "../src/router";
import "./App.css";
import { UserProvider } from "./context/UserContext";

function App(): JSX.Element {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
