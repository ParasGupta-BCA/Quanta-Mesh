export interface Order {
  id: string;
  customer_name: string;
  email: string;
  app_name: string;
  short_description: string;
  full_description: string | null;
  category: string | null;
  privacy_policy_url: string | null;
  support_url: string | null;
  add_ons: string[] | null;
  status: string;
  total_price: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}
