export type AccessType = 'IT' | 'NON_IT' | 'BANKING' | 'ALL';

export type JobCategory = 'it' | 'non-it' | 'banking';

export type JobStatus = 'Draft' | 'Published' | 'Archived';

export type PaymentStatus = 'Successful' | 'Failed' | 'Pending' | 'Refunded';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  location?: string;
  profile_image?: string;
  status: 'Active' | 'Disabled';
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'SuperAdmin' | 'Editor';
  status: 'Active' | 'Disabled';
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  name: string;
  slug: 'it' | 'non-it' | 'banking' | 'all';
  description: string;
  price: number; // in INR
  access_type: AccessType;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobImage {
  id: string;
  job_id: string;
  image_url: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  is_primary: boolean;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  company_name: string;
  category_id: JobCategory;
  location: string;
  job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  work_mode: 'On-site' | 'Remote' | 'Hybrid';
  salary: string;
  experience: string;
  education: string;
  skills: string[];
  description: string;
  eligibility: string;
  requirements: string;
  additional_information?: string;
  application_url: string;
  deadline: string;
  status: JobStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
  poster_image?: string;
}

export interface Payment {
  id: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
  package_id: string;
  package_name?: string;
  order_id: string;
  payment_id: string;
  amount: number;
  currency: string;
  gateway: string;
  status: PaymentStatus;
  created_at: string;
}

export interface UserAccess {
  id: string;
  user_id: string;
  package_id: string;
  payment_id: string;
  status: 'Active' | 'Expired' | 'Revoked';
  start_date: string;
  expiry_date?: string | null;
  created_at: string;
}

export interface SiteSettings {
  site_name: string;
  logo_url: string;
  site_logo?: string;
  contact_email: string;
  contact_phone: string;
  currency_symbol: string;
  razorpay_key_id?: string;
  price_it: number;
  price_non_it: number;
  price_banking: number;
  price_all: number;
}

export interface DashboardStats {
  total_users: number;
  total_jobs: number;
  jobs_per_category: {
    it: number;
    non_it: number;
    banking: number;
  };
  total_payments: number;
  total_revenue: number;
}

export interface AdminUserView {
  id: string;
  name: string;
  email: string;
  phone?: string;
  signup_date: string;
  status: 'Active' | 'Disabled';
  purchased_packages: string[];
}

export interface AdminPaymentView {
  id: string;
  user_id: string;
  email: string;
  package_name: string;
  amount: number;
  order_id: string;
  payment_id: string;
  status: PaymentStatus;
  gateway: string;
  created_at: string;
}

export interface AccessSummary {
  has_it: boolean;
  has_non_it: boolean;
  has_banking: boolean;
  has_all: boolean;
  unlocked_categories: JobCategory[];
  packages: {
    package_id: string;
    slug: string;
    name: string;
    status: string;
    granted_at: string;
  }[];
}
