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
  }); const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>

      <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-white text-sm md:text-xl font-bold">Diamond Club Membership Reward</div>
          <div className='flex items-center gap-4'>
            <ConnectKitButton />
            <button onClick={() => setIsModalOpen(true)} className='text-white text-sm border border-white px-3 py-2 rounded hover:bg-white hover:text-black transition'>
              Don’t have a wallet?
            </button>
          </div>
        </div>
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