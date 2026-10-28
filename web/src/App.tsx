import {
  Activity, ArrowLeft, ArrowRight, Bell, CalendarDays, Check, ChevronDown,
  ClipboardCheck, Clock3, Dumbbell, FilePenLine, Gauge, Handshake, LayoutDashboard, Menu,
  Globe2, MoreHorizontal, RotateCcw, Search, Send, ShieldCheck, TrendingUp, Users, X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { initialWebDemo } from './demo-data';
import { LandingPage } from './LandingPage';
import type { Client, Handover, Page, Role, Stage, WebDemoState } from './types';
import { usePersistentState } from './use-persistent-state';
import './styles.css';

const roles: Role[] = ['Physiotherapist', 'Trainer', 'Admin'];
const stages: Stage[] = ['Physiotherapy', 'Rehabilitation', 'Functional Training', 'Performance'];

export default function App() {
  const [siteView, setSiteView] = useState<'landing' | 'dashboard'>(() => getSiteView());

  useEffect(() => {
    const syncView = () => setSiteView(getSiteView());
    window.addEventListener('popstate', syncView);
    return () => window.removeEventListener('popstate', syncView);
  }, []);

  const navigateSite = (view: 'landing' | 'dashboard') => {
    window.history.pushState({}, '', view === 'dashboard' ? '/dashboard' : '/');
    setSiteView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return siteView === 'dashboard'
    ? <DashboardApp onPublicSite={() => navigateSite('landing')} />
    : <LandingPage onOpenDashboard={() => navigateSite('dashboard')} />;
}

function getSiteView(): 'landing' | 'dashboard' {
  return window.location.pathname === '/dashboard' || window.location.pathname.startsWith('/dashboard/')
    ? 'dashboard'
    : 'landing';
}

function DashboardApp({ onPublicSite }: { onPublicSite: () => void }) {
  const [data, setData] = usePersistentState<WebDemoState>('revolve-web-demo-v1', initialWebDemo);
  const [role, setRole] = usePersistentState<Role>('revolve-web-role-v1', 'Physiotherapist');
  const [page, setPage] = useState<Page>('dashboard');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [handoverClient, setHandoverClient] = useState<Client | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState('');

  const selectedClient = data.clients.find((client) => client.id === selectedClientId) ?? null;
  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2800);
  };

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    setSelectedClientId(null);
    setSidebarOpen(false);
  };

  const saveClient = (client: Client) => {
    setData((current) => ({ ...current, clients: current.clients.map((item) => item.id === client.id ? client : item) }));
    setEditingClient(null);
    notify('Care plan saved as a professional update');
  };

  const sendHandover = (handover: Handover) => {
    setData((current) => ({ ...current, handovers: [handover, ...current.handovers] }));
    setHandoverClient(null);
    notify('Handover sent — acknowledgement still required');
  };

  const acknowledgeHandover = (id: string) => {
    setData((current) => ({
      ...current,
      handovers: current.handovers.map((item) => item.id === id ? { ...item, status: 'Acknowledged', acknowledgedAt: '27 Oct · just now' } : item),
    }));
    notify('Handover acknowledged by trainer');
  };

  const reset = () => {
    if (!window.confirm('Reset all dashboard demo changes?')) return;
    localStorage.removeItem('revolve-web-demo-v1');
    setData(initialWebDemo);
    setSelectedClientId(null);
    setPage('dashboard');
    notify('Web demo reset');
  };

  return (
    <div className="app-shell">
      <Sidebar page={page} role={role} open={sidebarOpen} onNavigate={navigate} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Topbar role={role} onRoleChange={setRole} onMenu={() => setSidebarOpen(true)} onPublicSite={onPublicSite} />
        <main className="content">
          {selectedClient ? (
            <ClientProfile client={selectedClient} role={role} onBack={() => setSelectedClientId(null)} onEdit={() => setEditingClient(selectedClient)} onHandover={() => setHandoverClient(selectedClient)} />
          ) : page === 'dashboard' ? (
            <Dashboard data={data} role={role} onClient={setSelectedClientId} onNavigate={navigate} />
          ) : page === 'clients' ? (
            <Clients clients={data.clients} onClient={setSelectedClientId} />
          ) : page === 'appointments' ? (
            <Appointments data={data} onClient={setSelectedClientId} />
          ) : (
            <Handovers handovers={data.handovers} role={role} onClient={setSelectedClientId} onAcknowledge={acknowledgeHandover} />
          )}
        </main>
        <button className="reset-demo" onClick={reset}><RotateCcw size={14} /> Reset Demo</button>
      </div>
      {editingClient ? <CarePlanModal client={editingClient} role={role} onClose={() => setEditingClient(null)} onSave={saveClient} /> : null}
      {handoverClient ? <HandoverModal client={handoverClient} onClose={() => setHandoverClient(null)} onSend={sendHandover} /> : null}
      {toast ? <div className="toast"><Check size={17} />{toast}</div> : null}
    </div>
  );
}

