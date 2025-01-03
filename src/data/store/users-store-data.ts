import { UserGlobal } from '@/types/store/user-store-type'; 
import { EncryptStorage } from '@/utilities/encrypt-storage';
import config from '@/config';

const secretKey = config.secretKey;
const ens_storage = new EncryptStorage(secretKey);
const storedUser = JSON.parse(ens_storage.get('user')!) ?? null;
const hasSubscription = storedUser?.subscription_end_date && new Date(storedUser.subscription_end_date) > new Date();

const userInitialState: UserGlobal = {
  isAuth: false,
  user: storedUser,
  safeContent: localStorage.getItem('safeContent') !== 'false',
  subscription: hasSubscription,
  banners: [],
  is_maintenance: localStorage.getItem('is_maintenance') === 'true',
  favorite: [],
  continueReading: [],
};

export default userInitialState;
