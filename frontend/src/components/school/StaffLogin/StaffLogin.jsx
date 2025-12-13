import React, { useMemo, useState } from 'react';
import { 
  Search, Download, Printer, RefreshCw, Users, Shield, UserCheck, Ban, 
  Key, Share2, X, Eye, EyeOff, Copy, Check, Clock, Smartphone, Monitor 
} from 'lucide-react';
import './Stafflogin.css'; // ← Your external CSS

const DEMO_STAFF = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  name: ['Rakesh Pandey','Uday Pratap Pandey','Deepak Yadav','Vijay Bahadur','Anchal Mishra','Vinod Singh','Manish Verma','Shivani Pandey','Pratima Pandey','Saroj Pathak','Nidhi Singh','Ramesh Shukla','Sanu Prasad','Dinesh Giri','Jyoti Pandey','Akash Tiwari','Gauri Chauhan','Leela Singh','Manoj Dwivedi','Priyanka Sharma','Aarav Kumar','Karan Singh','Neha Gupta','Pooja Verma'][i % 24],
  username: `user${100 + i}`,
  password: `pass${100 + i}`,
  mobile: String(7000000000 + i),
  role: i % 6 === 0 ? 'Admin' : 'Teacher',
  subRole: i % 5 === 0 ? 'Class Teacher' : 'Subject Teacher',
  status: i % 7 === 0 ? 'Blocked' : 'Active',
  lastLogin: `2025-12-${String((i%28)+1).padStart(2,'0')} ${String((i%12)+8).padStart(2,'0')}:${String(i%60).padStart(2,'0')}`,
}));

const getInitials = (name) => name.split(' ').slice(0, 2).map(s => s[0]?.toUpperCase()).join('');
const avatarColors = ['avatar-blue23','avatar-emerald23','avatar-violet23','avatar-amber23','avatar-rose23','avatar-cyan23'];
const getAvatarColor = (name) => avatarColors[name.charCodeAt(0) % 6];

const QuickStats = ({ data }) => {
  const stats = useMemo(() => ({
    total: data.length,
    active: data.filter(s => s.status === 'Active').length,
    blocked: data.filter(s => s.status === 'Blocked').length,
    admins: data.filter(s => s.role === 'Admin').length
  }), [data]);

  return (
    <div className="stats-grid23">
      <div className="stat-card23">
        <div className="stat-icon23 total23"><Users size={20} /></div>
        <div><span className="stat-number23">{stats.total}</span><span className="stat-label23">Total Staff</span></div>
      </div>
      <div className="stat-card23">
        <div className="stat-icon23 active23"><UserCheck size={20} /></div>
        <div><span className="stat-number23">{stats.active}</span><span className="stat-label23">Active</span></div>
      </div>
      <div className="stat-card23">
        <div className="stat-icon23 blocked23"><Ban size={20} /></div>
        <div><span className="stat-number23">{stats.blocked}</span><span className="stat-label23">Blocked</span></div>
      </div>
      <div className="stat-card23">
        <div className="stat-icon23 admin23"><Shield size={20} /></div>
        <div><span className="stat-number23">{stats.admins}</span><span className="stat-label23">Admins</span></div>
      </div>
    </div>
  );
};

const StaffRow = ({ staff, selected, onSelect, onReset, onToggleBlock, onProfile, onShare }) => (
  <tr className={selected ? 'row-selected23' : 'row-hover23'}>
    <td className="cell-checkbox23"><input type="checkbox" checked={selected} onChange={onSelect} /></td>
    <td className="cell-sno23">{staff.id}</td>
    <td className="cell-name23" onClick={onProfile}>
      <div className="name-wrapper23">
        <div className={`avatar-small23 ${getAvatarColor(staff.name)}`}>{getInitials(staff.name)}</div>
        <div>
          <div className="name-text23">{staff.name}</div>
          <div className="last-login23"><Clock size={11} /> {staff.lastLogin}</div>
        </div>
      </div>
    </td>
    <td className="cell-username23"><code>{staff.username}</code></td>
    <td className="cell-mobile23">{staff.mobile}</td>
    <td className="cell-role23"><span className={`badge-role23 ${staff.role === 'Admin' ? 'admin23' : 'teacher23'}`}>{staff.role}</span></td>
    <td className="cell-subrole23">{staff.subRole}</td>
    <td className="cell-status23"><span className={`badge-status23 ${staff.status === 'Active' ? 'active23' : 'blocked23'}`}>{staff.status}</span></td>
    <td className="cell-actions23">
      <div className="action-buttons23">
        <button onClick={onReset} title="Reset Password"><Key size={14} /></button>
        <button onClick={onToggleBlock} className={staff.status === 'Active' ? 'danger23' : 'success23'}><Ban size={14} /></button>
        <button onClick={onProfile}><Eye size={14} /></button>
        <button onClick={onShare}><Share2 size={14} /></button>
      </div>
    </td>
  </tr>
);