function Sidebar({ page, role, open, onNavigate, onClose }: { page: Page; role: Role; open: boolean; onNavigate: (page: Page) => void; onClose: () => void }) {
  const nav = [
    { id: 'dashboard' as Page, label: 'Overview', icon: LayoutDashboard },
    { id: 'clients' as Page, label: 'Clients', icon: Users },
    { id: 'appointments' as Page, label: 'Appointments', icon: CalendarDays },
    { id: 'handovers' as Page, label: 'Handover queue', icon: Handshake },
  ];
  return (
    <>
      {open ? <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} /> : null}
      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="brand"><span className="brand-mark"><i /></span><span>REVOLVE</span></div>
        <div className="workspace-label">STAFF WORKSPACE</div>
        <nav>
          {nav.map((item) => {
            const Icon = item.icon;
            return <button key={item.id} className={page === item.id ? 'nav-item active' : 'nav-item'} onClick={() => onNavigate(item.id)}><Icon size={18} /><span>{item.label}</span>{item.id === 'handovers' ? <b>1</b> : null}</button>;
          })}
        </nav>
        <div className="sidebar-spacer" />
        <div className="journey-key">
          <span>CARE PATHWAY</span>
          <div className="pathway-mini"><i className="done" /><i className="active" /><i /><i /></div>
          <p>Physio → Rehab → Functional → Performance</p>
        </div>
        <div className="signed-in"><div className="avatar small">MR</div><div><strong>Maya Rao</strong><span>{role}</span></div><MoreHorizontal size={17} /></div>
      </aside>
    </>
  );
}

function Topbar({ role, onRoleChange, onMenu, onPublicSite }: { role: Role; onRoleChange: (role: Role) => void; onMenu: () => void; onPublicSite: () => void }) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button>
      <div><span className="today-label">TUESDAY</span><strong>27 October 2026</strong></div>
      <div className="topbar-actions">
        <button className="secondary-btn public-site-link" onClick={onPublicSite}><Globe2 size={15} />Public site</button>
        <label className="role-select"><ShieldCheck size={16} /><span>Viewing as</span><select value={role} onChange={(event) => onRoleChange(event.target.value as Role)}>{roles.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label>
        <button className="icon-button" aria-label="Notifications"><Bell size={18} /><i /></button>
        <div className="avatar">MR</div>
      </div>
    </header>
  );
}

