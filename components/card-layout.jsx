import React from 'react';

// interface CardLayoutProps {
//   children: React.ReactNode;
// }

export function CardLayout({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {children}
    </div>
  );
}