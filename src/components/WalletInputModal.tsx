import React from 'react';
import { Address } from 'viem';

interface WalletInputFormProps {
    isOpen: boolean;
    walletAddress: Address;
    onClose: () => void;
    setWalletAddress: (value: Address) => void;
    onSubmit: () => void;
}

export const WalletInputModal: React.FC<WalletInputFormProps> = ({
    isOpen,
    walletAddress,
    onClose,
    setWalletAddress,
    onSubmit
}) => {
    if (!isOpen) return <></>;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">Enter Wallet Address</h2>
                <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value as Address)}
                    placeholder="0x..."
                    className="w-full px-3 py-2 border rounded mb-4"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-700 hover:text-black"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
