export const ADMIN_AUTH_STORAGE_KEY = "starbright_admin_auth";

export const ADMIN_EMAIL = "admin@starbrightproperties.com.ng";
export const ADMIN_PASSWORD = "Master@123";

export const isAdminAuthenticated = () => {
    if (typeof window === "undefined") {
        return false;
    }

    return window.localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === "authenticated";
};

export const setAdminAuthenticated = () => {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, "authenticated");
};

export const clearAdminAuthenticated = () => {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
};
