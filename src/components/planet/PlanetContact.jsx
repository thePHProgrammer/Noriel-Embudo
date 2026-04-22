export function PlanetContact() {
  return (
    <svg className="constellation" viewBox="0 0 320 320">
      <circle className="cx-frame" cx="160" cy="160" r="140"/>
      <circle className="cx-frame-inner" cx="160" cy="160" r="100" strokeDasharray="2 4"/>
      <line className="cx-line" x1="160" y1="160" x2="160" y2="65"/>
      <line className="cx-line" x1="160" y1="160" x2="160" y2="255"/>
      <line className="cx-line" x1="160" y1="160" x2="65" y2="160"/>
      <line className="cx-line" x1="160" y1="160" x2="255" y2="160"/>
      <line className="cx-line" x1="160" y1="160" x2="95" y2="95"/>
      <line className="cx-line" x1="160" y1="160" x2="225" y2="225"/>
      <line className="cx-line" x1="160" y1="160" x2="225" y2="95"/>
      <line className="cx-line" x1="160" y1="160" x2="95" y2="225"/>
      <circle className="cx-star" cx="160" cy="65" r="1.8"/>
      <circle className="cx-star" cx="160" cy="255" r="1.8"/>
      <circle className="cx-star" cx="65" cy="160" r="1.8"/>
      <circle className="cx-star" cx="255" cy="160" r="1.8"/>
      <circle className="cx-star" cx="95" cy="95" r="1.4"/>
      <circle className="cx-star" cx="225" cy="225" r="1.4"/>
      <circle className="cx-star" cx="225" cy="95" r="1.4"/>
      <circle className="cx-star" cx="95" cy="225" r="1.4"/>
      <circle cx="160" cy="160" r="20" fill="none" stroke="rgba(245,158,11,0.15)" strokeWidth="0.8"/>
      <circle cx="160" cy="160" r="34" fill="none" stroke="rgba(245,158,11,0.08)" strokeWidth="0.8"/>
      <circle className="cx-star-main" cx="160" cy="160" r="5"/>
      <text className="cx-roman" x="160" y="300" textAnchor="middle">VII</text>
      <text className="cx-label" x="160" y="314" textAnchor="middle">The Beacon</text>
    </svg>
  );
}
