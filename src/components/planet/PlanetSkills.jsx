export function PlanetSkills() {
  return (
    <svg className="constellation" viewBox="0 0 320 320">
      <circle className="cx-frame" cx="160" cy="160" r="140"/>
      <circle className="cx-frame-inner" cx="160" cy="160" r="70"/>
      <line className="cx-line" x1="160" y1="60" x2="160" y2="260"/>
      <line className="cx-line" x1="60" y1="160" x2="260" y2="160"/>
      <line className="cx-line" x1="90" y1="90" x2="230" y2="230"/>
      <line className="cx-line" x1="230" y1="90" x2="90" y2="230"/>
      <polygon className="cx-line" points="160,100 180,160 160,220 140,160" fill="rgba(245,158,11,0.05)"/>
      <polygon className="cx-line" points="100,160 160,140 220,160 160,180" fill="rgba(245,158,11,0.05)"/>
      <circle className="cx-star" cx="160" cy="60" r="2.4"/>
      <circle className="cx-star" cx="160" cy="260" r="2"/>
      <circle className="cx-star" cx="60" cy="160" r="2"/>
      <circle className="cx-star" cx="260" cy="160" r="2"/>
      <circle className="cx-star" cx="90" cy="90" r="1.6"/>
      <circle className="cx-star" cx="230" cy="230" r="1.6"/>
      <circle className="cx-star" cx="230" cy="90" r="1.6"/>
      <circle className="cx-star" cx="90" cy="230" r="1.6"/>
      <circle className="cx-star-main" cx="160" cy="160" r="4"/>
      <text className="cx-label" x="160" y="76" textAnchor="middle" style={{ fill: 'rgba(245,158,11,0.7)', fontSize: '8px' }}>N</text>
      <text className="cx-roman" x="160" y="300" textAnchor="middle">IV</text>
      <text className="cx-label" x="160" y="314" textAnchor="middle">The Compass</text>
    </svg>
  );
}
