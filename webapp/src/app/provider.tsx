"use client"
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from "next-themes"
const queryClient = new QueryClient()

export default function Provider({ children,
    ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <QueryClientProvider client={queryClient}>
            <NextThemesProvider {...props}>{children}</NextThemesProvider>
        </QueryClientProvider>
    )
}