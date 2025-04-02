'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Force redirect to login page
    router.replace('/login');
  }, []);

  // Show nothing while redirecting
  return null;
} 