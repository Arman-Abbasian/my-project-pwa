import { useEffect, useState } from "react";
import "./App.css";
import SW from "./components/SW";
import Home from "../src/pages/Home";

function App() {
  const [networkStatus, setnetworkStatus] = useState(1);
  useEffect(() => {
    //this action run at the mounting of the page
    if (navigator.onLine) setnetworkStatus(1);
    else setnetworkStatus(0);

    //this action run every time
    window.addEventListener("online", () => setnetworkStatus(1));
    window.addEventListener("offline", () => setnetworkStatus(0));
  }, [navigator.onLine]);
  console.log({ networkStatus });
  if (networkStatus === 0) return <p>you are offline......</p>;
  return (
    <div className="App">
      <SW />
      <Home />
    </div>
  );
}

export default App;
