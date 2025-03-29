import React from 'react';
import { ConnectKitButton } from 'connectkit';
const Header: React.FC = () => {
  

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Diamond Club Membership Reward</div>
        <ConnectKitButton/>
      </div>
    </header>
  );
};

export default Header;