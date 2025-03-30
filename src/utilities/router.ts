   
export const route = (route: string, params: Record<string, string | number> = {}): string => {
    let url = route;
    // Replace React-style route parameters (:id)
    Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`:${key}`, String(value));
    });

    return url;
};

export default route;