function Dashboard({ data, role, onClient, onNavigate }: { data: WebDemoState; role: Role; onClient: (id: string) => void; onNavigate: (page: Page) => void }) {
  const awaiting = data.handovers.filter((item) => item.status === 'Awaiting acknowledgement').length;
  const kpis = [
    { label: 'Active members', value: '128', delta: '+8 this month', icon: Users },
    { label: "Today's appointments", value: '18', delta: '4 remaining', icon: CalendarDays },
    { label: 'Rehab clients', value: '34', delta: '27% of members', icon: Activity },
    { label: 'Rehab → fitness', value: '68%', delta: '+6% this quarter', icon: TrendingUp },
  ];
  return (
    <div className="page-stack">
      <PageHeading eyebrow={`${role} workspace`} title="Operations overview" description="Today’s care, capacity and continuity at a glance." action={<button className="primary-btn" onClick={() => onNavigate('clients')}><Users size={16} />View clients</button>} />
      <section className="kpi-grid">
        {kpis.map((kpi) => { const Icon = kpi.icon; return <article className="kpi-card" key={kpi.label}><div className="kpi-top"><span>{kpi.label}</span><div className="soft-icon"><Icon size={17} /></div></div><strong>{kpi.value}</strong><small>{kpi.delta}</small></article>; })}
      </section>
      <div className="dashboard-grid">
        <section className="panel schedule-panel">
          <PanelHeader title="Today’s schedule" subtitle="6 care sessions · 72% capacity" action={<button className="link-btn" onClick={() => onNavigate('appointments')}>Full calendar <ArrowRight size={14} /></button>} />
          <div className="schedule-list">
            {data.appointments.filter((item) => item.date === '2026-10-29').map((appointment) => (
              <button key={appointment.id} className="schedule-row" onClick={() => onClient(appointment.clientId)}>
                <time>{appointment.time}</time><span className={`service-mark ${slug(appointment.type)}`} /><div><strong>{appointment.client}</strong><span>{appointment.type} · {appointment.professional}</span></div><StatusPill text={appointment.status} /><ArrowRight size={15} />
              </button>
            ))}
          </div>
        </section>
        <section className="panel distribution-panel">
          <PanelHeader title="Journey distribution" subtitle="Active client pathways" />
          <div className="donut-wrap"><div className="donut"><div><strong>128</strong><span>clients</span></div></div></div>
          <div className="legend">
            {[['Physiotherapy', 28, '#8c7357'], ['Rehabilitation', 34, '#426B5A'], ['Functional training', 41, '#8EAA99'], ['Performance', 25, '#C8D6CD']].map(([label, value, color]) => <div key={label as string}><i style={{ background: color }} /><span>{label}</span><strong>{value}</strong></div>)}
          </div>
        </section>
      </div>
      <div className="dashboard-lower">
        <section className="panel handover-callout">
          <div className="callout-icon"><Handshake size={22} /></div><div><span className="eyebrow">CONTINUITY CHECK</span><h3>{awaiting} handover awaiting acknowledgement</h3><p>A trainer must explicitly acknowledge each clinical handover before progression planning.</p></div><button className="secondary-btn" onClick={() => onNavigate('handovers')}>Open queue</button>
        </section>
        <section className="panel utilization">
          <PanelHeader title="Facility utilisation" subtitle="This week" />
          <div className="util-value"><strong>74%</strong><span>of available hours</span></div><div className="progress-track"><i style={{ width: '74%' }} /></div>
        </section>
      </div>
      <p className="data-note">Demo operations data is stored only in this browser. It is separate from the mobile demo and is not live-synchronised.</p>
    </div>
  );
}

