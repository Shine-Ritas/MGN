import { Banner } from '@/pages/admin/Settings/Banner/type';

export interface User {
  id: string;
  name: string;
  email: string;
  user_code: string;
  role: string;
  active: number;
  subscription_end_date?: string;
  subscription_name?: string;
}

export interface UserGlobal {
  isAuth: boolean;
  user: null | User;
  safeContent: boolean;
  subscription?: boolean;
  banners: Banner[];
  is_maintenance?: boolean;
  favorite: string[];
  continueReading: string[];
}
