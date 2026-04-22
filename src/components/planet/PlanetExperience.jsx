export function PlanetExperience() {
  return (
    <svg className="constellation" viewBox="0 0 320 320">
      <circle className="cx-frame" cx="160" cy="160" r="140"/>
      <circle className="cx-frame-inner" cx="160" cy="160" r="95"/>
      <polyline className="cx-line" points="70,230 105,195 135,215 165,165 195,185 225,125 255,95"/>
      <line className="cx-line" x1="165" y1="165" x2="105" y2="195" strokeDasharray="2 4"/>
      <line className="cx-line" x1="225" y1="125" x2="165" y2="165" strokeDasharray="2 4"/>
      <circle className="cx-star" cx="70" cy="230" r="1.6"/>
      <circle className="cx-star" cx="105" cy="195" r="2"/>
      <circle className="cx-star" cx="135" cy="215" r="1.8"/>
      <circle className="cx-star-main" cx="165" cy="165" r="4"/>
      <circle className="cx-star" cx="195" cy="185" r="1.8"/>
      <circle className="cx-star" cx="225" cy="125" r="2.6"/>
      <circle className="cx-star" cx="255" cy="95" r="2.2"/>
      <text className="cx-roman" x="160" y="265" textAnchor="middle">II</text>
      <text className="cx-label" x="160" y="282" textAnchor="middle">The Voyager</text>
    </svg>
  );
}
