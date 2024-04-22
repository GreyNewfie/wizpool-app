export default function PrimaryActionButton({
  text,
  handleClick,
  addPlusSymbol,
}) {
  return addPlusSymbol ? (
    <button className="primary-button" onClick={handleClick}>
      <span className="plus-symbol">&#43;</span>
      <span>{text}</span>
    </button>
  ) : (
    <button className="primary-button" onClick={handleClick}>
      {text}
    </button>
  );
}
