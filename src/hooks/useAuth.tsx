import useSecureStorage from "./useSecureStorage";

type userAuthProps = {
    adminGuard?: boolean,
}

const useAuth = ({adminGuard = true} : userAuthProps) : boolean => 
{   
    const { get } = useSecureStorage();
    const token = get('auth-token');
    const expiresAt = localStorage.getItem('expiresAt');

    if (adminGuard) {
        const authType = get('auth-type');
        if (authType !== 'admin') {
            return false;
        }
    }

    if (!token || !expiresAt) {
        return false;
    }

    const isExpired = new Date().getTime() > parseInt(expiresAt);
   
    return !isExpired;
}

export default useAuth;


