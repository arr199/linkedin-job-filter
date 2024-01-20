'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

export default function ReactQueryProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [client] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>

  )
}
