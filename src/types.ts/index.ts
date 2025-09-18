export interface Complaint {
  id: number;
  photo: string; // base64 or object URL
  lat: number;
  lng: number;
  description?: string;
  status: "Pending" | "Resolved";
  timestamp: Date;
}

export interface Trainee {
  id: number;
  name: string;
  aadhar: string;
  mobile: string;
  email: string;
  photo: string; // base64 or file URL
  role: "User" | "Employee";
  completed: boolean;
  enrollmentDate: Date;
  completionDate?: Date;
}

export interface User {
  name: string;
  email: string;
  userType: 'user' | 'employee';
  department?: string;
  employeeId?: string;
  joinDate: string;
  avatar: string;
}