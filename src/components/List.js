import { css, cx } from "@emotion/css";

const rootCss = css`
  background-color: white;
  border-radius: 8px;
`;

const selectedCss = css`
  color: #f08ca0;
  &:hover {
    color: #f08ca0;
  }
`;

const listItemCss = css`
  padding: 4px 12px;
  margin-bottom: 2px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.5em;
  color: #444;

  &:hover {
    color: #f5afbd;
  }

  &:last-child {
    margin-bottom: initial;
  }
`;

export default function List({ options, onClick, value }) {
  return (
    <div className={rootCss}>
      {options.map((o, i) => (
        <div
          key={o.value}
          value={o.value}
          className={cx(listItemCss, value === o.value && selectedCss)}
          onClick={e => onClick(e, o, i)}
        >
          {o.label || o.value}
        </div>
      ))}
    </div>
  );
}
