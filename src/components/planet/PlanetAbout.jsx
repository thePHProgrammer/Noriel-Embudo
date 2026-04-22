export function PlanetAbout() {
  return (
    <svg className="constellation" viewBox="0 0 320 320">
      <circle className="cx-frame" cx="160" cy="160" r="140"/>
      <circle className="cx-frame-inner" cx="160" cy="160" r="110" strokeDasharray="2 10"/>
      <polyline className="cx-line" points="90,130 135,90 160,130 200,100 225,145 200,195 140,210 100,180 90,130"/>
      <line className="cx-line" x1="160" y1="130" x2="140" y2="210"/>
      <line className="cx-line" x1="200" y1="100" x2="160" y2="130"/>
      <line className="cx-line" x1="100" y1="180" x2="160" y2="130"/>
      <circle className="cx-star" cx="90" cy="130" r="1.8"/>
      <circle className="cx-star" cx="135" cy="90" r="2.2"/>
      <circle className="cx-star-main" cx="160" cy="130" r="4"/>
      <circle className="cx-star" cx="200" cy="100" r="1.6"/>
      <circle className="cx-star" cx="225" cy="145" r="2.4"/>
      <circle className="cx-star" cx="200" cy="195" r="1.8"/>
      <circle className="cx-star" cx="140" cy="210" r="2.6"/>
      <circle className="cx-star" cx="100" cy="180" r="1.9"/>
      <text className="cx-roman" x="160" y="265" textAnchor="middle">I</text>
      <text className="cx-label" x="160" y="282" textAnchor="middle">The Architect</text>
    </svg>
  );
}
