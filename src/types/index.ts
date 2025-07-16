import { IconType } from "react-icons";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
}

export interface Instructor extends User {
  bio?: string;
  expertise?: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: Instructor;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  price: number;
  originalPrice?: number;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  chapters?: Chapter[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  courseId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  order: number;
  chapterId?: string;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  lectureId: string;
  currentTime: number;
  lastUpdated: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: IconType;
  courses: string;
  slug: string;
}

export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseCategory =
  | "programming"
  | "design"
  | "business"
  | "marketing"
  | "photography"
  | "music";

export interface CourseFormData {
  title: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  price: number;
  thumbnail?: string;
}

export interface ChapterFormData {
  title: string;
  description: string;
  order: number;
}

export interface LessonFormData {
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  order: number;
}
export interface SignupProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToPrivacyPolicy: boolean;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface VerifyEmail {
  otp: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  profileUrl: string;
}

export interface LocationState {
  from?: {
    pathname: string;
  };
}

export interface UserAuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;

  signup: (
    params: SignupProps
  ) => Promise<{ message: string; success: boolean; redirectURL?: string }>;
  verifyEmail: (
    params: VerifyEmail
  ) => Promise<{ message: string; success: boolean; redirectURL?: string }>;
  checkAuth: () => Promise<void>;
  login: (
    params: LoginProps
  ) => Promise<{ message: string; success: boolean; redirectURL?: string }>;
  logout: () => Promise<{ success: boolean; message: string }>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

export interface CartItem {
  id: string; // unique cart entry ID
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  addedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (
    product: Product
  ) => Promise<{ success: boolean; message: string }>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  loadCart: () => Promise<void>;
  getCartItem: (productId: string) => CartItem | undefined;
  isInCart: (productId: string) => boolean;
}
