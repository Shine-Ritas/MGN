import React from 'react';

// Define the AppRoute interface
interface AppRoute {
    [x: string]: any;
    path?: string,
    element?: React.ReactNode,
    children?: AppRoute[]
}

// Export the interface with an alias
export type { AppRoute as AppRouteInterface }
