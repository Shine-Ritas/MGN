import config from "@/config";
import { EncryptStorage } from "@/utilities/encrypt-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { queryApi } from "../api/queryApi";

const ens_storage = new EncryptStorage(config.secretKey);

export const getServerAdminPermissions = createAsyncThunk(
    "admin-permissions/getServerAdminPermissions",
    async (_, { dispatch }) => {
        try {
            const storedPermissions = ens_storage.get("auth-permissions");
            if (storedPermissions) {
                return JSON.parse(storedPermissions);
            }

            const result = await dispatch(queryApi.endpoints.getData.initiate("/admin/permissions")).unwrap();
            
            const expireTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000;
            ens_storage.set("auth-permissions", JSON.stringify(result?.permissions), expireTime);

            return result?.permissions;
        } catch (error) {
            console.error("Failed to fetch admin permissions:", error);
            throw error;
        }
    }
) ;

export type getServerAdminPermissionsType = typeof getServerAdminPermissions.fulfilled;

const initialState = (() => {
  try {
    return JSON.parse(ens_storage.get("auth-permissions")!) || null;
  } catch {
    return null;
  }
})();

export const adminPermissionSlice = createSlice({
  name: "auth-permissions",
  initialState,
  reducers: {
    setAdminPermissions(state, action) {
      const expireTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000;
      ens_storage.set("auth-permissions", JSON.stringify(action.payload), expireTime);
      ens_storage.set("auht-permissons-role", ens_storage.get("auth_role") ?? "");
      return action.payload;
    },
    removeAdminPermissions() {
      ens_storage.remove("auth-permissions");
      return null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getServerAdminPermissions.fulfilled, (state, action) => {
      return action.payload; // Update state when API call succeeds
    });
  },
});

export const { setAdminPermissions, removeAdminPermissions } = adminPermissionSlice.actions;
export default adminPermissionSlice.reducer;

export const selectAdminPermissions = (state) => state.adminPermissions;
