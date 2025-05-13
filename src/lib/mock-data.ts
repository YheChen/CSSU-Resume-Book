// Mock data for the application

export interface StudentProfile {
  id: string
  name: string
  university: string
  program: string
  year: string
  email: string
  phone?: string
  resumeUrl: string
}

export const mockStudentProfiles: StudentProfile[] = [
  {
    id: "student1",
    name: "Alex Johnson",
    university: "University of Toronto",
    program: "Computer Science",
    year: "3",
    email: "alex.johnson@mail.utoronto.ca",
    phone: "416-555-1234",
    resumeUrl: "#",
  },
  {
    id: "student2",
    name: "Jamie Smith",
    university: "University of Toronto",
    program: "Computer Science (AI)",
    year: "4",
    email: "jamie.smith@mail.utoronto.ca",
    resumeUrl: "#",
  },
  {
    id: "student3",
    name: "Taylor Wong",
    university: "University of Toronto",
    program: "Data Science",
    year: "2",
    email: "taylor.wong@mail.utoronto.ca",
    phone: "647-555-6789",
    resumeUrl: "#",
  },
  {
    id: "student4",
    name: "Jordan Patel",
    university: "University of Toronto",
    program: "Computer Science (Software Engineering)",
    year: "4",
    email: "jordan.patel@mail.utoronto.ca",
    resumeUrl: "#",
  },
  {
    id: "student5",
    name: "Casey Rodriguez",
    university: "University of Toronto",
    program: "Mathematics and Computer Science",
    year: "3",
    email: "casey.rodriguez@mail.utoronto.ca",
    phone: "416-555-9876",
    resumeUrl: "#",
  },
  {
    id: "student6",
    name: "Morgan Lee",
    university: "University of Toronto",
    program: "Computer Science (HCI)",
    year: "2",
    email: "morgan.lee@mail.utoronto.ca",
    resumeUrl: "#",
  },
  {
    id: "student7",
    name: "Riley Chen",
    university: "University of Toronto",
    program: "Cognitive Science",
    year: "3",
    email: "riley.chen@mail.utoronto.ca",
    phone: "647-555-4321",
    resumeUrl: "#",
  },
  {
    id: "student8",
    name: "Sam Nguyen",
    university: "University of Toronto",
    program: "Computer Science (Theory)",
    year: "4",
    email: "sam.nguyen@mail.utoronto.ca",
    resumeUrl: "#",
  },
]

export const mockCurrentUserProfile: StudentProfile = {
  id: "current-user",
  name: "Current User",
  university: "University of Toronto",
  program: "Computer Science",
  year: "3",
  email: "current.user@mail.utoronto.ca",
  phone: "416-555-0000",
  resumeUrl: "#",
}
