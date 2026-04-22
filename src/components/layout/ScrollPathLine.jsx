export function ScrollPathLine({ pct, scrollY }) {
  const dotTop = 18 + pct * 0.62;
  return (
    <>
      <div id="path-line" style={{ '--progress': pct + '%' }} />
      <div
        className="path-dot"
        style={{
          opacity: scrollY > 80 ? 1 : 0,
          top: dotTop + 'vh',
        }}
      />
    </>
  );
}
