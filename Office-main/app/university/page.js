'use client';

import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Nav, Tab, Badge, Modal } from 'react-bootstrap';
import { 
  FaUser, FaEnvelope, FaCalendar, FaChartLine, FaUsers, 
  FaBuilding, FaBook, FaTasks, FaComments, FaFileAlt, 
  FaUserPlus, FaSearch, FaFilter, FaDownload, FaUpload, FaVideo,
  FaSms, FaGoogle, FaHistory, FaClock, FaMapMarkerAlt, FaLink, FaHome, FaRobot,
  FaCloud, FaCog, FaChartBar, FaCircle, FaPlus, FaTimes, FaCoffee, FaRestroom, FaUtensils, FaGraduationCap,
  FaGoogleDrive, FaFolder, FaStar, FaEllipsisV, FaHashtag, FaPaperPlane,
  FaFileExcel, FaFilePowerpoint, FaFilePdf, FaFileWord, FaUserFriends,
  FaSignOutAlt, FaBell, FaUserCircle, FaCamera, FaShieldAlt, FaKey, FaVolumeUp,
  FaDesktop, FaMobile, FaTablet, FaBellSlash, FaUserShield, FaUserCog,
  FaEdit, FaPalette, FaTrash, FaExchangeAlt, FaBookReader, FaChalkboardTeacher,
  FaMicroscope, FaFlask, FaCalculator, FaLaptopCode, FaLanguage, FaMusic,
  FaPaintBrush, FaDumbbell, FaTheaterMasks, FaHandshake, FaNewspaper, FaCheckCircle, FaPlay,
  FaCalendarAlt, FaExclamationCircle, FaChevronLeft, FaChevronRight, FaChevronDown
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Add these helper functions at the top after the imports
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const getCurrentMonthDays = (year, month) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Add the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  return days;
};

// Update the calendar styles
const calendarStyles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
  },
  viewSelector: {
    display: 'flex',
    backgroundColor: '#f5f5f5',
    padding: '4px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  viewButton: {
    flex: '1',
    padding: '10px 20px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#666',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
    '&.active': {
      backgroundColor: '#fff',
      color: '#007bff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderRadius: '6px',
    },
  },
  dayCell: {
    backgroundColor: '#fff',
    minHeight: '100px',
    padding: '8px',
    border: '1px solid #eee',
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#f8f9fa',
    },
  },
  timeSlot: {
    padding: '15px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    alignItems: 'center',
  },
  timeLabel: {
    width: '100px',
    color: '#666',
    fontSize: '14px',
    fontWeight: '500',
  },
};

