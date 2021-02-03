import { css } from "@emotion/css";
import { useContext } from "react";
import { helpers } from "../utils";
import GameContext from "./Game/Game.context";
import { IconButton } from "./MgButton";
import Text from "./Text";

const rootCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  height: 60px;
  letter-spacing: -1px;
`;

const movesCss = css`
  font-size: 1.8em;
`;

const timerCss = css`
  font-size: 3.2em;
`;

function Moves() {
  const { moves } = useContext(GameContext).state;
  return (
    <div>
      <Text className={movesCss}>MOVES: {moves}</Text>
    </div>
  );
}

function Timer() {
  const { elapsedTime } = useContext(GameContext).state;
  return <Text className={timerCss}>{helpers.formatTime(elapsedTime)}</Text>;
}

function Pause() {
  const { pauseGame } = useContext(GameContext);
  return (
    <IconButton onClick={pauseGame} className={movesCss}>
      ⏸️
    </IconButton>
  );
}

export default function ScoreBar() {
  return (
    <div className={rootCss}>
      <Moves />
      <Timer />
      <Pause />
    </div>
  );
}
