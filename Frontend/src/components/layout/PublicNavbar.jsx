import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const PublicNavbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Features', to: '/#features' },
    { label: 'Resources', to: '/#resources' },
    { label: 'Contact Us', to: '/contact' },
  ];

  return (
    <nav className={`public-navbar${open ? ' open' : ''}`} id="public-navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <SchoolIcon style={{ fontSize: 24 }} />
          </div>
          <span className="brand-text">
            Student Development<br />& Counselling Portal
          </span>
        </Link>

        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={location.pathname === link.to ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <Link to="/login" className="btn-login">
            <PersonOutlineIcon style={{ fontSize: 18 }} />
            Login
          </Link>
          <Link to="/register" className="btn-register">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
