import {
  Users,
  UserRoundCheck,
  ClipboardCheck,
  BookOpenCheck,
  GraduationCap,
  FileText,
  BarChart3,
  CalendarDays,
  CreditCard,
} from "lucide-react";

import "./Modules.css";

const modules = [
  {
    icon: Users,
    title: "Student Management",
    text: "Add, update, search and manage student records from one place.",
  },
  {
    icon: UserRoundCheck,
    title: "Teacher Management",
    text: "Maintain teacher information and provide role-specific access.",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance",
    text: "Mark attendance and allow students to view their attendance records.",
  },
  {
    icon: BookOpenCheck,
    title: "Assignments",
    text: "Create assignments with subjects, courses, descriptions and due dates.",
  },
  {
    icon: GraduationCap,
    title: "Results",
    text: "Enter academic results and help students track their performance.",
  },
  {
    icon: FileText,
    title: "Exams",
    text: "Manage upcoming examinations and keep academic schedules organized.",
  },
  {
    icon: BarChart3,
    title: "Dashboard & Analytics",
    text: "View important academic information through clear dashboard cards and charts.",
  },
  {
    icon: CalendarDays,
    title: "Academic Planning",
    text: "Keep important academic activities and upcoming events visible to users.",
  },
  {
    icon: CreditCard,
    title: "Administrative Operations",
    text: "Keep room for future fee and administrative management features as the system grows.",
  },
];

function Modules() {
  return (
    <div className="modules-page">
      <div className="modules-header">
        <div className="modules-badge">EDUMANAGE MODULES</div>

        <h1>Everything You Need in One Platform</h1>

        <p>
          Explore the modules available in EduManage and understand how each
          part of the system supports administrators, teachers and students.
        </p>
      </div>

      <div className="modules-grid">
        {modules.map(({ icon: Icon, title, text }) => (
          <div className="module-card" key={title}>
            <div className="module-icon">
              <Icon size={23} />
            </div>

            <div>
              <h2>{title}</h2>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Modules;