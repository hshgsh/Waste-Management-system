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
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: 'user' | 'employee';
  department?: string;
  employeeId?: string;
  joinDate: string;
  avatar: string;
  points?: number;
  trainingProgress?: number;
}

export interface Campaign {
  id: number;
  name: string;
  photo: string;
  phone: string;
  description: string;
  userId: number;
  status: 'Pending' | 'Approved' | 'Active' | 'Completed';
  createdAt: Date;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  ecoImpact: string;
  description: string;
  category: string;
  features: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  orderDate: Date;
  trackingId: string;
}

export interface ExploitationComplaint {
  id: number;
  description: string;
  location: string;
  employeeId: number;
  status: 'Pending' | 'Under Review' | 'Resolved';
  createdAt: Date;
}

export interface TrainingModule {
  id: number;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  imageUrl?: string;
  duration: string;
  completed: boolean;
}

export interface Quiz {
  id: number;
  moduleId: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'mcq' | 'descriptive';
  options?: string[];
  correctAnswer?: string;
  userAnswer?: string;
}