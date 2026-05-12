import { useState, useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  AppBar, Box, CssBaseline, Drawer, IconButton, 
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Toolbar, Typography, Button, useTheme, useMediaQuery, Avatar 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import WorkIcon from '@mui/icons-material/Work';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 280; // slightly wider for modern feel

const PrivateLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Define navigation items based on role
  const navItems = [
    { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, roles: ['student', 'faculty', 'admin', 'hod', 'parent'] },
    { title: 'Mentor Dashboard', path: '/mentor-dashboard', icon: <DashboardIcon />, roles: ['faculty'] },
    { title: 'Allocate Mentors', path: '/mentor-allocation', icon: <DashboardIcon />, roles: ['admin', 'hod'] },
    { title: 'Academics', path: '/academics', icon: <MenuBookIcon />, roles: ['student', 'admin', 'hod', 'parent'] },
    { title: 'My Attendance', path: '/attendance', icon: <FactCheckIcon />, roles: ['student', 'parent'] },
    { title: 'Mark Attendance', path: '/mark-attendance', icon: <FactCheckIcon />, roles: ['faculty', 'admin', 'hod'] },
    { title: 'Internships', path: '/internships', icon: <WorkIcon />, roles: ['student', 'faculty', 'admin', 'hod'] },
    { title: 'Parent Comms', path: '/parent-interactions', icon: <ConnectWithoutContactIcon />, roles: ['faculty', 'admin', 'hod', 'parent'] },
    { title: 'Submit Feedback', path: '/feedback', icon: <FeedbackIcon />, roles: ['student'] },
    { title: 'Feedback Analytics', path: '/feedback-analytics', icon: <AssessmentIcon />, roles: ['admin', 'hod'] },
  ];

  // Filter items available to the current user role
  const visibleItems = navItems.filter(item => item.roles.includes(user?.role));

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0f172a', color: '#f8fafc' }}>
      <Toolbar sx={{ justifyContent: 'center', py: 3, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Typography variant="h5" fontWeight="800" sx={{ background: 'linear-gradient(135deg, #818cf8, #67e8f9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Achievers Hub
        </Typography>
      </Toolbar>
      
      <Box sx={{ px: 3, py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', mb: 2 }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', mb: 2, fontSize: '1.5rem', fontWeight: 'bold' }}>
          {user?.name?.charAt(0) || 'U'}
        </Avatar>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>{user?.name}</Typography>
        <Typography variant="caption" sx={{ 
          textTransform: 'uppercase', 
          bgcolor: 'rgba(79, 70, 229, 0.2)', 
          color: '#818cf8',
          px: 1.5, py: 0.5, borderRadius: 2,
          fontWeight: 600,
          letterSpacing: '0.05em'
        }}>
          {user?.role}
        </Typography>
      </Box>
      
      <List sx={{ flexGrow: 1, px: 2 }}>
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.title} disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                className="smooth-transition"
                sx={{ 
                  borderRadius: 2,
                  py: 1.2,
                  bgcolor: isActive ? 'rgba(79, 70, 229, 0.15)' : 'transparent',
                  color: isActive ? '#818cf8' : '#cbd5e1',
                  borderLeft: isActive ? '4px solid #818cf8' : '4px solid transparent',
                  '&:hover': { 
                    bgcolor: 'rgba(79, 70, 229, 0.1)',
                    color: '#f8fafc'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500, fontSize: '0.95rem' }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Button 
          variant="outlined" 
          fullWidth 
          startIcon={<ExitToAppIcon />}
          onClick={handleLogout}
          sx={{ 
            color: '#cbd5e1', 
            borderColor: 'rgba(255,255,255,0.1)',
            '&:hover': {
              borderColor: '#ef4444',
              color: '#ef4444',
              bgcolor: 'rgba(239, 68, 68, 0.05)'
            }
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      
      {/* App Bar (Glassmorphism) */}
      <AppBar
        position="fixed"
        elevation={0}
        className="glass-navbar"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          color: 'text.primary',
          borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 76 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight="700">
            {visibleItems.find(i => i.path === location.pathname)?.title || 'Dashboard'}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 3, md: 4 }, 
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 9.5 }, // Adjust for the larger app bar
          overflowX: 'hidden'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default PrivateLayout;
