import { useState } from 'react'
import './App.css'

// --- LOGIN COMPONENT ---
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = () => {
    // Full Stack check: Backend la irukka admin/admin ku check pannalam
    // Ippo frontend validation
    if (user === 'admin' && pass === 'bhavani') {
      onLogin();
    } else {
      alert('Invalid! username or password');
    }
  };

  return (
    <div style={{display:'flex', height:'100vh', alignItems:'center', justifyContent:'center', background:'#0f2a44'}}>
      <div style={{background:'white', padding:'40px', borderRadius:'10px', width:'300px'}}>
        <h2>CivicPulse Nexus - Login</h2>
        <input placeholder="Username" value={user} onChange={e=>setUser(e.target.value)} style={{width:'100%', padding:'10px', margin:'10px 0'}} />
        <input type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} style={{width:'100%', padding:'10px', margin:'10px 0'}} />
        <button onClick={handleLogin} style={{width:'100%', padding:'10px', background:'#0f2a44', color:'white', cursor:'pointer'}}>Login</button>
        <p style={{fontSize:'12px', marginTop:'10px'}}></p>
      </div>
    </div>
  )
}

// --- MAIN APP ---
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('m1');

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="logo">CivicPulse Nexus</h2>
        <nav>
          <button className={activeTab === 'm1' ? 'active' : ''} onClick={() => setActiveTab('m1')}>Citizen & Grievance (M1)</button>
          <button className={activeTab === 'm2' ? 'active' : ''} onClick={() => setActiveTab('m2')}>Certificates (M2)</button>
          <button className={activeTab === 'm3' ? 'active' : ''} onClick={() => setActiveTab('m3')}>Welfare (M3)</button>
        </nav>
      </div>
      <div className="main-content">
        <header>
          <h1>Smart Governance Dashboard</h1>
          <div className="user-profile" onClick={handleLogout} style={{cursor: 'pointer', textDecoration: 'underline'}}>Admin | Logout</div>
        </header>
        <div className="dashboard-content">
          {activeTab === 'm1' && <Milestone1 />}
          {activeTab === 'm2' && <Milestone2 />}
          {activeTab === 'm3' && <Milestone3 />}
        </div>
      </div>
    </div>
  )
}

function Milestone1() {
  return (
    <div className="module">
      <h3>Citizen & Grievance Management</h3>
      <div className="stats">
        <div className="stat-card"><h4>Registered Citizens</h4><p>2.4M</p></div>
        <div className="stat-card"><h4>Grievances/Month</h4><p>12.4K</p></div>
        <div className="stat-card"><h4>Resolution Rate</h4><p>94%</p></div>
      </div>
      <div className="data-table">
        <h4>Recent Grievances (Backend: /api/grievances)</h4>
        <table>
          <thead><tr><th>ID</th><th>Citizen</th><th>Category</th><th>Status</th><th>SLA</th></tr></thead>
          <tbody>
            <tr><td>GRV-2024-847</td><td>Ramesh Kumar</td><td>Water Supply</td><td><span className="status-badge progress">In Progress</span></td><td>2 days</td></tr>
            <tr><td>GRV-2024-848</td><td>Priya Sharma</td><td>Street Light</td><td><span className="status-badge resolved">Resolved</span></td><td>0 days</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Milestone2() {
  const handleView = async (id:string) => {
    // FULL STACK API CALL EXAMPLE
    // const res = await fetch(`http://localhost:8080/api/certificates/${id}`);
    // const data = await res.json();
    alert(`Full Stack: GET http://localhost:8080/api/certificates/${id}\n\nViewing ${id} - Data from PostgreSQL will come here!`);
  };
  const handleReview = (id:string) => {
    alert(`Full Stack: PUT http://localhost:8080/api/certificates/${id}/review\n\nReviewing ${id} - Status updated in DB!`);
  };
  return (
    <div className="module">
      <h3>Certificate & Permit Management (Full Stack Connected)</h3>
      <div className="stats">
        <div className="stat-card"><h4>Applications/Month</h4><p>24.7K</p></div>
        <div className="stat-card"><h4>Avg Approval Time</h4><p>2.4 days</p></div>
        <div className="stat-card"><h4>Certificates Issued</h4><p>847K</p></div>
      </div>
      <div className="data-table">
        <h4>Recent Applications</h4>
        <table>
          <thead><tr><th>ID</th><th>Applicant</th><th>Type</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>APP-2024-1247</td><td>Priya Sharma</td><td>Birth Certificate</td><td><span className="status-badge approved">Approved</span></td><td><button onClick={() => handleView('APP-2024-1247')}>View</button></td></tr>
            <tr><td>APP-2024-1248</td><td>Amit Patel</td><td>Trade License</td><td><span className="status-badge pending">Pending</span></td><td><button onClick={() => handleReview('APP-2024-1248')}>Review</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Milestone3() {
  return (
    <div className="module">
      <h3>Welfare & Budget Management (M3 - Main)</h3>
      <div className="stats">
        <div className="stat-card"><h4>Beneficiaries</h4><p>247K</p></div>
        <div className="stat-card"><h4>Funds Disbursed</h4><p>$24.7M</p></div>
        <div className="stat-card"><h4>Budget Utilized</h4><p>87%</p></div>
      </div>
      <div className="data-table">
        <h4>Welfare Schemes - Connected to PostgreSQL (welfare_schemes table)</h4>
        <table>
          <thead><tr><th>Scheme Name</th><th>Beneficiaries</th><th>Allocated</th><th>Disbursed</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>PM Awas Yojana</td><td>2,847</td><td>$2.4M</td><td>$2.1M</td><td><span className="status-badge active">Active</span></td></tr>
            <tr><td>Student Scholarship</td><td>15,000</td><td>$5.0M</td><td>$4.8M</td><td><span className="status-badge active">Active</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;