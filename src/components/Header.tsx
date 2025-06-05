import React, { useState } from 'react';
import { ConnectKitButton } from 'connectkit';
import { Address } from 'viem';
import { WalletInputModal } from './WalletInputModal';

interface FormData {
  walletAddress: Address;
  email: string;
  nftType: string;
  tokenCount: number;
}

const Header: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    walletAddress: '' as Address,
    email: '',
    nftType: '',
    tokenCount: 0
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-white text-sm md:text-xl font-bold">
            Diamond Club Membership Reward
          </div>
          
          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-4'>
            <ConnectKitButton />
            <button 
              onClick={() => setIsModalOpen(true)} 
              className='text-white text-sm border border-white px-3 py-2 rounded hover:bg-white hover:text-black transition'
            >
              I can't connect my wallet!
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 12h.01M12 12h.01M19 12h.01" 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 px-4 py-3 flex flex-col gap-3 items-end">
            <div className="w-full flex justify-end">
              <ConnectKitButton />
            </div>
            <button 
              onClick={() => {
                setIsModalOpen(true);
                setMobileMenuOpen(false);
              }} 
              className='text-white text-sm border border-white px-3 py-2 rounded hover:bg-white hover:text-black transition w-full md:w-auto text-center'
            >
              I can't connect my wallet!
            </button>
          </div>
        )}
      </header>

      <WalletInputModal
        isOpen={isModalOpen}
        formData={formData}
        onClose={() => setIsModalOpen(false)}
        setFormData={setFormData}
        onSubmit={() => { console.log(formData) }}
      />
    </>
  );
};

export default Header;