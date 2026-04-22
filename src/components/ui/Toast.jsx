export function Toast({ visible, message }) {
  return (
    <div id="toast" className={visible ? 'show' : ''}>
      {message}
    </div>
  );
}
