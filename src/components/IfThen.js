export default function IfThen({ condition, children }) {
  if (!condition) return null;
  return children;
}
