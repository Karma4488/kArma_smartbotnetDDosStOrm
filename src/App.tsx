import { useMemo } from 'react';

type QuickCheck = {
  label: string;
  status: 'Ready' | 'Action required';
  description: string;
};

type Guide = {
  title: string;
  summary: string;
  link: string;
};

const quickChecks: QuickCheck[] = [
  {
    label: 'Project tooling',
    status: 'Ready',
    description: 'Vite with React and TypeScript is configured with dev, build, and preview scripts.'
  },
  {
    label: 'Development server',
    status: 'Ready',
    description: 'Run "npm run dev" to start the local preview at http://localhost:3000.'
  },
  {
    label: 'Production build',
    status: 'Ready',
    description: 'Execute "npm run build" to generate an optimized production bundle.'
  }
];

const guides: Guide[] = [
  {
    title: 'Project workspace overview',
    summary: 'Understand how Builder.io projects are structured and how live previews work.',
    link: 'https://www.builder.io/c/docs/projects'
  },
  {
    title: 'Integrate data sources',
    summary: 'Connect to Supabase, Neon, or Builder CMS to power your application with live content.',
    link: 'https://www.builder.io/c/docs/integrations'
  },
  {
    title: 'Automate your workflow',
    summary: 'Use Zapier or Netlify integrations to streamline deployments and operational tasks.',
    link: 'https://www.builder.io/c/docs/automation'
  }
];

const App = () => {
  const formattedTimestamp = useMemo(() => {
    const now = new Date();
    return new Intl.DateTimeFormat('en', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(now);
  }, []);

  return (
    <div className="viewport">
      <header className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Fusion diagnostics</p>
          <h1 className="hero__title">Your development workspace is ready</h1>
          <p className="hero__subtitle">
            This dashboard summarises the local tooling so you can start shipping features right away.
          </p>
          <div className="hero__meta">
            <span className="meta-indicator" aria-hidden="true" />
            <span className="meta-label">Last environment refresh</span>
            <time className="meta-timestamp" dateTime={formattedTimestamp}>
              {formattedTimestamp}
            </time>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="status-section" aria-labelledby="status-heading">
          <div className="section-heading">
            <h2 id="status-heading" className="section-title">
              Quick status checks
            </h2>
            <p className="section-subtitle">
              Launch the dev server, iterate locally, and ship with confidence using the provided scripts.
            </p>
          </div>
          <div className="status-grid">
            {quickChecks.map((check) => (
              <article className="status-card" key={check.label}>
                <div className="status-card__header">
                  <span className="status-dot status-dot--ready" aria-hidden="true" />
                  <h3 className="status-card__title">{check.label}</h3>
                </div>
                <p className="status-card__state">{check.status}</p>
                <p className="status-card__description">{check.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="resources-section" aria-labelledby="resources-heading">
          <div className="section-heading">
            <h2 id="resources-heading" className="section-title">
              Helpful next steps
            </h2>
            <p className="section-subtitle">
              Explore documentation to connect integrations, automate workflows, or manage content.
            </p>
          </div>
          <div className="resources-grid">
            {guides.map((guide) => (
              <article className="resource-card" key={guide.title}>
                <h3 className="resource-card__title">{guide.title}</h3>
                <p className="resource-card__summary">{guide.summary}</p>
                <a className="resource-card__link" href={guide.link} target="_blank" rel="noreferrer">
                  Read the guide
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
