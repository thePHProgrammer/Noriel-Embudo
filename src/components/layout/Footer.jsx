import { META } from '../../data/meta';

export function Footer() {
  return (
    <footer>
      <div>{META.name} &nbsp;·&nbsp; {META.title}</div>
    </footer>
  );
}
