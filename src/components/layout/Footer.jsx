import { META } from '../../data/meta';

export function Footer() {
  return (
    <footer>
      <div>{META.name} &nbsp;·&nbsp; {META.title} &nbsp;·&nbsp; Quezon City, PH</div>
      <div style={{ marginTop: '8px' }}>{META.email} &nbsp;·&nbsp; {META.phone}</div>
    </footer>
  );
}
