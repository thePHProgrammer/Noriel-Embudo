export function PlanetProjects() {
  return (
    <svg className="constellation" viewBox="0 0 320 320">
      <circle className="cx-frame" cx="160" cy="160" r="140"/>
      <circle className="cx-frame-inner" cx="160" cy="160" r="85"/>
      <line className="cx-line" x1="115" y1="140" x2="160" y2="120"/>
      <line className="cx-line" x1="160" y1="120" x2="210" y2="135"/>
      <line className="cx-line" x1="210" y1="135" x2="225" y2="180"/>
      <line className="cx-line" x1="225" y1="180" x2="180" y2="205"/>
      <line className="cx-line" x1="180" y1="205" x2="130" y2="195"/>
      <line className="cx-line" x1="130" y1="195" x2="100" y2="170"/>
      <line className="cx-line" x1="100" y1="170" x2="115" y2="140"/>
      <line className="cx-line" x1="160" y1="120" x2="165" y2="160"/>
      <line className="cx-line" x1="130" y1="195" x2="165" y2="160"/>
      <line className="cx-line" x1="225" y1="180" x2="165" y2="160"/>
      <circle className="cx-star" cx="115" cy="140" r="2"/>
      <circle className="cx-star" cx="160" cy="120" r="2.4"/>
      <circle className="cx-star" cx="210" cy="135" r="1.8"/>
      <circle className="cx-star" cx="225" cy="180" r="2.2"/>
      <circle className="cx-star" cx="180" cy="205" r="1.6"/>
      <circle className="cx-star" cx="130" cy="195" r="2"/>
      <circle className="cx-star" cx="100" cy="170" r="1.8"/>
      <circle className="cx-star-main" cx="165" cy="160" r="4"/>
      <text className="cx-roman" x="160" y="265" textAnchor="middle">III</text>
      <text className="cx-label" x="160" y="282" textAnchor="middle">The Pleiades</text>
    </svg>
  );
}
