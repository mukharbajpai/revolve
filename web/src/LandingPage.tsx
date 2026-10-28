import {
  ArrowRight, Check, Download, ExternalLink, HeartPulse, ShieldCheck, Smartphone, Users,
} from 'lucide-react';

type LandingPageProps = {
  onOpenDashboard: () => void;
};

const customerPwaUrl = import.meta.env.VITE_CUSTOMER_PWA_URL?.trim();
const androidApkUrl = import.meta.env.VITE_ANDROID_APK_URL?.trim();

export function LandingPage({ onOpenDashboard }: LandingPageProps) {
  return (
    <div className="landing-shell">
      <header className="landing-header">
        <a className="landing-brand" href="/" aria-label="Revolve home">
          <span className="brand-mark"><i /></span><span>REVOLVE</span>
        </a>
        <nav className="landing-nav" aria-label="Public navigation">
          <a href="#journey">The journey</a>
          <a href="#get-app">Get the app</a>
          <button onClick={onOpenDashboard}>Staff dashboard <ArrowRight size={15} /></button>
        </nav>
      </header>

      <main>
        <section className="landing-hero">
          <div className="hero-copy">
            <span className="landing-eyebrow">INTEGRATED HEALTH & PERFORMANCE</span>
            <h1>Recover with direction.<br />Return with confidence.</h1>
            <p>One coordinated customer journey from physiotherapy through rehabilitation, functional training and performance.</p>
            <div className="hero-actions">
              <DownloadLink
                url={customerPwaUrl}
                label="Open iPhone app"
                detail="Install from Safari"
                icon={<Smartphone size={19} />}
              />
              <DownloadLink
                url={androidApkUrl}
                label="Download Android APK"
                detail="Standalone installation"
                icon={<Download size={19} />}
                secondary
              />
            </div>
            <p className="link-status">
              {customerPwaUrl && androidApkUrl
                ? 'Customer download links are live.'
                : 'Download links become active when deployment URLs are configured.'}
            </p>
          </div>

          <div className="product-preview" aria-label="Revolve customer app preview">
            <div className="preview-orbit orbit-one" />
            <div className="preview-orbit orbit-two" />
            <div className="phone-frame">
              <div className="phone-speaker" />
              <div className="phone-content">
                <div className="phone-brand"><span className="brand-mark"><i /></span>REVOLVE</div>
                <span className="phone-kicker">GOOD MORNING, AARAV</span>
                <h2>Your plan is moving steadily.</h2>
                <div className="phone-stage-card">
                  <span>CURRENT STAGE</span>
                  <strong>Rehabilitation</strong>
                  <div className="phone-progress"><i /></div>
                  <small>72% programme completion</small>
                </div>
                <div className="phone-milestone">
                  <Check size={15} />
                  <div><span>NEXT MILESTONE</span><strong>Pain-free 5 km walk</strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="journey-section" id="journey">
          <div className="section-heading">
            <span className="landing-eyebrow">ONE CONTINUOUS PATHWAY</span>
            <h2>Care that moves with you.</h2>
            <p>Recommendations, restrictions and milestones stay visible as the focus changes from recovery to confident performance.</p>
          </div>
          <div className="journey-steps">
            {[
              ['01', 'Physiotherapy', 'Assess, reduce pain and establish a safe starting point.'],
              ['02', 'Rehabilitation', 'Restore capacity through structured, progressive movement.'],
              ['03', 'Functional Training', 'Translate recovery into everyday and sport-specific ability.'],
              ['04', 'Performance', 'Build resilience, confidence and sustainable performance.'],
            ].map(([number, title, copy], index) => (
              <article className={index === 1 ? 'active' : ''} key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="download-section" id="get-app">
          <div className="download-intro">
            <span className="landing-eyebrow">CUSTOMER APP</span>
            <h2>Take your care plan with you.</h2>
            <p>Book sessions, complete assigned activities, check in on progress and review your Integrated Care Plan.</p>
            <div className="trust-row"><ShieldCheck size={17} /><span>Demo data stays on this device. No account or payment required.</span></div>
          </div>
          <div className="download-options">
            <DownloadCard
              platform="iPhone"
              title="Install the web app"
              copy="Open in Safari, tap Share, then Add to Home Screen."
              url={customerPwaUrl}
              action="Open iPhone app"
              icon={<Smartphone size={23} />}
            />
            <DownloadCard
              platform="Android"
              title="Install the standalone APK"
              copy="Download the release APK and approve installation when Android prompts."
              url={androidApkUrl}
              action="Download APK"
              icon={<Download size={23} />}
            />
          </div>
        </section>

        <section className="team-callout">
          <div className="team-icon"><Users size={24} /></div>
          <div><span className="landing-eyebrow">FOR THE CARE TEAM</span><h2>Operations stay in a dedicated workspace.</h2><p>Manage clients, appointments, care plans and professional handovers separately from the customer app.</p></div>
          <button onClick={onOpenDashboard}>Open staff dashboard <ArrowRight size={16} /></button>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-brand"><span className="brand-mark"><i /></span><span>REVOLVE</span></div>
        <p>Prototype customer and staff data are local and are not live-synchronised.</p>
        <button onClick={onOpenDashboard}>Staff access</button>
      </footer>
    </div>
  );
}

function DownloadLink({ url, label, detail, icon, secondary = false }: {
  url?: string;
  label: string;
  detail: string;
  icon: React.ReactNode;
  secondary?: boolean;
}) {
  const className = `download-link ${secondary ? 'secondary' : ''} ${url ? '' : 'disabled'}`.trim();
  const content = <>{icon}<span><strong>{label}</strong><small>{url ? detail : 'URL pending deployment'}</small></span>{url ? <ExternalLink size={15} /> : null}</>;
  return url
    ? <a className={className} href={url} target="_blank" rel="noreferrer">{content}</a>
    : <span className={className} aria-disabled="true">{content}</span>;
}

function DownloadCard({ platform, title, copy, url, action, icon }: {
  platform: string;
  title: string;
  copy: string;
  url?: string;
  action: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="download-card">
      <div className="download-card-icon">{icon}</div>
      <span>{platform}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
      {url
        ? <a href={url} target="_blank" rel="noreferrer">{action} <ExternalLink size={15} /></a>
        : <span className="pending-link"><HeartPulse size={15} /> Add URL at deployment</span>}
    </article>
  );
}
