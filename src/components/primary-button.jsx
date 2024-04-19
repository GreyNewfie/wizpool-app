export default function PrimaryButton({ text }) {
  return text === 'Add another player' ? (
    <button className="primary-button">
      <span className="plus-symbol">&#43;</span>
      <span>{text}</span>
    </button>
  ) : (
    <button className="primary-button">{text}</button>
  );
}
