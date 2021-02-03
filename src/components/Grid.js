import { css, cx } from "@emotion/css";

const gridCss = ({ columns, margin, height, width }) => css`
  display: grid;
  grid-template-columns: ${Array.from({ length: columns })
    .map(c => "1fr")
    .join(" ")};
  grid-auto-flow: row;
  grid-column-gap: ${margin}px;
  grid-row-gap: ${margin}px;
  height: ${height};
  width: ${width};
`;

export default function Grid({
  columns = 4,
  margin = 14,
  children,
  className,
  height = 650,
  width = "100%",
}) {
  return (
    <div className={cx(gridCss({ margin, columns, height, width }), className)}>
      {children}
    </div>
  );
}
