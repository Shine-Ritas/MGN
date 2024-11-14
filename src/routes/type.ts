import React from 'react';

// Define the AppRoute interface
interface AppRoute {
    [x: string]: any;
    path?: string,
    element?: React.ReactNode,
    children?: AppRoute[],
    label?: string,
}


type variant = "default" | "destructive" | "outline" | "secondary" | "gold" | "silver" | null | undefined

export type { variant as variantInterface }

// Export the interface with an alias
export type { AppRoute as AppRouteInterface }
