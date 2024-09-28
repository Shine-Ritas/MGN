import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { UserAppDispatch, UserRootState } from './stores/userStore'
import { AdminAppDispatch, AdminRootState } from './stores/adminStore'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AdminAppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AdminRootState > = useSelector

export const useUserAppDispatch: () => UserAppDispatch = useDispatch;
export const useUserAppSelector: TypedUseSelectorHook<UserRootState> = useSelector;