import Header from "../../components/Header";
import RewardCard from "../../components/RewardCard";
import redNFT from "../../../assets/red.jpeg";
import greenNFT from "../../../assets/green.png";
import blueNFT from "../../../assets/blue.png";
import blackNFT from "../../../assets/black.png";
import flawlessNFT from "../../../assets/flawless.png";
import { WalletInputModal } from "../../components/WalletInputModal";
import {
  RocketOutlined,
  CheckCircleOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Address } from "viem";

const rewards = [
  {
    tokenAmount: "2,500",
    nftReward: "Black Diamond NFT",
    imageUrl: blackNFT,
    tierIndex: 0,
    benefits: [
      "100% staking reward",
      "100% of Community Reward",
      "Exclusive Black Diamond benefits in the jewelry shop.",
    ],
  },
  {
    tokenAmount: "5,000",
    nftReward: "Green Diamond NFT",
    imageUrl: greenNFT,
    tierIndex: 1,
    benefits: [
      "150% of Staking Reward",
      "250% of Community Reward",
      "Exclusive Green Diamond benefits in the jewelry shop.",
    ],
  },
  {
    tokenAmount: "25,000",
    nftReward: "Blue Diamond NFT",
    imageUrl: blueNFT,
    tierIndex: 2,
    benefits: [
      "175% of Staking Reward",
      "1,500% of Community Reward",
      "Exclusive Blue Diamond benefits in the jewelry shop.",
    ],
  },
  {
    tokenAmount: "100,000",
    nftReward: "Red Diamond NFT",
    imageUrl: redNFT,
    tierIndex: 3,
    benefits: [
      "200% of Staking Reward",
      "5,000% of Community Reward",
      "Exclusive Red Diamond benefits in the jewelry shop.",
    ],
  },
  {
    tokenAmount: "By Invitation",
    nftReward: "Flawless Diamond NFT",
    imageUrl: flawlessNFT,
    tierIndex: 4,
    benefits: [
      "300% of Staking Reward",
      "Split of 50% generated fees",
      "Split of 10% of global performance",
      "Exclusive Flawless Diamond benefits in the jewelry shop.",
      "Place in the Diamond Club Founder Circle",
    ],
  },
];

const howItWorksSteps = [
  {
    icon: <RocketOutlined style={{ fontSize: "2rem" }} />,
    title: "Purchase Tokens",
    description:
      "Buy Diamond Tokens through our secure platform or approved exchanges to qualify for rewards.",
  },
  {
    icon: <CheckCircleOutlined style={{ fontSize: "2rem" }} />,
    title: "Connect Wallet",
    description:
      "Click on “Connect wallet” in the top right corner to verify your token holdings.If you do not have a wallet you can connect please click on 'I can't connect my wallet!'  and provide the wallet address where you hold your Diamond Tokens and we will check if you qualify for an NFT reward. ",
  },
  {
    icon: <GiftOutlined style={{ fontSize: "2rem" }} />,
    title: "Claim NFT",
    description:
      "Once verified, choose and claim your exclusive Diamond Club NFT that corresponds to your token level.",
  },
];

export const Home = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    walletAddress: "" as Address,
    email: "",
    nftType: "",
    tokenCount: 0,
  });
  async function sendSms() {
    const data = {
      email: formData.email,
      ditAmount: formData.tokenCount,
      walletAddress: formData.tokenCount,
      nftType: formData.nftType,
    };
    try {
      await axios.post("http://38.242.137.199/send-nft-sms/", data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async function createNFTReward() {
    try {
      const data = {
        wallet_address: formData.walletAddress,
        nft_type: formData.nftType,
        dit_amount: formData.tokenCount,
        email: formData.email,
        reward_sent: false,
      };
      const resp = axios.post("https://ditadmin.duckdns.org/api/nft/", data);
      toast.promise(resp, {
        pending: "Creating NFT reward...",
        success: "NFT reward created successfully!",
        error: "Failed to create NFT reward",
      });
      await resp;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  const handleSubmit = async () => {
    const sucess = (await createNFTReward()) && (await sendSms)();
    // if (sucess) {
    //   toast.success("Submitted sucessfully...");
    // } else {
    //   toast.error("Something went wrong!");
    // }
    setIsWalletModalOpen(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Claim your Membership level
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            At this page you can claim your NFT reward that will open the doors
            to exclusive membership levels in Diamond Club and the Diamond
            Reward program. Your membership level in Diamond Club will give you
            passive residual community reward. To claim your NFT you need to
            purchase a certain number of Diamond Tokens. To learn more about how
            to get the NFT reward you ca
          </p>
          <button
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => setIsWalletModalOpen(true)}
          >
            Claim NFT Reward
          </button>
        </div>

        {/* Rewards Section */}
        <h2 className="text-2xl font-bold mb-8 text-center">Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {rewards.map((reward, index) => (
            <RewardCard
              key={index}
              tierIndex={reward.tierIndex}
              tokenAmount={reward.tokenAmount}
              nftReward={reward.nftReward}
              imageUrl={reward.imageUrl}
              benefits={reward.benefits}
            />
          ))}
        </div>

        {/* How It Works Section */}
        <div className="bg-gray-800 rounded-2xl p-10 mb-20">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-xl p-6 text-center transition-all duration-300 hover:transform hover:scale-105 hover:bg-gray-600"
              >
                <div className="text-blue-400 mb-4 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
                <div className="mt-4 text-sm text-gray-400">
                  {index === 0 ? "Step 1" : index === 1 ? "Step 2" : "Step 3"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-3">
                When do my NFT benefits start?
              </h3>
              <p className="text-gray-300">
                Your benefits begin immediately after claiming your NFT. You'll
                receive access to your tier privileges within 24 hours.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-3">
                Can I upgrade my NFT later?
              </h3>
              <p className="text-gray-300">
                Yes! As you acquire more Diamond Tokens, you can upgrade to
                higher tier NFTs while keeping your membership history.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-3">
                Which wallets are supported?
              </h3>
              <p className="text-gray-300">
                We support MetaMask, Coinbase Wallet, Trust Wallet, and other
                major Web3 wallets compatible with Binance Smart Chain network.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-3">
                Are the NFTs transferable?
              </h3>
              <p className="text-gray-300">
                Yes, all Diamond Club NFTs are fully transferable and can be
                traded on secondary marketplaces while retaining their benefits.
              </p>
            </div>
          </div>
        </div>
        <WalletInputModal
          isOpen={isWalletModalOpen}
          formData={formData}
          onClose={() => setIsWalletModalOpen(false)}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
      </main>

      {/* Footer */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-4">Diamond Token Rewards</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Claim your membership reward and join our community. Once you have
            enrolled you can earn more rewards from our Diamond Reward program.
          </p>
        </div>
      </div>
    </div>
  );
};
