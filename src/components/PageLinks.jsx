import { SITE_PAGES } from '../data/sitePages';

const styles = `
  .page-links {
    width: min(100% - 32px, 1180px);
    margin: 0 auto;
    color: #667085;
    font-size: 0.9rem;
  }

  .page-links a {
    color: #667085;
    font-weight: 700;
    text-decoration: none;
  }

  .page-links a:hover {
    color: var(--coral-red);
  }

  .breadcrumbs ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .breadcrumbs li + li::before {
    content: "/";
    margin-right: 8px;
  }

  .breadcrumbs [aria-current] {
    color: var(--onyx);
    font-weight: 700;
  }

  .related-pages {
    padding: 8px 0 40px;
  }

  .related-pages h2 {
    margin: 0 0 14px;
    color: var(--onyx);
    font-size: 1.1rem;
  }

  .related-pages ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
  }

  .related-pages li {
    background: #fff;
    border: 1px solid rgba(22,22,24,0.08);
    border-radius: 8px;
    padding: 16px 18px;
    line-height: 1.5;
  }

  .related-pages li a {
    display: block;
    color: var(--onyx);
    margin-bottom: 4px;
  }
`;

export function Breadcrumbs({ current }) {
  return (
    <nav className="page-links breadcrumbs" aria-label="Breadcrumb">
      <style>{styles}</style>
      <ol>
        <li><a href="/">Home</a></li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

export function RelatedPages({ currentPath }) {
  const related = SITE_PAGES.filter((page) => page.path !== currentPath && page.related !== false);
  return (
    <aside className="page-links related-pages" aria-label="Related">
      <style>{styles}</style>
      <h2>Related</h2>
      <ul>
        {related.map((page) => (
          <li key={page.path}>
            <a href={page.path}>{page.title}</a>
            {page.blurb}
          </li>
        ))}
      </ul>
    </aside>
  );
}
