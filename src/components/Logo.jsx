import React from 'react';
import Image from 'next/image';

function Logo({ height = '100', className = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
      src="/images/NextDoor.png"
      alt="Logo"
      height={height}
      width={height}
      priority 
      />
    </div>
  );
}

export default Logo;