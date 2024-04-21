export default function PrimaryLinkButton({ text, handleClick }) {
  return text === 'Add another player' ? (
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