const ProfileDrawer = ({ staff, onClose, onReset, onToggleBlock }) => {
  const [showPassword, setShowPassword] = useState(false);
  if (!staff) return null;

  return (
    <>
      <div className="drawer-overlay23" onClick={onClose}></div>
      <div className="drawer23 open23">
        <div className="drawer-header23">
          <h3>Staff Profile</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="drawer-body23">
          <div className="profile-header23">
            <div className={`avatar-large23 ${getAvatarColor(staff.name)}`}>{getInitials(staff.name)}</div>
            <h4>{staff.name}</h4>
            <p>{staff.role} • {staff.subRole}</p>
            <span className={`badge-status23 large23 ${staff.status === 'Active' ? 'active23' : 'blocked23'}`}>{staff.status}</span>
          </div>

          <div className="info-section23">
            <h5>Account Details</h5>
            <div className="info-row23"><span>Username</span><code>{staff.username}</code></div>
            <div className="info-row23"><span>Password</span>
              <div className="password-field23">
                <code>{showPassword ? staff.password : '••••••••'}</code>
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
            <div className="info-row23"><span>Mobile</span><span>{staff.mobile}</span></div>
          </div>

          <div className="info-section23">
            <h5>Login History</h5>
            <div className="login-item23"><Monitor size={14} /><span>{staff.lastLogin}</span><small>Web</small></div>
            <div className="login-item23"><Smartphone size={14} /><span>2025-11-10 09:12</span><small>Mobile</small></div>
          </div>

          <div className="drawer-actions23">
            <button className="btn-primary23" onClick={onReset}><Key size={16} /> Reset Password</button>
            <button className={staff.status === 'Active' ? 'btn-danger23' : 'btn-success23'} onClick={onToggleBlock}>
              <Ban size={16} /> {staff.status === 'Active' ? 'Block' : 'Unblock'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay23" onClick={onClose}>
      <div className="modal23" onClick={e => e.stopPropagation()}>
        <div className="modal-header23">
          <h3>{title}</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function StaffLoginReport() {
  const [query, setQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selected, setSelected] = useState(new Set());
  const [drawer, setDrawer] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetTarget, setResetTarget] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareTarget, setShareTarget] = useState(null);
  const [showBulkShareModal, setShowBulkShareModal] = useState(false);
  const [bulkShareCount, setBulkShareCount] = useState(0);
  const [data, setData] = useState(DEMO_STAFF);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => data.filter(s => {
    if (filterRole !== 'All' && s.role !== filterRole) return false;
    if (filterStatus !== 'All' && s.status !== filterStatus) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return String(s.id).includes(q) || s.name.toLowerCase().includes(q) || 
           s.username.toLowerCase().includes(q) || s.mobile.includes(q);
  }), [data, query, filterRole, filterStatus]);

  const toggleSelect = (id) => {
    const ns = new Set(selected);
    ns.has(id) ? ns.delete(id) : ns.add(id);
    setSelected(ns);
  };

  const toggleSelectAll = () => {
    selected.size === filtered.length ? setSelected(new Set()) : setSelected(new Set(filtered.map(s => s.id)));
  };

  const bulkAction = (action) => {
    if (selected.size === 0) return alert('Select at least one staff');
    if (action === 'block') setData(d => d.map(s => selected.has(s.id) ? { ...s, status: 'Blocked' } : s));
    if (action === 'unblock') setData(d => d.map(s => selected.has(s.id) ? { ...s, status: 'Active' } : s));
    if (action === 'export') {
      const rows = data.filter(s => selected.has(s.id));
      const csv = ['S.No,Name,Username,Mobile,Role,Status', ...rows.map(r => `${r.id},"${r.name}",${r.username},${r.mobile},${r.role},${r.status}`)].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'staff-selected.csv'; a.click();
    }
    if (action === 'share') {
      setBulkShareCount(selected.size);
      setShowBulkShareModal(true);
      return;
    }
    setSelected(new Set());
  };

  const openReset = (staff) => {
    setResetTarget(staff);
    setGeneratedPassword(Math.random().toString(36).slice(-8));
    setShowResetModal(true);
    setCopied(false);
  };

  const confirmReset = () => { setShowResetModal(false); setResetTarget(null); alert('Password reset successfully!'); };
  const copyPassword = () => { navigator.clipboard?.writeText(generatedPassword); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const openShare = (staff) => { setShareTarget(staff); setShowShareModal(true); };
  const confirmShare = () => { setShowShareModal(false); alert(`SMS sent to ${shareTarget?.mobile}!`); setShareTarget(null); };
  const exportExcel = () => {
    const csv = ['S.No,Name,Username,Mobile,Role,Status', ...filtered.map(r => `${r.id},"${r.name}",${r.username},${r.mobile},${r.role},${r.status}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'staff-report.csv'; a.click();
  };

  const toggleBlock = (staff) => {
    setData(d => d.map(s => s.id === staff.id ? { ...s, status: s.status === 'Active' ? 'Blocked' : 'Active' } : s));
    if (drawer?.id === staff.id) setDrawer({ ...staff, status: staff.status === 'Active' ? 'Blocked' : 'Active' });
  };

  return (
    <div className="page-container23">
      <header className="page-header23">
        <div className="header-left23">
          <div className="logo23">SP</div>
          <div>
            <h1>Staff Login Management</h1>
            <p>Saket Public School — Session 2025-2026</p>
          </div>
        </div>
        <div className="header-actions23">
          <button onClick={exportExcel}><Download size={16} /> Export</button>
          <button onClick={() => window.print()}><Printer size={16} /> Print</button>
          <button onClick={() => { setData(DEMO_STAFF); setSelected(new Set()); }}><RefreshCw size={16} /> Refresh</button>
        </div>
      </header>

      <QuickStats data={data} />

      <div className="controls-bar23">
        <div className="search-box23">
          <Search size={18} />
          <input placeholder="Search by name, username, mobile or ID..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div className="filters23">
          <select value={filterRole} onChange={e => setFilterRole(e.target.value)}>
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Teacher">Teacher</option>
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        <div className="bulk-actions23">
          <button className="btn-danger23 small23" onClick={() => bulkAction('block')} disabled={selected.size === 0}><Ban size={14} /> Block</button>
          <button className="btn-success23 small23" onClick={() => bulkAction('unblock')} disabled={selected.size === 0}><UserCheck size={14} /> Unblock</button>
          <button className="btn-ghost23 small23" onClick={() => bulkAction('share')} disabled={selected.size === 0}><Share2 size={14} /> Share</button>
          <button className="btn-ghost23 small23" onClick={() => bulkAction('export')} disabled={selected.size === 0}><Download size={14} /> Export</button>
          {selected.size > 0 && <span className="selected-count23">{selected.size} selected</span>}
        </div>
      </div>

      <div className="table-container23">
        <table className="staff-table23">
          <thead>
            <tr>
              <th><input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleSelectAll} /></th>
              <th>S.No</th>
              <th>Staff Name</th>
              <th>Username</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Sub Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(st => (
              <StaffRow
                key={st.id}
                staff={st}
                selected={selected.has(st.id)}
                onSelect={() => toggleSelect(st.id)}
                onReset={() => openReset(st)}
                onToggleBlock={() => toggleBlock(st)}
                onProfile={() => setDrawer(st)}
                onShare={() => openShare(st)}
              />
            ))}
            {filtered.length === 0 && <tr><td colSpan={9} className="empty-state23">No staff match your filters.</td></tr>}
          </tbody>
        </table>
      </div>

      <ProfileDrawer staff={drawer} onClose={() => setDrawer(null)} onReset={() => drawer && openReset(drawer)} onToggleBlock={() => drawer && toggleBlock(drawer)} />

      <Modal isOpen={showResetModal} title={`Reset Password — ${resetTarget?.name}`} onClose={() => setShowResetModal(false)}>
        <div className="modal-body23">
          <p>Generate a new password for the staff member.</p>
          <div className="password-input23">
            <input value={generatedPassword} onChange={e => setGeneratedPassword(e.target.value)} />
            <button onClick={copyPassword}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copied!' : 'Copy'}</button>
          </div>
        </div>
        <div className="modal-footer23">
          <button onClick={() => setShowResetModal(false)}>Cancel</button>
          <button className="btn-primary23" onClick={confirmReset}>Confirm Reset</button>
        </div>
      </Modal>

      <Modal isOpen={showShareModal} title={`Share Credentials — ${shareTarget?.name}`} onClose={() => setShowShareModal(false)}>
        <div className="modal-body23">
          <p>Send login credentials via SMS to <strong>{shareTarget?.mobile}</strong>?</p>
        </div>
        <div className="modal-footer23">
          <button onClick={() => setShowShareModal(false)}>Cancel</button>
          <button className="btn-primary23" onClick={confirmShare}><Share2 size={16} /> Send SMS</button>
        </div>
      </Modal>

      <Modal isOpen={showBulkShareModal} title="Bulk Share Credentials" onClose={() => setShowBulkShareModal(false)}>
        <div className="modal-body23">
          <p>Send login credentials via SMS to <strong>{bulkShareCount} selected staff members</strong>?</p>
        </div>
        <div className="modal-footer23">
          <button onClick={() => setShowBulkShareModal(false)}>Cancel</button>
          <button className="btn-primary23" onClick={() => { setShowBulkShareModal(false); alert(`Bulk SMS sent to ${bulkShareCount} staff members!`); }}><Share2 size={16} /> Send SMS</button>
        </div>
      </Modal>
    </div>
  );
}