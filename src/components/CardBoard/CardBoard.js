import Card from "../Card";
import Grid from "../Grid";
import useCardBoard from "./useCardBoard";
import { css } from "@emotion/css";

const rootCss = css`
  position: relative;
  margin-top: 32px;
`;

const gridCss = css``;

export default function CardBoard() {
  const { cards, showCard } = useCardBoard();
  return (
    <div className={rootCss}>
      <Grid columns={4} className={gridCss} height="650px" width="100%">
        {cards.map((c, idx) => {
          return (
            <Card
              {...c}
              index={idx}
              key={`${c.value}_${idx}`}
              onClick={e => {
                console.log(idx);
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
