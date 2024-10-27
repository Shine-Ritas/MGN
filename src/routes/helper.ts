

export function prefixRoutes<T extends Record<string, any>>(prefix: string, routes: T): T {
    const prefixedRoutes: Record<string, any> = {};

    for (const key in routes) {
        if (routes.hasOwnProperty(key)) {
            const value = routes[key] as any;
            if (typeof value === 'string') {
                prefixedRoutes[key] = prefix + value;
            } else if (typeof value === 'object' && value.to) {
                prefixedRoutes[key] = { ...value, to: prefix + value.to };
            } else {
                prefixedRoutes[key] = value;
            }
        }
    }

    return prefixedRoutes as T;
}

