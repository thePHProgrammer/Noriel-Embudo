export function PlanetEducation() {
  return (
    <svg className="constellation" viewBox="0 0 320 320">
      <circle className="cx-frame" cx="160" cy="160" r="140"/>
      <circle className="cx-frame-inner" cx="160" cy="160" r="100"/>
      <polyline className="cx-line" points="80,205 115,145 160,115 205,145 240,205"/>
      <line className="cx-line" x1="160" y1="115" x2="160" y2="220"/>
      <line className="cx-line" x1="80" y1="205" x2="160" y2="220"/>
      <line className="cx-line" x1="240" y1="205" x2="160" y2="220"/>
      <line className="cx-line" x1="115" y1="145" x2="205" y2="145" strokeDasharray="2 3"/>
      <circle className="cx-star" cx="80" cy="205" r="1.8"/>
      <circle className="cx-star" cx="115" cy="145" r="2"/>
      <circle className="cx-star-main" cx="160" cy="115" r="4"/>
      <circle className="cx-star" cx="205" cy="145" r="2"/>
      <circle className="cx-star" cx="240" cy="205" r="1.8"/>
      <circle className="cx-star" cx="160" cy="220" r="2.2"/>
      <text className="cx-roman" x="160" y="265" textAnchor="middle">V</text>
      <text className="cx-label" x="160" y="282" textAnchor="middle">The Scholar</text>
    </svg>
  );
}
