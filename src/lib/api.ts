export const apiConfig = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://starbrightproperties.com.ng",
    baseUrl:
        process.env.NEXT_PUBLIC_API_URL ?? "https://starbrightproperties.com.ng/api/v1",
};

export const buildApiUrl = (path: string) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${apiConfig.baseUrl}${normalizedPath}`;
};
