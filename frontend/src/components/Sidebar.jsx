import { NavLink } from "react-router-dom";
import { FaBolt, FaHome, FaFileUpload, FaHistory, FaUser, FaTimes } from "react-icons/fa";

const links = [
  { to: "/", label: "Dashboard", icon: <FaHome /> },
  { to: "/upload", label: "Upload Bill", icon: <FaFileUpload /> },
  { to: "/profile", label: "Profile", icon: <FaUser /> },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`w-64 bg-navy text-white min-h-screen flex flex-col fixed top-0 left-0 z-40 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-6 border-b border-navy-border">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-amber/10">
            <FaBolt className="text-amber text-xl bolt-pulse" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight">PowerPulse</h1>
            <p className="text-xs text-slate tracking-wide">AI Energy Monitor</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-300 hover:text-white">
          <FaTimes />
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            onClick={() => {
              if (window.innerWidth < 768) onClose();
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition duration-200 ${
                isActive
                  ? "bg-amber text-navy"
                  : "text-gray-300 hover:bg-navy-light hover:text-white"
              }`
            }
          >
            <span className="text-base">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-5 border-t border-navy-border text-xs text-slate">
        <div className="flex items-center gap-2">
          <FaHistory />
          <span>Last synced 2 min ago</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
