'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/analytics/auth/logout', {
        method: 'POST',
      });

      router.push('/analytics/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
      Logout
    </button>
  );
}
