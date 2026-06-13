'use client';

import { useRouter } from 'next/navigation';

export const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <button className="back-btn" onClick={() => router.back()}>
      ← Back
    </button>
  );
};
