import Header from "../../components/Header";
import RewardCard from "../../components/RewardCard";
import redNFT from "../../../assets/red.jpeg";
import greenNFT from "../../../assets/green.png";
import blueNFT from "../../../assets/blue.png";
import blackNFT from "../../../assets/black.png";
import bg from "../../../assets/bg.png";
import background from "../../../assets/background.png";
import glow from "../../../assets/glows.png"
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
      "1 vote in DIORA Governance",
      "100% of given Community Reward",
      "100% of given Staking Reward*",
    ],
  },
  {
    tokenAmount: "5,000",
    nftReward: "Green Diamond NFT",
    imageUrl: greenNFT,
    tierIndex: 1,
    benefits: [
      "2.5 votes in DIORA Governance",
      "250% of given Community Reward",
      "125% of given Staking Reward*",
    ],
  },
  {
    tokenAmount: "25,000",
    nftReward: "Blue Diamond NFT",
    imageUrl: blueNFT,
    tierIndex: 2,
    benefits: [
      "15 votes in DIORA Governance",
      "1500% of given Community Reward",
      "150% of given Staking Reward*",
    ],
  },
  {
    tokenAmount: "100,000",
    nftReward: "Red Diamond NFT",
    imageUrl: redNFT,
    tierIndex: 3,
    benefits: [
      "50 votes in DIORA Governance",
      "5000% of given Community Reward",
      "200% of given Staking Reward*",
    ],
  },
  {
    tokenAmount: "By Invitation",
    nftReward: "Flawless Diamond NFT",
    imageUrl: flawlessNFT,
    tierIndex: 4,
    benefits: [
      "Pro-rata share of 80% of all governance votes",
      "Maximum rewards",
      "Maximum utility",
      "Maximum influence",
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
      "Once verified, choose and claim your exclusive Diamond Club NFT that corresponds to your token level so you can enjoy the rewards and utility in both DIORA and Diamond Club.",
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
    const sucess = (await createNFTReward()) && (await sendSms());
    // if (sucess) {
    //   toast.success("Submitted sucessfully...");
    // } else {
    //   toast.error("Something went wrong!");
    // }
    setIsWalletModalOpen(false);
  };
  console.log("formData", formData);
  return (
    <div
      className="min-h-screen w-full flex flex-col relative overflow-hidden bg-[#09090b] text-white"
      style={{
        backgroundImage: `url(${bg}), url(${glow}), url(${background})`,
        backgroundPosition: '100%, bottom, 50%',
        backgroundSize: 'auto, auto, cover',
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
        backgroundBlendMode: 'normal, normal, normal',
      }}
    >
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-20 pb-16">
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            {/* Left: Text content */}
            <div className="order-2 lg:order-1 text-center lg:text-left px-2 sm:px-0">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Claim your Diamond Club membership
              </h1>
              <p className="text-gray-300 text-base sm:text-lg mb-6 max-w-xl mx-auto lg:mx-0">
                Claim an exclusive NFT that represents your membership tier in the Diamond Club. Membership unlocks governance rights, special rewards, and exclusive community access for DIORA token holders.
              </p>

              <ul className="text-gray-300 text-sm sm:text-base mb-6 space-y-3 list-inside">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 font-semibold">•</span>
                  <span><span className="font-semibold text-white">Governance rights</span> — vote in DIORA decisions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 font-semibold">•</span>
                  <span><span className="font-semibold text-white">Exclusive perks</span> — Diamond Club privileges and programs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 font-semibold">•</span>
                  <span><span className="font-semibold text-white">Passive rewards</span> — earn from community reward pools.</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                <button
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:scale-105 transform transition"
                  onClick={() => setIsWalletModalOpen(true)}
                  aria-haspopup="dialog"
                >
                  Connect Wallet
                </button>
                <button
                  className="w-full sm:w-auto px-5 py-3 rounded-full border border-gray-700 text-gray-200 hover:bg-gray-700 transition"
                  onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                >
                  View Rewards
                </button>
              </div>
            </div>

            {/* Right: Visuals - stacked NFTs */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end px-2">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-2xl bg-gradient-to-br from-gray-900/60 to-black/50 p-3 sm:p-4 ring-1 ring-white/5 backdrop-blur">
                <img src={blackNFT} alt="Black Diamond" className="absolute left-1 top-6 w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-xl shadow-2xl border-2 border-black" />
                <img src={greenNFT} alt="Green Diamond" className="absolute right-1 top-2 w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl shadow-xl border-2 border-black transform rotate-3" />
                <img src={blueNFT} alt="Blue Diamond" className="absolute left-8 bottom-2 w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-md border-2 border-black transform -rotate-2" />
                <div className="absolute -right-6 -bottom-6 text-xs text-gray-400 hidden sm:block">Collect yours</div>
              </div>
            </div>
          </div>
        </section>

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
          <p className="text-gray-400 text-sm text-center mt-2 mb-12 max-w-2xl mx-auto italic">
            *Only given on staking programs that are part of the official Diamond Club Staking and are not based on fixed staking rewards.
          </p>

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
      
    </div>
  );
};