function Clients({ clients, onClient }: { clients: Client[]; onClient: (id: string) => void }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | Stage>('All');
  const visible = useMemo(() => clients.filter((client) => {
    const matchesSearch = `${client.name} ${client.assignedProfessional}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (filter === 'All' || client.stage === filter);
  }), [clients, filter, search]);
  return (
    <div className="page-stack">
      <PageHeading eyebrow="Client operations" title="Clients" description="Search care plans, journey stages and upcoming touchpoints." />
      <section className="panel table-panel">
        <div className="table-tools">
          <label className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search client or professional" /></label>
          <label className="filter-select">Stage<select value={filter} onChange={(event) => setFilter(event.target.value as 'All' | Stage)}><option>All</option>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select><ChevronDown size={14} /></label>
        </div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>Client</th><th>Current stage</th><th>Assigned professional</th><th>Next appointment</th><th>Membership</th><th>Programme</th><th /></tr></thead>
            <tbody>{visible.map((client) => <tr key={client.id} onClick={() => onClient(client.id)}><td><div className="client-cell"><div className="avatar client-avatar">{client.initials}</div><div><strong>{client.name}</strong><span>{client.goal}</span></div></div></td><td><StagePill stage={client.stage} /></td><td>{client.assignedProfessional}</td><td>{client.nextAppointment}</td><td><StatusPill text={client.membership} /></td><td><div className="completion"><span>{client.completion}%</span><div className="progress-track"><i style={{ width: `${client.completion}%` }} /></div></div></td><td><ArrowRight size={16} /></td></tr>)}</tbody>
          </table>
          {visible.length === 0 ? <div className="empty-state">No clients match those filters.</div> : null}
        </div>
      </section>
      <p className="data-note">Programme percentages describe plan completion, not clinical recovery.</p>
    </div>
  );
}

function ClientProfile({ client, role, onBack, onEdit, onHandover }: { client: Client; role: Role; onBack: () => void; onEdit: () => void; onHandover: () => void }) {
  return (
    <div className="page-stack">
      <button className="back-link" onClick={onBack}><ArrowLeft size={16} />Back to clients</button>
      <div className="profile-heading">
        <div className="avatar profile-avatar">{client.initials}</div><div><span className="eyebrow">CLIENT PROFILE</span><h1>{client.name}</h1><p>{client.age} years · {client.phone} · Active since Jun 2026</p></div>
        <div className="profile-actions"><button className="secondary-btn" onClick={onEdit}><FilePenLine size={16} />Edit care plan</button><button className="primary-btn" onClick={onHandover}><Send size={16} />Send handover</button></div>
      </div>
      <div className="profile-grid">
        <div className="profile-main">
          <section className="panel care-hero">
            <div className="care-hero-top"><div><span className="eyebrow light">INTEGRATED CARE PLAN</span><h2>{client.goal}</h2><StagePill stage={client.stage} /></div><div className="completion-ring" style={{ '--value': `${client.completion * 3.6}deg` } as React.CSSProperties}><div><strong>{client.completion}%</strong><span>programme</span></div></div></div>
            <div className="clinical-note"><ShieldCheck size={15} />Plan completion is not a clinical recovery score. Stage clearance is a separate professional action.</div>
          </section>
          <section className="metric-row">
            <MetricCard label="Pain" value={`${client.pain}/10`} note="6/10 at baseline" />
            <MetricCard label="Mobility" value={`${client.mobility}%`} note="58% at baseline" />
            <MetricCard label="Strength" value={`${client.strength}%`} note="42% at baseline" />
          </section>
          <section className="panel plan-details">
            <PanelHeader title="Coordinated recommendations" subtitle="Current shared view for the care team" action={<button className="link-btn" onClick={onEdit}>Edit <FilePenLine size={14} /></button>} />
            <PlanRow icon={<Activity size={18} />} label="Physio recommendation" value={client.physioRecommendation} />
            <PlanRow icon={<Dumbbell size={18} />} label="Trainer recommendation" value={client.trainerRecommendation} />
            <PlanRow icon={<ShieldCheck size={18} />} label="Restrictions" value={client.restrictions} warning />
            <PlanRow icon={<Gauge size={18} />} label="Next milestone" value={client.nextMilestone} />
          </section>
          <section className="panel">
            <PanelHeader title="Update history" subtitle="Professional changes to this local demo record" />
            <div className="history-list">{client.updates.length ? client.updates.map((update) => <div className="history-item" key={update.id}><i /><div><time>{update.date}</time><strong>{update.author}</strong><p>{update.summary}</p></div></div>) : <div className="empty-state compact">No updates recorded yet.</div>}</div>
          </section>
        </div>
        <aside className="profile-side">
          <section className="panel next-session"><span className="eyebrow">NEXT APPOINTMENT</span><div className="date-tile"><strong>29</strong><span>OCT</span></div><h3>Rehabilitation session</h3><p><Clock3 size={14} />10:30 · Dr. Maya Rao</p><button className="secondary-btn full">View in calendar</button></section>
          <section className="panel"><PanelHeader title="Clinical context" /><dl className="context-list"><div><dt>History</dt><dd>{client.history}</dd></div><div><dt>Initial assessment</dt><dd>{client.assessment}</dd></div><div><dt>Membership</dt><dd>{client.membership} · Recovery plan</dd></div></dl></section>
          <section className="panel demo-note"><span className="demo-label">DEMO DATA</span><p>Mobile and web demo records are intentionally separate. Actions here do not update the customer app.</p></section>
          <small className="role-hint">You are acting as <strong>{role}</strong>.</small>
        </aside>
      </div>
    </div>
  );
}

function Appointments({ data, onClient }: { data: WebDemoState; onClient: (id: string) => void }) {
  const days = ['Mon 26', 'Tue 27', 'Wed 28', 'Thu 29', 'Fri 30', 'Sat 31'];
  const times = ['08:00', '10:00', '12:00', '14:00', '16:00'];
  return (
    <div className="page-stack">
      <PageHeading eyebrow="Operations calendar" title="Appointments" description="Professional availability and confirmed sessions across the week." action={<button className="secondary-btn"><CalendarDays size={16} />27 Oct – 2 Nov</button>} />
      <section className="calendar-layout">
        <div className="panel calendar-panel">
          <div className="calendar-toolbar"><div><button className="icon-button"><ArrowLeft size={16} /></button><button className="icon-button"><ArrowRight size={16} /></button><strong>October 2026</strong></div><button className="secondary-btn">Week <ChevronDown size={14} /></button></div>
          <div className="calendar-scroll"><div className="calendar-grid">
            <div className="calendar-corner" />{days.map((day) => <div className={`calendar-day ${day === 'Tue 27' ? 'today' : ''}`} key={day}><span>{day.split(' ')[0]}</span><strong>{day.split(' ')[1]}</strong></div>)}
            {times.map((time) => <div className="calendar-row" key={time} style={{ gridColumn: '1 / -1' }}><time>{time}</time>{days.map((day) => <div className="calendar-slot" key={day}>{data.appointments.filter((item) => item.day === day && item.time.startsWith(time.slice(0, 2))).map((item) => <button onClick={() => onClient(item.clientId)} className={`calendar-event ${slug(item.type)}`} key={item.id}><strong>{item.time} · {item.client}</strong><span>{item.type}</span></button>)}</div>)}</div>)}
          </div></div>
        </div>
        <aside className="panel calendar-side"><PanelHeader title="Team capacity" subtitle="This week" />{[['Dr. Maya Rao', 82], ['Dr. Leena Bose', 68], ['Kabir Singh', 76], ['Nisha Verma', 71]].map(([name, value]) => <div className="capacity" key={name as string}><div><strong>{name}</strong><span>{value}%</span></div><div className="progress-track"><i style={{ width: `${value}%` }} /></div></div>)}<hr /><PanelHeader title="Service key" /><div className="service-key"><span><i className="physio" />Physiotherapy</span><span><i className="rehabilitation" />Rehabilitation</span><span><i className="functional" />Training</span></div></aside>
      </section>
    </div>
  );
}

function Handovers({ handovers, role, onClient, onAcknowledge }: { handovers: Handover[]; role: Role; onClient: (id: string) => void; onAcknowledge: (id: string) => void }) {
  const awaiting = handovers.filter((handover) => handover.status === 'Awaiting acknowledgement');
  return (
    <div className="page-stack">
      <PageHeading eyebrow="Care continuity" title="Handover queue" description="Clinical context moves forward only through deliberate, traceable actions." />
      <section className="workflow-strip"><div className="workflow-step done"><span><FilePenLine size={17} /></span><div><strong>1 · Care plan edited</strong><small>Professional records guidance</small></div></div><ArrowRight size={17} /><div className="workflow-step active"><span><Send size={17} /></span><div><strong>2 · Handover sent</strong><small>Context shared with trainer</small></div></div><ArrowRight size={17} /><div className="workflow-step"><span><ClipboardCheck size={17} /></span><div><strong>3 · Trainer acknowledges</strong><small>Separate confirmation action</small></div></div></section>
      {awaiting.map((handover) => <section className="panel handover-card" key={handover.id}><div className="handover-status"><span className="pulse-dot" />Awaiting trainer acknowledgement</div><div className="handover-heading"><button className="client-inline" onClick={() => onClient(handover.clientId)}><div className="avatar client-avatar">{initials(handover.client)}</div><div><strong>{handover.client}</strong><span>{handover.from} → {handover.to}</span></div></button><time>{handover.sentAt}</time></div><div className="handover-body"><div><span>CLINICAL SUMMARY</span><p>{handover.summary}</p></div><div className="restriction-box"><ShieldCheck size={17} /><div><span>RESTRICTIONS</span><p>{handover.restrictions}</p></div></div></div><div className="handover-footer"><p>{role === 'Trainer' ? 'Review the clinical context before acknowledging.' : 'Switch to the Trainer role to complete acknowledgement.'}</p><button className="primary-btn" disabled={role !== 'Trainer'} onClick={() => onAcknowledge(handover.id)}><ClipboardCheck size={16} />Acknowledge handover</button></div></section>)}
      <section className="panel"><PanelHeader title="Acknowledged handovers" subtitle="Completed confirmations" /><div className="ack-list">{handovers.filter((item) => item.status === 'Acknowledged').map((item) => <button key={item.id} onClick={() => onClient(item.clientId)}><Check size={16} /><div><strong>{item.client}</strong><span>{item.from} → {item.to}</span></div><time>{item.acknowledgedAt}</time><ArrowRight size={15} /></button>)}</div></section>
      <p className="data-note">Handovers in this prototype are local dashboard scenarios. They do not reach the mobile app or another device.</p>
    </div>
  );
}

function CarePlanModal({ client, role, onClose, onSave }: { client: Client; role: Role; onClose: () => void; onSave: (client: Client) => void }) {
  const [draft, setDraft] = useState(client);
  const update = (field: keyof Client, value: string) => setDraft((current) => ({ ...current, [field]: value }));
  const save = () => onSave({ ...draft, updates: [{ id: `u-${Date.now()}`, date: '27 Oct 2026', author: `${role} · Local demo edit`, summary: `Care plan updated. Current stage: ${draft.stage}. Restrictions and recommendations reviewed.` }, ...draft.updates] });
  return (
    <ModalShell title="Edit integrated care plan" subtitle="Professional action · changes are saved locally" onClose={onClose}>
      <div className="form-grid">
        <Field label="Goal"><input value={draft.goal} onChange={(event) => update('goal', event.target.value)} /></Field>
        <Field label="Current stage"><select value={draft.stage} onChange={(event) => update('stage', event.target.value)}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select><small>Stage changes only when this professional action is saved.</small></Field>
        <Field label="Physio recommendation" wide><textarea value={draft.physioRecommendation} onChange={(event) => update('physioRecommendation', event.target.value)} /></Field>
        <Field label="Trainer recommendation" wide><textarea value={draft.trainerRecommendation} onChange={(event) => update('trainerRecommendation', event.target.value)} /></Field>
        <Field label="Restrictions" wide><textarea value={draft.restrictions} onChange={(event) => update('restrictions', event.target.value)} /></Field>
        <Field label="Next milestone" wide><input value={draft.nextMilestone} onChange={(event) => update('nextMilestone', event.target.value)} /></Field>
      </div>
      <div className="modal-actions"><button className="tertiary-btn" onClick={onClose}>Cancel</button><button className="primary-btn" onClick={save}><Check size={16} />Save care plan</button></div>
    </ModalShell>
  );
}

function HandoverModal({ client, onClose, onSend }: { client: Client; onClose: () => void; onSend: (handover: Handover) => void }) {
  const [to, setTo] = useState('Kabir Singh');
  const [summary, setSummary] = useState(`Pain ${client.pain}/10. Mobility improved. ${client.physioRecommendation}`);
  const [restrictions, setRestrictions] = useState(client.restrictions);
  const send = () => onSend({ id: `h-${Date.now()}`, clientId: client.id, client: client.name, from: 'Dr. Maya Rao', to, sentAt: '27 Oct · just now', summary, restrictions, status: 'Awaiting acknowledgement' });
  return (
    <ModalShell title="Send clinical handover" subtitle={`${client.name} · separate from care-plan editing`} onClose={onClose}>
      <div className="separation-note"><Handshake size={18} /><p>Sending creates a queue item. It does not clear a stage, edit the care plan, or count as trainer acknowledgement.</p></div>
      <div className="form-grid">
        <Field label="Trainer"><select value={to} onChange={(event) => setTo(event.target.value)}><option>Kabir Singh</option><option>Nisha Verma</option></select></Field>
        <Field label="Current stage"><input value={client.stage} readOnly /></Field>
        <Field label="Clinical summary" wide><textarea value={summary} onChange={(event) => setSummary(event.target.value)} /></Field>
        <Field label="Restrictions" wide><textarea value={restrictions} onChange={(event) => setRestrictions(event.target.value)} /></Field>
      </div>
      <div className="modal-actions"><button className="tertiary-btn" onClick={onClose}>Cancel</button><button className="primary-btn" onClick={send}><Send size={16} />Send to trainer</button></div>
    </ModalShell>
  );
}

function ModalShell({ title, subtitle, onClose, children }: { title: string; subtitle: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-header"><div><span className="eyebrow">REVOLVE OPERATIONS</span><h2 id="modal-title">{title}</h2><p>{subtitle}</p></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={18} /></button></div>{children}</section></div>;
}

function Field({ label, wide = false, children }: { label: string; wide?: boolean; children: React.ReactNode }) { return <label className={wide ? 'field wide' : 'field'}><span>{label}</span>{children}</label>; }
function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) { return <div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</div>; }
function PanelHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) { return <div className="panel-header"><div><h3>{title}</h3>{subtitle ? <p>{subtitle}</p> : null}</div>{action}</div>; }
function StatusPill({ text }: { text: string }) { return <span className={`status-pill ${slug(text)}`}>{text}</span>; }
function StagePill({ stage }: { stage: Stage }) { return <span className={`stage-pill ${slug(stage)}`}><i />{stage}</span>; }
function MetricCard({ label, value, note }: { label: string; value: string; note: string }) { return <div className="metric-card"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>; }
function PlanRow({ icon, label, value, warning = false }: { icon: React.ReactNode; label: string; value: string; warning?: boolean }) { return <div className={`plan-row ${warning ? 'warning' : ''}`}><span className="plan-icon">{icon}</span><div><strong>{label}</strong><p>{value}</p></div></div>; }
function slug(value: string) { return value.toLowerCase().replaceAll(' ', '-').replaceAll('→', 'to').replaceAll(/[^a-z-]/g, ''); }
function initials(name: string) { return name.split(' ').map((part) => part[0]).slice(0, 2).join(''); }