// Add after the imports
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function UniversityKnowledgeCenter() {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [selectedView, setSelectedView] = useState('daily');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear any stored session data if needed
    localStorage.removeItem('userSession');
    // Redirect to login page
    router.push('/login');
  };

  // Sample data for the dashboard
  const courses = [
    {
      id: 1,
      name: 'Risk and Data Analysis',
      code: 'ONB101',
      instructor: 'Dr. Smith',
      schedule: 'Self-paced',
      room: 'Online',
      credits: 'Pass/Fail',
      modules: 5,
      completedModules: 3
    },
    {
      id: 2,
      name: 'Social Media Marketing',
      code: 'ONB102',
      instructor: 'Prof. Johnson',
      schedule: 'Self-paced',
      room: 'Online',
      credits: 'Pass/Fail',
      modules: 4,
      completedModules: 2
    },
    {
      id: 3,
      name: 'Customer Service & IT Support',
      code: 'ONB103',
      instructor: 'Dr. Williams',
      schedule: 'Self-paced',
      room: 'Online',
      credits: 'Pass/Fail',
      modules: 6,
      completedModules: 4
    }
  ];

  const assignments = [
    {
      id: 1,
      course: 'ONB101',
      title: 'Risk Assessment Module',
      dueDate: '2024-03-20',
      status: 'Completed',
      submitted: true
    },
    {
      id: 2,
      course: 'ONB102',
      title: 'Social Media Strategy',
      dueDate: '2024-03-22',
      status: 'Completed',
      submitted: true
    },
    {
      id: 3,
      course: 'ONB103',
      title: 'IT Support Basics',
      dueDate: '2024-03-25',
      status: 'Pending',
      submitted: false
    }
  ];

  const grades = [
    {
      course: 'ONB101',
      status: 'In Progress',
      modulesCompleted: '3/5',
      overallStatus: 'On Track'
    },
    {
      course: 'ONB102',
      status: 'In Progress',
      modulesCompleted: '2/4',
      overallStatus: 'On Track'
    },
    {
      course: 'ONB103',
      status: 'In Progress',
      modulesCompleted: '4/6',
      overallStatus: 'On Track'
    }
  ];

  const schedule = [
    {
      title: 'CS101 Lecture',
      time: '10:00 AM - 11:30 AM',
      location: 'Room 301',
      type: 'Lecture'
    },
    {
      title: 'MATH201 Tutorial',
      time: '2:00 PM - 3:30 PM',
      location: 'Room 405',
      type: 'Tutorial'
    },
    {
      title: 'ENG101 Workshop',
      time: '1:00 PM - 2:30 PM',
      location: 'Room 201',
      type: 'Workshop'
    }
  ];

  const resources = [
    {
      title: 'AI Study Assistant',
      description: 'Get instant help with your studies',
      type: 'AI Tool',
      icon: FaRobot,
      isAI: true
    },
    {
      title: 'My Notes',
      description: 'Create and organize your study notes',
      type: 'Note Taking',
      icon: FaFileWord,
      isNotes: true
    },
    {
      title: 'CS101 Course Materials',
      description: 'Lecture slides and programming exercises',
      type: 'Course Material',
      icon: FaFileAlt
    },
    {
      title: 'MATH201 Formula Sheet',
      description: 'Comprehensive formula reference',
      type: 'Reference',
      icon: FaCalculator
    },
    {
      title: 'ENG101 Writing Guide',
      description: 'Academic writing guidelines',
      type: 'Guide',
      icon: FaBook
    },
    {
      title: 'Study Groups',
      description: 'Connect with classmates for collaborative learning',
      type: 'Collaboration',
      icon: FaUsers
    }
  ];

  const messages = [
    {
      sender: 'Dr. Smith',
      subject: 'Assignment Deadline Extended',
      preview: 'Due to technical issues, the deadline has been extended...',
      time: '2h ago'
    },
    {
      sender: 'Prof. Johnson',
      subject: 'Tutorial Cancellation',
      preview: 'Tomorrow\'s tutorial has been cancelled...',
      time: '4h ago'
    },
    {
      sender: 'Dr. Williams',
      subject: 'Paper Feedback',
      preview: 'Your research paper draft has been reviewed...',
      time: '1d ago'
    }
  ];

  const events = [
    {
      title: 'Career Fair',
      date: '2024-03-30',
      location: 'University Hall',
      type: 'Career'
    },
    {
      title: 'Research Symposium',
      date: '2024-04-05',
      location: 'Science Center',
      type: 'Academic'
    },
    {
      title: 'Student Organization Fair',
      date: '2024-04-10',
      location: 'Student Center',
      type: 'Social'
    }
  ];

  const detailedSchedule = [
    {
      id: 1,
      title: 'Risk and Data Analysis',
      code: 'ONB101',
      instructor: 'Dr. Smith',
      type: 'Lecture',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      location: 'Room 301',
      days: ['Monday', 'Wednesday'],
      assignments: [
        { title: 'Risk Assessment Report', dueDate: '2024-03-20', status: 'pending' },
        { title: 'Data Analysis Project', dueDate: '2024-03-25', status: 'completed' }
      ]
    },
    {
      id: 2,
      title: 'Social Media Marketing',
      code: 'ONB102',
      instructor: 'Prof. Johnson',
      type: 'Workshop',
      startTime: '2:00 PM',
      endTime: '3:30 PM',
      location: 'Room 405',
      days: ['Tuesday', 'Thursday'],
      assignments: [
        { title: 'Marketing Strategy', dueDate: '2024-03-22', status: 'pending' },
        { title: 'Social Media Campaign', dueDate: '2024-03-28', status: 'pending' }
      ]
    },
    {
      id: 3,
      title: 'Customer Service & IT Support',
      code: 'ONB103',
      instructor: 'Dr. Williams',
      type: 'Lab',
      startTime: '1:00 PM',
      endTime: '2:30 PM',
      location: 'Room 201',
      days: ['Friday'],
      assignments: [
        { title: 'IT Support Basics', dueDate: '2024-03-25', status: 'pending' },
        { title: 'Customer Service Case Study', dueDate: '2024-03-30', status: 'pending' }
      ]
    }
  ];

  const handleAssignmentSelect = (assignmentId) => {
    setSelectedAssignments(prev => {
      if (prev.includes(assignmentId)) {
        return prev.filter(id => id !== assignmentId);
      } else {
        return [...prev, assignmentId];
      }
    });
  };

  const handleSubmitAssignments = () => {
    console.log('Submitting assignments:', selectedAssignments);
    setSelectedAssignments([]);
  };

  // Add new state for AI chat and notes
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [showNotes, setShowNotes] = useState(false);

  // Add new functions for handling AI chat and notes
  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory([...chatHistory, { type: 'user', content: chatMessage }]);
      // Simulate AI response
      setTimeout(() => {
        setChatHistory(prev => [...prev, { 
          type: 'ai', 
          content: 'I can help you with your studies. What specific topic would you like assistance with?' 
        }]);
      }, 1000);
      setChatMessage('');
    }
  };

  const handleSaveNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      setNotes([...notes, { ...newNote, id: Date.now(), date: new Date().toLocaleDateString() }]);
      setNewNote({ title: '', content: '' });
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={3} lg={2} className="sidebar">
          <div className="sidebar-header">
            <FaGraduationCap size={24} className="me-2" />
            <h5 className="mb-0">University Knowledge Center</h5>
          </div>
          <Nav className="flex-column">
            <Nav.Link active={activeTab === 'home'} onClick={() => setActiveTab('home')}>
              <FaHome className="me-2" /> Dashboard
            </Nav.Link>
            <Nav.Link active={activeTab === 'courses'} onClick={() => setActiveTab('courses')}>
              <FaBook className="me-2" /> Courses
            </Nav.Link>
            <Nav.Link active={activeTab === 'assignments'} onClick={() => setActiveTab('assignments')}>
              <FaTasks className="me-2" /> Assignments
            </Nav.Link>
            <Nav.Link active={activeTab === 'grades'} onClick={() => setActiveTab('grades')}>
              <FaChartLine className="me-2" /> Grades
            </Nav.Link>
            <Nav.Link active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')}>
              <FaCalendar className="me-2" /> Schedule
            </Nav.Link>
            <Nav.Link active={activeTab === 'resources'} onClick={() => setActiveTab('resources')}>
              <FaFolder className="me-2" /> Resources
            </Nav.Link>
            <Nav.Link active={activeTab === 'messages'} onClick={() => setActiveTab('messages')}>
              <FaComments className="me-2" /> Messages
            </Nav.Link>
            <Nav.Link active={activeTab === 'events'} onClick={() => setActiveTab('events')}>
              <FaCalendar className="me-2" /> Events
            </Nav.Link>
            <Nav.Link active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
              <FaCog className="me-2" /> Settings
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9} lg={10} className="main-content">
          <div className="content-header">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">
                {activeTab === 'home' && 'Dashboard'}
                {activeTab === 'courses' && 'Courses'}
                {activeTab === 'assignments' && 'Assignments'}
                {activeTab === 'grades' && 'Grades'}
                {activeTab === 'schedule' && 'Schedule'}
                {activeTab === 'resources' && 'Resources'}
                {activeTab === 'messages' && 'Messages'}
                {activeTab === 'events' && 'Events'}
                {activeTab === 'settings' && 'Settings'}
              </h4>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="search"
                  placeholder="Search courses, assignments, or resources..."
                  className="me-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-primary" className="me-2">
                  <FaBell className="me-2" /> Notifications
                </Button>
                <div className="profile-dropdown" ref={dropdownRef}>
                  <div 
                    className="profile-header" 
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  >
                    <FaUserCircle className="profile-icon" />
                    <span>My Profile</span>
                    <FaChevronDown className={`dropdown-icon ${showProfileDropdown ? 'rotate' : ''}`} />
                  </div>
                  {showProfileDropdown && (
                    <div className="dropdown-menu">
                      <a href="#" className="dropdown-item">
                        <FaUser className="icon" />
                        <span>Profile Settings</span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <FaCog className="icon" />
                        <span>Preferences</span>
                      </a>
                      <a href="#" className="dropdown-item">
                        <FaShieldAlt className="icon" />
                        <span>Security</span>
                      </a>
                      <div className="dropdown-divider"></div>
                      <a href="#" className="dropdown-item" onClick={handleLogout}>
                        <FaSignOutAlt className="icon" />
                        <span>Logout</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="content-body">
            {/* Dashboard Tab */}
            {activeTab === 'home' && (
              <div>
                {/* Welcome Section */}
                <Card className="mb-4">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="mb-1">Welcome back, Student!</h4>
                        <p className="text-muted mb-0">Here's what's happening in your academic journey today.</p>
                      </div>
                      <div className="text-end">
                        <h5 className="mb-1">Current Semester</h5>
                        <p className="text-muted mb-0">Spring 2024</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Key Statistics */}
                <Row className="mb-4">
                  <Col md={6} lg={3}>
                    <Card className="mb-4">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="card-title text-muted">Current Courses</h6>
                            <h2 className="mb-0">3</h2>
                            <p className="text-muted mb-0">Active courses this semester</p>
                          </div>
                          <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                            <FaBook className="text-primary" size={24} />
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6} lg={3}>
                    <Card className="mb-4">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="card-title text-muted">Pending Assignments</h6>
                            <h2 className="mb-0">3</h2>
                            <p className="text-muted mb-0">Due this week</p>
                          </div>
                          <div className="bg-warning bg-opacity-10 p-3 rounded-circle">
                            <FaTasks className="text-warning" size={24} />
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6} lg={3}>
                    <Card className="mb-4">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="card-title text-muted">Average Grade</h6>
                            <h2 className="mb-0">3.8</h2>
                            <p className="text-muted mb-0">Current GPA</p>
                          </div>
                          <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                            <FaChartLine className="text-success" size={24} />
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6} lg={3}>
                    <Card className="mb-4">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="card-title text-muted">Attendance Rate</h6>
                            <h2 className="mb-0">95%</h2>
                            <p className="text-muted mb-0">This semester</p>
                          </div>
                          <div className="bg-info bg-opacity-10 p-3 rounded-circle">
                            <FaCalendar className="text-info" size={24} />
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Main Content Grid */}
                <Row>
                  {/* Upcoming Events & Schedule */}
                  <Col lg={8}>
                    <Card className="mb-4">
                      <Card.Header className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Today's Schedule</h5>
                        <Button variant="outline-primary" size="sm">View All</Button>
                      </Card.Header>
                      <Card.Body>
                        <div className="schedule-timeline">
                          {schedule.map((event, index) => (
                            <div key={index} className="schedule-item d-flex align-items-center mb-3">
                              <div className="schedule-time me-3">
                                <div className="text-primary fw-bold">{event.time}</div>
                                <div className="text-muted small">{event.type}</div>
                              </div>
                              <div className="schedule-content flex-grow-1">
                                <h6 className="mb-1">{event.title}</h6>
                                <p className="text-muted mb-0">{event.location}</p>
                              </div>
                              <Button variant="outline-primary" size="sm">Join</Button>
                            </div>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>

                    {/* Recent Assignments */}
                    <Card className="mb-4">
                      <Card.Header className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Recent Assignments</h5>
                        <Button variant="outline-primary" size="sm">View All</Button>
                      </Card.Header>
                      <Card.Body>
                        <div className="assignments-list">
                          {assignments.map((assignment, index) => (
                            <div key={index} className="assignment-item d-flex align-items-center mb-3 p-3 bg-light rounded">
                              <div className="assignment-icon me-3">
                                <FaFileAlt className="text-primary" size={24} />
                              </div>
                              <div className="assignment-content flex-grow-1">
                                <h6 className="mb-1">{assignment.title}</h6>
                                <p className="text-muted mb-0">Due: {assignment.dueDate}</p>
                              </div>
                              <Badge bg={assignment.status === 'Completed' ? 'success' : 'warning'}>
                                {assignment.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* News & Updates */}
                  <Col lg={4}>
                    <Card className="mb-4">
                      <Card.Header>
                        <h5 className="mb-0">University News</h5>
                      </Card.Header>
                      <Card.Body>
                        <div className="news-list">
                          <div className="news-item mb-3">
                            <div className="d-flex align-items-center mb-2">
                              <FaNewspaper className="text-primary me-2" />
                              <h6 className="mb-0">Spring Registration Open</h6>
                            </div>
                            <p className="text-muted small mb-0">Registration for Spring 2024 semester is now open. Don't forget to meet with your academic advisor.</p>
                          </div>
                          <div className="news-item mb-3">
                            <div className="d-flex align-items-center mb-2">
                              <FaGraduationCap className="text-success me-2" />
                              <h6 className="mb-0">Career Fair 2024</h6>
                            </div>
                            <p className="text-muted small mb-0">Join us for the annual Career Fair on March 30th. Over 100 companies will be recruiting.</p>
                          </div>
                          <div className="news-item">
                            <div className="d-flex align-items-center mb-2">
                              <FaMicroscope className="text-info me-2" />
                              <h6 className="mb-0">Research Symposium</h6>
                            </div>
                            <p className="text-muted small mb-0">Submit your research proposals for the upcoming symposium. Deadline: April 1st.</p>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                      <Card.Header>
                        <h5 className="mb-0">Quick Actions</h5>
                      </Card.Header>
                      <Card.Body>
                        <div className="d-grid gap-2">
                          <Button variant="outline-primary" className="d-flex align-items-center justify-content-center">
                            <FaUpload className="me-2" /> Submit Assignment
                          </Button>
                          <Button variant="outline-primary" className="d-flex align-items-center justify-content-center">
                            <FaCalendar className="me-2" /> Schedule Meeting
                          </Button>
                          <Button variant="outline-primary" className="d-flex align-items-center justify-content-center">
                            <FaComments className="me-2" /> Contact Professor
                          </Button>
                          <Button variant="outline-primary" className="d-flex align-items-center justify-content-center">
                            <FaFileAlt className="me-2" /> View Transcript
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                {/* Course Overview */}
                <Card className="mb-4">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h5 className="mb-1">My Courses</h5>
                        <p className="text-muted mb-0">Spring 2024 Semester</p>
                      </div>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary">
                          <FaSearch className="me-2" /> Search Courses
                        </Button>
                        <Button variant="primary">
                          <FaPlus className="me-2" /> Add Course
                        </Button>
                      </div>
                    </div>

                    {/* Course Progress Overview */}
                    <Row className="mb-4">
                      <Col md={3}>
                        <div className="text-center p-3 bg-light rounded">
                          <h3 className="mb-1">3</h3>
                          <p className="text-muted mb-0">Active Courses</p>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="text-center p-3 bg-light rounded">
                          <h3 className="mb-1">12</h3>
                          <p className="text-muted mb-0">Total Credits</p>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="text-center p-3 bg-light rounded">
                          <h3 className="mb-1">85%</h3>
                          <p className="text-muted mb-0">Average Attendance</p>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="text-center p-3 bg-light rounded">
                          <h3 className="mb-1">3.8</h3>
                          <p className="text-muted mb-0">Current GPA</p>
                        </div>
                      </Col>
                    </Row>

                    {/* Course Cards */}
                    <Row>
                      {courses.map((course) => (
                        <Col md={6} lg={4} key={course.id}>
                          <Card className="mb-4 course-card">
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                  <h5 className="card-title mb-1">{course.name}</h5>
                                  <p className="text-muted mb-0">Code: {course.code}</p>
                                </div>
                                <Badge bg="primary">{course.credits} credits</Badge>
                              </div>
                              
                              <div className="course-info mb-3">
                                <div className="d-flex align-items-center mb-2">
                                  <FaChalkboardTeacher className="text-primary me-2" />
                                  <span>{course.instructor}</span>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                  <FaCalendar className="text-primary me-2" />
                                  <span>{course.schedule}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <FaMapMarkerAlt className="text-primary me-2" />
                                  <span>{course.room}</span>
                                </div>
                              </div>

                              {/* Course Progress */}
                              <div className="mb-3">
                                <div className="d-flex justify-content-between mb-1">
                                  <small>Course Progress</small>
                                  <small>75%</small>
                                </div>
                                <div className="progress">
                                  <div className="progress-bar" role="progressbar" style={{ width: '75%' }}></div>
                                </div>
                              </div>

                              {/* Course Actions */}
                              <div className="d-grid gap-2">
                                <Button variant="outline-primary" className="d-flex align-items-center justify-content-center">
                                  <FaVideo className="me-2" /> Resume
                                </Button>
                                <Button variant="outline-primary" className="d-flex align-items-center justify-content-center">
                                  <FaTasks className="me-2" /> Assignments
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>

                    {/* Course Materials Section */}
                    <Card className="mb-4">
                      <Card.Header className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Course Materials</h5>
                        <Button variant="outline-primary" size="sm">
                          <FaDownload className="me-2" /> Download All
                        </Button>
                      </Card.Header>
                      <Card.Body>
                        <div className="course-materials">
                          {courses.map((course) => (
                            <div key={course.id} className="mb-4">
                              <h6 className="mb-3">{course.name} Materials</h6>
                              <div className="row g-3">
                                <Col md={4}>
                                  <div className="p-3 bg-light rounded d-flex align-items-center">
                                    <FaFileWord className="text-primary me-2" />
                                    <div>
                                      <div className="fw-bold">Quizzes</div>
                                      <small className="text-muted">Week 1-5</small>
                                    </div>
                                  </div>
                                </Col>
                                <Col md={4}>
                                  <div className="p-3 bg-light rounded d-flex align-items-center">
                                    <FaFilePdf className="text-danger me-2" />
                                    <div>
                                      <div className="fw-bold">Book</div>
                                      <small className="text-muted">Chapters 1-3</small>
                                    </div>
                                  </div>
                                </Col>
                                <Col md={4}>
                                  <div className="p-3 bg-light rounded d-flex align-items-center">
                                    <FaFilePowerpoint className="text-warning me-2" />
                                    <div>
                                      <div className="fw-bold">Videos</div>
                                      <small className="text-muted">Modules 1-10</small>
                                    </div>
                                  </div>
                                </Col>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>

                    {/* Learning Resources */}
                    <Card>
                      <Card.Header className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Learning Resources</h5>
                        <Button variant="outline-primary" size="sm">
                          <FaPlus className="me-2" /> Add Resource
                        </Button>
                      </Card.Header>
                      <Card.Body>
                        <div className="learning-resources">
                          <Row>
                            <Col md={6} lg={4}>
                              <div className="p-3 bg-light rounded mb-3">
                                <div className="d-flex align-items-center mb-2">
                                  <FaBook className="text-primary me-2" />
                                  <h6 className="mb-0">Textbooks</h6>
                                </div>
                                <p className="text-muted small mb-0">Access digital textbooks and study guides</p>
                              </div>
                            </Col>
                            <Col md={6} lg={4}>
                              <div className="p-3 bg-light rounded mb-3">
                                <div className="d-flex align-items-center mb-2">
                                  <FaVideo className="text-primary me-2" />
                                  <h6 className="mb-0">Video Lectures</h6>
                                </div>
                                <p className="text-muted small mb-0">Recorded lectures and tutorials</p>
                              </div>
                            </Col>
                            <Col md={6} lg={4}>
                              <div className="p-3 bg-light rounded mb-3">
                                <div className="d-flex align-items-center mb-2">
                                  <FaMicroscope className="text-primary me-2" />
                                  <h6 className="mb-0">Practice Problems</h6>
                                </div>
                                <p className="text-muted small mb-0">Interactive exercises and quizzes</p>
                              </div>
                            </Col>
                            <Col md={6} lg={4}>
                              <div className="p-3 bg-light rounded mb-3">
                                <div className="d-flex align-items-center mb-2">
                                  <FaComments className="text-primary me-2" />
                                  <h6 className="mb-0">Discussion Forums</h6>
                                </div>
                                <p className="text-muted small mb-0">Connect with classmates and instructors</p>
                              </div>
                            </Col>
                            <Col md={6} lg={4}>
                              <div className="p-3 bg-light rounded mb-3">
                                <div className="d-flex align-items-center mb-2">
                                  <FaCalculator className="text-primary me-2" />
                                  <h6 className="mb-0">Study Tools</h6>
                                </div>
                                <p className="text-muted small mb-0">Calculators and study aids</p>
                              </div>
                            </Col>
                            <Col md={6} lg={4}>
                              <div className="p-3 bg-light rounded mb-3">
                                <div className="d-flex align-items-center mb-2">
                                  <FaGoogleDrive className="text-primary me-2" />
                                  <h6 className="mb-0">Shared Resources</h6>
                                </div>
                                <p className="text-muted small mb-0">Access shared study materials</p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Card.Body>
                    </Card>
                  </Card.Body>
                </Card>
              </div>
            )}

            {/* Assignments Tab */}
            {activeTab === 'assignments' && (
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Required Modules</h5>
                    <Button 
                      variant="primary" 
                      disabled={selectedAssignments.length === 0}
                      onClick={handleSubmitAssignments}
                    >
                      <FaUpload className="me-2" /> Submit Assignment
                    </Button>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th style={{ width: '40px' }}>
                          <Form.Check
                            type="checkbox"
                            checked={selectedAssignments.length === assignments.length}
                            onChange={() => {
                              if (selectedAssignments.length === assignments.length) {
                                setSelectedAssignments([]);
                              } else {
                                setSelectedAssignments(assignments.map(a => a.id));
                              }
                            }}
                          />
                        </th>
                        <th>Course</th>
                        <th>Title</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignments.map((assignment) => (
                        <tr key={assignment.id}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={selectedAssignments.includes(assignment.id)}
                              onChange={() => handleAssignmentSelect(assignment.id)}
                            />
                          </td>
                          <td>{assignment.course}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {assignment.submitted && (
                                <FaCheckCircle className="text-success me-2" />
                              )}
                              {assignment.title}
                            </div>
                          </td>
                          <td>{assignment.dueDate}</td>
                          <td>
                            <Badge bg={assignment.status === 'Completed' ? 'success' : 'warning'}>
                              {assignment.status}
                            </Badge>
                          </td>
                          <td>
                            <Button variant="outline-primary" size="sm">
                              <FaPlay className="me-1" /> Launch
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            )}

            {/* Grades Tab */}
            {activeTab === 'grades' && (
              <Card>
                <Card.Body>
                  <h5 className="mb-4">Onboarding Progress</h5>
                  <Row>
                    <Col md={6}>
                      <Card className="mb-4">
                        <Card.Body>
                          <h6 className="card-title">Overall Progress</h6>
                          <h2 className="mb-0">75%</h2>
                          <p className="text-muted mb-0">Modules Completed</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="mb-4">
                        <Card.Body>
                          <h6 className="card-title">Required Modules</h6>
                          <h2 className="mb-0">15</h2>
                          <p className="text-muted mb-0">Out of 20 total modules</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Status</th>
                        <th>Modules Completed</th>
                        <th>Overall Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((grade, index) => (
                        <tr key={index}>
                          <td>{grade.course}</td>
                          <td>
                            <Badge bg={grade.status === 'Completed' ? 'success' : 'warning'}>
                              {grade.status}
                            </Badge>
                          </td>
                          <td>{grade.modulesCompleted}</td>
                          <td>
                            <Badge bg={grade.overallStatus === 'On Track' ? 'info' : 'warning'}>
                              {grade.overallStatus}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            )}

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div className="calendar-container bg-white rounded shadow-sm">
                {/* Calendar Header */}
                <div className="p-4 border-bottom">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                      <h4 className="mb-0 me-4">Academic Calendar</h4>
                      <div className="d-flex align-items-center gap-2">
                        <Form.Select
                          value={selectedMonth}
                          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                          className="w-auto"
                        >
                          {months.map((month, index) => (
                            <option key={month} value={index}>{month}</option>
                          ))}
                        </Form.Select>
                        <Form.Select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                          className="w-auto"
                        >
                          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </Form.Select>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <Button variant="outline-primary" size="sm" onClick={() => {
                        setSelectedMonth(new Date().getMonth());
                        setSelectedYear(new Date().getFullYear());
                      }}>Today</Button>
                    </div>
                  </div>

                  {/* View Selector */}
                  <div className="d-flex bg-light rounded-pill p-1">
                    {['Daily', 'Weekly', 'Monthly'].map((view) => (
                      <button
                        key={view}
                        className={`btn flex-grow-1 rounded-pill ${selectedView === view.toLowerCase() ? 'btn-primary' : ''}`}
                        onClick={() => setSelectedView(view.toLowerCase())}
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calendar Body */}
                <div className="p-4">
                  {/* Daily View */}
                  {selectedView === 'daily' && (
                    <div className="daily-schedule">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">
                          {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </h5>
                        <Badge bg="primary">Today</Badge>
                      </div>
                      
                      {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time, index) => {
                        const event = schedule.find(e => e.time.includes(time));
                        return (
                          <div key={index} className="time-slot mb-2 d-flex align-items-stretch">
                            <div className="time-label p-3 bg-light text-center" style={{ width: '120px' }}>
                              <small className="text-muted fw-bold">{time}</small>
                            </div>
                            <div className="flex-grow-1 ps-3">
                              {event ? (
                                <div className="event-card h-100 p-3 rounded" style={{
                                  backgroundColor: '#f8f9fa',
                                  borderLeft: '4px solid #007bff'
                                }}>
                                  <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                      <h6 className="mb-1">{event.title}</h6>
                                      <div className="d-flex align-items-center text-muted">
                                        <FaMapMarkerAlt size={12} className="me-2" />
                                        <small>{event.location}</small>
                                      </div>
                                    </div>
                                    <Badge bg="primary">{event.type}</Badge>
                                  </div>
                                </div>
                              ) : (
                                <div className="empty-slot h-100 p-3 rounded bg-light">
                                  <small className="text-muted">No events scheduled</small>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Weekly View */}
                  {selectedView === 'weekly' && (
                    <div className="weekly-schedule">
                      <div className="week-grid border rounded">
                        <div className="d-flex border-bottom">
                          <div style={{ width: '120px' }}></div>
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                            <div key={day} className="flex-grow-1 p-3 text-center border-start">
                              <div className="fw-bold">{day}</div>
                              <small className="text-muted">Mar 18</small>
                            </div>
                          ))}
                        </div>
                        
                        {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map(time => (
                          <div key={time} className="d-flex border-bottom">
                            <div className="p-3 bg-light text-center" style={{ width: '120px' }}>
                              <small className="text-muted fw-bold">{time}</small>
                            </div>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
                              const event = schedule.find(e => e.time.includes(time));
                              return (
                                <div key={`${day}-${time}`} className="flex-grow-1 p-2 border-start">
                                  {event && day === 'Monday' && (
                                    <div className="event-card p-2 rounded" style={{
                                      backgroundColor: '#f8f9fa',
                                      borderLeft: '3px solid #007bff'
                                    }}>
                                      <small className="fw-bold d-block">{event.title}</small>
                                      <small className="text-muted">{event.location}</small>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Monthly View */}
                  {selectedView === 'monthly' && (
                    <div className="monthly-schedule">
                      <div className="month-grid border rounded">
                        <div className="d-flex border-bottom bg-light">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="flex-grow-1 p-3 text-center">
                              <span className="fw-bold">{day}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="d-flex flex-wrap">
                          {Array.from({ length: getFirstDayOfMonth(selectedYear, selectedMonth) }).map((_, i) => (
                            <div key={`empty-${i}`} className="day-cell" style={{ width: 'calc(100% / 7)', minHeight: '120px' }}></div>
                          ))}
                          {Array.from({ length: getDaysInMonth(selectedYear, selectedMonth) }).map((_, i) => {
                            const day = i + 1;
                            const isToday = day === new Date().getDate() && 
                                           selectedMonth === new Date().getMonth() && 
                                           selectedYear === new Date().getFullYear();
                            return (
                              <div 
                                key={day}
                                className={`day-cell p-3 border ${isToday ? 'bg-light' : ''}`}
                                style={{ width: 'calc(100% / 7)', minHeight: '120px' }}
                              >
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <span className={`fw-bold ${isToday ? 'text-primary' : ''}`}>{day}</span>
                                  {isToday && <Badge bg="primary">Today</Badge>}
                                </div>
                                {day === 15 && (
                                  <div className="event-card p-2 rounded mb-1" style={{
                                    backgroundColor: '#e8f5e9',
                                    borderLeft: '3px solid #2e7d32'
                                  }}>
                                    <small className="fw-bold d-block">CS101 Lecture</small>
                                    <small className="text-muted">10:00 AM</small>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upcoming Events Sidebar */}
                <div className="border-top p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Upcoming Events</h6>
                    <Button variant="primary" size="sm">
                      <FaPlus className="me-2" /> Add Event
                    </Button>
                  </div>
                  <div className="upcoming-events">
                    {schedule.map((event, index) => (
                      <div 
                        key={index} 
                        className="event-card p-3 mb-2 rounded" 
                        style={{ 
                          backgroundColor: '#f8f9fa',
                          borderLeft: '3px solid #007bff'
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">{event.title}</h6>
                            <small className="text-muted d-block">{event.time}</small>
                            <small className="text-muted d-block">
                              <FaMapMarkerAlt className="me-1" size={12} />
                              {event.location}
                            </small>
                          </div>
                          <Badge bg="primary">{event.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div>
                {/* AI Chat and Notes Section */}
                <Row className="mb-4">
                  {/* AI Chat Section */}
                  <Col md={6}>
                    <Card className="h-100">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <h5 className="mb-1">
                              <FaRobot className="me-2 text-primary" /> AI Study Assistant
                            </h5>
                            <p className="text-muted mb-0">Get instant help with your studies</p>
                          </div>
                        </div>
                        
                        {/* Chat History */}
                        <div className="chat-container mb-3" style={{ height: '400px', overflowY: 'auto', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '1rem' }}>
                          {chatHistory.map((message, index) => (
                            <div key={index} className={`mb-3 ${message.type === 'user' ? 'text-end' : ''}`}>
                              <div className={`d-inline-block p-3 rounded ${
                                message.type === 'user' ? 'bg-primary text-white' : 'bg-white'
                              }`}>
                                {message.content}
                              </div>
                            </div>
                          ))}
                          {chatHistory.length === 0 && (
                            <div className="text-center text-muted py-5">
                              <FaRobot className="mb-3" size={48} />
                              <h6>Start a conversation with your AI assistant</h6>
                              <p className="mb-0">Ask questions about your studies, assignments, or course materials</p>
                            </div>
                          )}
                        </div>

                        {/* Chat Input */}
                        <div className="chat-input">
                          <Form.Control
                            type="text"
                            placeholder="Ask your question..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="mb-2"
                          />
                          <Button 
                            variant="primary" 
                            className="w-100"
                            onClick={handleSendMessage}
                          >
                            Send Message
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* Notes Section */}
                  <Col md={6}>
                    <Card className="h-100">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <h5 className="mb-1">
                              <FaFileWord className="me-2 text-primary" /> My Notes
                            </h5>
                            <p className="text-muted mb-0">Create and organize your study notes</p>
                          </div>
                        </div>

                        {/* Note Input */}
                        <div className="note-input mb-4">
                          <Form>
                            <Form.Group className="mb-2">
                              <Form.Control
                                type="text"
                                value={newNote.title}
                                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                placeholder="Note title"
                              />
                            </Form.Group>
                            <Form.Group className="mb-2">
                              <Form.Control
                                as="textarea"
                                rows={3}
                                value={newNote.content}
                                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                placeholder="Write your note here..."
                              />
                            </Form.Group>
                            <Button variant="primary" onClick={handleSaveNote} className="w-100">
                              Save Note
                            </Button>
                          </Form>
                        </div>

                        {/* Notes Grid */}
                        <div className="notes-grid" style={{ height: '400px', overflowY: 'auto' }}>
                          <h6 className="mb-3">Your Notes</h6>
                          <Row>
                            {notes.length > 0 ? (
                              notes.map((note) => (
                                <Col md={12} key={note.id}>
                                  <Card className="mb-3">
                                    <Card.Body>
                                      <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                          <h6 className="mb-1">{note.title}</h6>
                                          <p className="mb-1 text-truncate">{note.content}</p>
                                          <small className="text-muted">Created: {note.date}</small>
                                        </div>
                                        <div className="dropdown">
                                          <Button variant="link" className="p-0" onClick={() => {}}>
                                            <FaEllipsisV />
                                          </Button>
                                          <div className="dropdown-menu">
                                            <a className="dropdown-item" href="#" onClick={() => {}}>
                                              <FaEdit className="me-2" /> Edit
                                            </a>
                                            <a className="dropdown-item text-danger" href="#" onClick={() => {}}>
                                              <FaTrash className="me-2" /> Delete
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </Col>
                              ))
                            ) : (
                              <Col>
                                <div className="text-center py-5">
                                  <FaFileWord className="text-muted mb-3" size={48} />
                                  <h6 className="text-muted">No notes yet</h6>
                                  <p className="text-muted mb-0">Start writing your first note above</p>
                                </div>
                              </Col>
                            )}
                          </Row>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Other Resources */}
                <Card>
                  <Card.Body>
                    <h5 className="mb-4">Other Resources</h5>
                    <Row>
                      {resources.filter(resource => !resource.isAI && !resource.isNotes).map((resource, index) => (
                        <Col md={6} lg={4} key={index}>
                          <Card className="mb-4">
                            <Card.Body>
                              <div className="d-flex align-items-center mb-3">
                                <resource.icon className="text-primary me-2" size={24} />
                                <h5 className="card-title mb-0">{resource.title}</h5>
                              </div>
                              <p className="card-text">{resource.description}</p>
                              <div className="d-flex justify-content-between align-items-center">
                                <Badge bg="info">{resource.type}</Badge>
                                <Button variant="outline-primary" size="sm">Access</Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Messages</h5>
                    <Button variant="primary">
                      <FaPlus className="me-2" /> New Message
                    </Button>
                  </div>
                  <div className="messages-list">
                    {messages.map((message, index) => (
                      <Card key={index} className="mb-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1">{message.sender}</h6>
                              <p className="mb-1">{message.subject}</p>
                              <p className="mb-0 text-muted">{message.preview}</p>
                            </div>
                            <small className="text-muted">{message.time}</small>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Upcoming Events</h5>
                    <Button variant="primary">
                      <FaPlus className="me-2" /> Add Event
                    </Button>
                  </div>
                  <div className="events-list">
                    {events.map((event, index) => (
                      <Card key={index} className="mb-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1">{event.title}</h6>
                              <p className="mb-1 text-muted">{event.date}</p>
                              <p className="mb-0 text-muted">{event.location}</p>
                            </div>
                            <Badge bg="primary">{event.type}</Badge>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <Card>
                <Card.Body>
                  <h5 className="mb-4">Account Settings</h5>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Student ID</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Major</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Year</Form.Label>
                      <Form.Select>
                        <option value="">Select Year</option>
                        <option value="1">Freshman</option>
                        <option value="2">Sophomore</option>
                        <option value="3">Junior</option>
                        <option value="4">Senior</option>
                        <option value="5">Graduate</option>
                      </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
} 