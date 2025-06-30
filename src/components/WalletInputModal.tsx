import React from "react";
import { Address } from "viem";
import { useAccount, useBalance } from "wagmi";
import { useEffect } from "react";
interface FormData {
  walletAddress: Address;
  email: string;
  nftType: string;
  tokenCount: number;
}

interface WalletInputFormProps {
  isOpen: boolean;
  formData: FormData;
  onClose: () => void;
  setFormData: (data: FormData) => void;
  onSubmit: () => void;
}

const NFT_TYPES = [
  { value: "blackNFT", label: "Black Diamond NFT" },
  { value: "greenNFT", label: "Green Diamond NFT" },
  { value: "blueNFT", label: "Blue Diamond NFT" },
  { value: "redNFT", label: "Red Diamond NFT" },
  { value: "flawlessNFT", label: "Flawless Diamond NFT" },
];
export const WalletInputModal: React.FC<WalletInputFormProps> = ({
  isOpen,
  formData,
  onClose,
  setFormData,
  onSubmit,
}) => {
  const isFormValid = () => {
    return (
      formData.email.trim() !== "" &&
      formData.walletAddress.trim() !== "" &&
      formData.nftType.trim() !== "" &&
      formData.tokenCount > 0
    );
  };

  const { isConnected, address } = useAccount();
  const result = useBalance({
    address: address,
    token: "0xbfa362937BFD11eC22a023aBF83B6dF4E5E303d4",
    chainId: 56,
  });
  console.log("Balance = ", result.data);
  useEffect(() => {
    if (isConnected && address) {
      setFormData({
        ...formData,
        walletAddress: address,
        tokenCount: parseFloat(result.data?.formatted ?? ""),
      });
    }
  }, [isConnected, result.isFetched]);
  if (!isOpen) return <></>;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "tokenCount" ? Number(value) : value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Enter Your Details</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handleInputChange}
            placeholder="your@email.com"
            className="w-full px-3 py-2 border rounded bg-gray-700 border-gray-600"
          />
        </div>

        {/* Wallet Address Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Wallet Address
          </label>
          <input
            type="text"
            name="walletAddress"
            value={formData.walletAddress}
            onChange={handleInputChange}
            placeholder="0x..."
            className="w-full px-3 py-2 border rounded bg-gray-700 border-gray-600"
          />
        </div>

        {/* NFT Type Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">NFT Type</label>
          <select
            name="nftType"
            value={formData.nftType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded bg-gray-700 border-gray-600"
          >
            <option value="">Select an NFT Type</option>
            {NFT_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Token Count Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Number of Tokens
          </label>
          <input
            type="number"
            name="tokenCount"
            value={formData.tokenCount}
            onChange={handleInputChange}
            min="0"
            placeholder="0"
            className="w-full px-3 py-2 border rounded bg-gray-700 border-gray-600"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (isFormValid()) {
                onSubmit();
              } else {
                alert("Please fill all required fields correctly.");
              }
            }}
            disabled={!isFormValid()}
            className={`px-4 py-2 text-sm text-white rounded ${isFormValid() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 cursor-not-allowed"
              }`}
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};
