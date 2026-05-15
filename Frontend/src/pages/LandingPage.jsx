import { Link } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';

// MUI Icons
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SchoolIcon from '@mui/icons-material/School';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import WorkIcon from '@mui/icons-material/Work';
import StarIcon from '@mui/icons-material/Star';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <PublicNavbar />

      {/* ===== HERO SECTION ===== */}
      <section className="landing-hero fade-in-up">
        <div className="hero-inner">
          <div className="hero-content">
            <h1>
              Empowering Students.<br />
              <span className="highlight">Building Better Futures.</span>
            </h1>
            <p className="hero-subtitle">
              A unified platform for student counselling, progress tracking
              and feedback to support holistic development.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn-get-started">
                Get Started <ArrowForwardIcon style={{ fontSize: 18 }} />
              </Link>
              <Link to="/about" className="btn-learn-more">
                Learn More <ArrowForwardIcon style={{ fontSize: 18 }} />
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="/hero-illustration.png"
              alt="Students collaborating on a laptop with educational elements"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="landing-stats fade-in-up fade-in-up-delay-1">
        <div className="stats-inner">
          <div className="stat-card">
            <div className="stat-icon blue">
              <GroupsIcon />
            </div>
            <div>
              <div className="stat-value">1200+</div>
              <div className="stat-label">Students</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">
              <PersonIcon />
            </div>
            <div>
              <div className="stat-value">150+</div>
              <div className="stat-label">Mentors</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon teal">
              <EventAvailableIcon />
            </div>
            <div>
              <div className="stat-value">95%</div>
              <div className="stat-label">Attendance Avg.</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">
              <BarChartIcon />
            </div>
            <div>
              <div className="stat-value">3.45</div>
              <div className="stat-label">Average CGPA</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">
              <ChatBubbleOutlineIcon />
            </div>
            <div>
              <div className="stat-value">850+</div>
              <div className="stat-label">Feedbacks</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORE MODULES ===== */}
      <section className="landing-modules" id="features">
        <div className="modules-inner">
          <h2 className="section-title">Our Core Modules</h2>
          <div className="section-underline"></div>

          <div className="modules-grid">
            {/* Module 1: Student Counselling System */}
            <div className="module-card counselling">
              <div className="module-header">
                <div className="module-header-icon">
                  <PsychologyIcon />
                </div>
                <div className="module-header-text">
                  <h3>1. Student Counselling System</h3>
                  <p>Personalized support for academic and personal growth.</p>
                </div>
              </div>
              <div className="module-features">
                <div className="module-feature">
                  <div className="feature-icon"><AssignmentIndIcon style={{ fontSize: 18 }} /></div>
                  <div className="feature-text">
                    <h4>Mentor Allocation</h4>
                    <p>Allocate mentors based on student needs</p>
                  </div>
                  <ArrowForwardIosIcon className="feature-arrow" style={{ fontSize: 14 }} />
                </div>
                <div className="module-feature">
                  <div className="feature-icon"><SchoolIcon style={{ fontSize: 18 }} /></div>
                  <div className="feature-text">
                    <h4>Academic Progress Monitoring</h4>
                    <p>Track and monitor academic performance</p>
                  </div>
                  <ArrowForwardIosIcon className="feature-arrow" style={{ fontSize: 14 }} />
                </div>
                <div className="module-feature">
                  <div className="feature-icon"><FamilyRestroomIcon style={{ fontSize: 18 }} /></div>
                  <div className="feature-text">
                    <h4>Parent Interaction Records</h4>
                    <p>Maintain records of parent meetings</p>
                  </div>
                  <ArrowForwardIosIcon className="feature-arrow" style={{ fontSize: 14 }} />
                </div>
              </div>
            </div>

            {/* Module 2: Student Progress Tracking */}
            <div className="module-card tracking">
              <div className="module-header">
                <div className="module-header-icon">
                  <TrendingUpIcon />
                </div>
                <div className="module-header-text">
                  <h3>2. Student Progress Tracking</h3>
                  <p>Track academic and co-curricular progress in one place.</p>
                </div>
              </div>
              <div className="module-features">
                <div className="module-feature">
                  <div className="feature-icon"><CheckCircleOutlineIcon style={{ fontSize: 18 }} /></div>
                  <div className="feature-text">
                    <h4>Attendance</h4>
                    <p>Monitor attendance percentage</p>
                  </div>
                  <ArrowForwardIosIcon className="feature-arrow" style={{ fontSize: 14 }} />
                </div>
                <div className="module-feature">
                  <div className="feature-icon"><GradeIcon style={{ fontSize: 18 }} /></div>
                  <div className="feature-text">
                    <h4>CGPA</h4>
                    <p>View semester wise CGPA</p>
                  </div>
                  <ArrowForwardIosIcon className="feature-arrow" style={{ fontSize: 14 }} />
                </div>
                <div className="module-feature">
                  <div className="feature-icon"><ReportProblemIcon style={{ fontSize: 18 }} /></div>
                  <div className="feature-text">
                    <h4>Backlog Subjects</h4>
                    <p>Track and clear backlog subjects</p>
                  </div>
                  <ArrowForwardIosIcon className="feature-arrow" style={{ fontSize: 14 }} />
                </div>
                <div className="module-feature">
                  <div className="feature-icon"><WorkIcon style={{ fontSize: 18 }} /></div>
                  <div className="feature-text">
                    <h4>Internship & Project Tracking</h4>
                    <p>Track internship and project progress</p>
                  </div>
                  <ArrowForwardIosIcon className="feature-arrow" style={{ fontSize: 14 }} />
                </div>
              </div>
            </div>

            {/* Module 3: Feedback System */}
            <div className="module-card feedback">
              <div className="module-header">
                <div className="module-header-icon">
                  <RateReviewIcon />
                </div>
                <div className="module-header-text">
                  <h3>3. Feedback System</h3>
                  <p>Collect feedback to improve teaching and learning.</p>
                </div>
              </div>
              <div className="module-features">
                <div className="module-feature">
                  <div className="feature-icon"><StarIcon style={{ fontSize: 18 }} /></div>
                  <div className="feature-text">
                    <h4>Course Feedback</h4>
                    <p>Share feedback about courses</p>
                  </div>
                  <ArrowForwardIosIcon className="feature-arrow" style={{ fontSize: 14 }} />
                </div>
                <div className="module-feature">
                  <div className="feature-icon"><PeopleAltIcon style={{ fontSize: 18 }} /></div>
                  <div className="feature-text">
                    <h4>Faculty Feedback</h4>
                    <p>Share feedback about faculty</p>
                  </div>
                  <ArrowForwardIosIcon className="feature-arrow" style={{ fontSize: 14 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div>
            <h4>About Us</h4>
            <p>
              Our platform aims to support students through
              counselling, tracking and feedback for overall
              development and success.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/#features">Features</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="#">User Guide</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <div className="contact-item">
              <EmailIcon className="contact-icon" style={{ fontSize: 18 }} />
              <span>support@sdcp.edu.in</span>
            </div>
            <div className="contact-item">
              <PhoneIcon className="contact-icon" style={{ fontSize: 18 }} />
              <span>+91 12345 67890</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Student Development & Counselling Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
