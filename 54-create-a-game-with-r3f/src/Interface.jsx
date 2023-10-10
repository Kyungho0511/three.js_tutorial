import { useKeyboardControls } from "@react-three/drei";

export default function Interface() {
  const { forward, backward, left, right, jump } = useKeyboardControls(
    (state) => state
  );

  return (
    <div className="interface">
      {/* Time */}
      <div className="time">0.00</div>

      {/* Restart */}
      <div className="restart">Restart</div>

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward && "active"}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${left && "active"}`}></div>
          <div className={`key ${backward && "active"}`}></div>
          <div className={`key ${right && "active"}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump && "active"}`}></div>
        </div>
      </div>
    </div>
  );
}
