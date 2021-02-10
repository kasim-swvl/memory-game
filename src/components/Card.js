import { css, cx } from "@emotion/css";
import { forwardRef } from "react";

const cardInnerCss = css`
  position: relative;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

const cardSideCss = css`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const cardFrontCss = css`
  background-color: lemonchiffon;
  color: black;
`;

const cardBackCss = css`
  background-color: white;
  font-size: 2em;
  text-transform: uppercase;
  transform: rotateY(180deg);
`;

const cardCss = css`
  background-color: #e7e7cb;
  border-radius: 8px;
  box-shadow: 0 0px 15px 0px rgba(0, 0, 0, 0.05);
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s linear;
  perspective: 1000px;
  user-select: none;
  outline: none;
  // &:hover,
  &:focus {
    box-shadow: 0 0px 30px 4px rgb(247, 140, 44, 0.5);
  }
`;

const visibleCss = css`
  transform: rotateY(180deg);
`;

const pairedCss = css`
  background-color: #ecf5d5;
  box-shadow: inset 0px 0px 0px 4px #d4ddc0;
`;

const letterCss = css`
  font-size: 4em;
  line-height: 4em;
  text-transform: uppercase;
`;

const wordCss = css`
  font-size: 2em;
  line-height: 2em;
`;

export default forwardRef(function Card(
  { index, value, paired, visible, type, onClick },
  ref
) {
  return (
    <div ref={ref} onClick={onClick} className={cx(cardCss)} tabIndex="1">
      <div className={cx(cardInnerCss, visible && visibleCss)}>
        <div className={cx(cardSideCss, cardFrontCss)}></div>
        <div
          className={cx(
            cardSideCss,
            cardBackCss,
            paired && pairedCss,
            type === "letter" && letterCss,
            type === "word" && wordCss
          )}
        >
          {value}
        </div>
      </div>
    </div>
  );
});
