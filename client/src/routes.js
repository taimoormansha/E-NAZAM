
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Students from './views/Students.js';
import Teachers from './views/Teachers';
import Shobajaat from './views/Shobajaat';
import Fees from './views/Fees';
import Donations from './views/Donations';
import Requests from './views/Requests';
import Expenses from './views/Expenses';

import StudentView from "views/StudentView.js";
import Users from './views/Users';
import Course from './views/Courses'
import Scholarship from './views/Scholarship'
import Results from './views/Results'

const dashboardRoutes = [  
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/students",
    name: "Students",
    icon: "nc-icon nc-backpack",
    component: Students,
    layout: "/admin"
  },
  {
    path: "/teachers",
    name: "Teachers",
    icon: "nc-icon nc-single-02",
    component: Teachers,
    layout: "/admin"
  },
   
  {
    path: "/Departments",
    name: "Shobajaat",
    icon: "nc-icon nc-istanbul",
    component: Shobajaat,
    layout: "/admin"
  },
  
  {
    path: "/fees",
    name: "Fees",
    icon: "nc-icon nc-money-coins",
    component: Fees,
    layout: "/admin"
  }, 
  
  {
    path: "/results",
    name: "Results",
    icon: "nc-icon nc-money-coins",
    component: Results,
    layout: "/admin"
  },
 
  {
    path: "/requests",
    name: "Requests",
    icon: "nc-icon nc-email-85",
    component: Requests,
    layout: "/admin"
  },
  {
    path: "/donations",
    name: "Donations",
    icon: "nc-icon nc-money-coins",
    component: Donations,
    layout: "/admin"
  },
  {
    path: "/expenses",
    name: "Expenses",
    icon: "nc-icon nc-notes",
    component: Expenses,
    layout: "/admin"
  },
  
 
 
  {
    path: "/course",
    name: "Courses",
    icon: "nc-icon nc-atom",
    component: Course,
    layout: "/admin"
  },

  {
    path: "/scholarship",
    name: "Scholarships",
    icon: "nc-icon nc-atom",
    component: Scholarship,
    layout: "/admin"
  },
  
  
  {    
    path: "/StudentView/:id",
    name: "Student Details",
    icon: "nc-icon nc-badge",
    component: StudentView,
    layout: "/admin"
  },  
 
  {    
    path: "/users",
    name: "Manage Users",
    icon: "nc-icon nc-single-02",
    component: Users,
    layout: "/admin",
    role: "Super-Admin"
  },
  
  
];

export default dashboardRoutes;
