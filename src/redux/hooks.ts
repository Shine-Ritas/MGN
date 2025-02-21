import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { UserAppDispatch, UserRootState } from './stores/userStore'
import { AdminRootState, adminStore } from './stores/adminStore'

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export type AdminAppDispatch = typeof adminStore.dispatch
export const useAppDispatch: () => AdminAppDispatch = useDispatch.withTypes<AdminAppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AdminRootState > = useSelector

export const useUserAppDispatch: () => UserAppDispatch = useDispatch;
export const useUserAppSelector: TypedUseSelectorHook<UserRootState> = useSelector;

export type AppDispatch = AdminAppDispatch | UserAppDispatch;
export type RootState = AdminRootState | UserRootState;
