import { useState, useEffect } from "react";
import { socket } from "./socket";
import styles from "./styles/style.module.css";

function App() {
  const [_, setIsConnected] = useState(socket.connected);
  const [clock, setClock] = useState("");
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onClockEvent(value: { clock: string }) {
      setClock(value.clock);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("clock", onClockEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("clock", onClockEvent);
    };
  }, []);
  return (
    <main className="container" style={{ padding: "1rem 0" }}>
      <h1>Websocket</h1>
      <article>
        <span className={styles.clockText}>{clock}</span>
      </article>
    </main>
  );
}

export default App;
