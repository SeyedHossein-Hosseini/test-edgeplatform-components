// ProgressBar.tsx

import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => (
  <div style={{ width: '100%', height: '20px', border: '1px solid #ccc', marginTop: '10px' }}>
    <div
      style={{
        width: `${percentage}%`,
        height: '100%',
        backgroundColor: '#4caf50',
      }}
    />
  </div>
);

export default ProgressBar;