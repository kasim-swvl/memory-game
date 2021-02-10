import { css } from "@emotion/css";
import Card from "../Card";
import Grid from "../Grid";
import useCardBoard from "./useCardBoard";
import useKeyboard from "../../utils/useKeyboard";

const rootCss = css`
  position: relative;
  margin-top: 32px;
`;

const gridCss = css``;

export default function CardBoard() {
  const { cards, showCard } = useCardBoard();
  const { refs, handleKeyUp } = useKeyboard(cards.length, 4);

  return (
    <div tabIndex="0" className={rootCss} onKeyUp={handleKeyUp}>
      <Grid columns={4} className={gridCss} height="650px" width="100%">
        {cards.map((c, idx) => {
          return (
            <Card
              {...c}
              ref={refs.current[idx]}
              index={idx}
              key={`card${idx}`}
              onClick={e => {
                e.preventDefault();
                showCard(idx);
              }}
            />
          );
        })}
      </Grid>
    </div>
  );
}
