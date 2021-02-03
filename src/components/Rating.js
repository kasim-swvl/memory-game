import Text from "./Text";
import { css } from "@emotion/css";

const ratingsCss = css`
  margin-bottom: 8px;
  text-align: center;
  font-size: 4em;
`;

const ratingOffCss = css`
  filter: grayscale(100);
`;

export default function Rating({ rating }) {
  return (
    <Text component="h1" className={ratingsCss}>
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={`rating_${i}`}
          className={css(i > rating - 1 && ratingOffCss)}
        >
          ⭐
        </span>
      ))}
    </Text>
  );
}
