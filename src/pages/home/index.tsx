import Header from '../../components/Header';
import RewardCard from '../../components/RewardCard';
import redNFT from "../../../assets/red.jpeg";
import greenNFT from "../../../assets/green.jpeg";
import blueNFT from "../../../assets/blue.jpeg";
import blackNFT from "../../../assets/black.jpeg";
import flawlessNFT from "../../../assets/flawless.jpeg";
import { RocketOutlined, CheckCircleOutlined, GiftOutlined } from '@ant-design/icons';

const rewards = [
    {
        tokenAmount: "2,500",
        nftReward: "Black Diamond NFT",
        imageUrl: blackNFT,
        tierIndex: 0,
        benefits: ["Access to Bronze Club events", "Monthly digital collectibles", "Community forum access"]
    },
    {
        tokenAmount: "5,000",
        nftReward: "Green Diamond NFT",
        imageUrl: greenNFT,
        tierIndex: 1,
        benefits: ["All Bronze benefits", "Priority support", "Exclusive Silver merchandise", "Quarterly airdrops"]
    },
    {
        tokenAmount: "25,000",
        nftReward: "Blue Diamond NFT",
        imageUrl: blueNFT,
        tierIndex: 2,
        benefits: ["All Silver benefits", "VIP access to events", "Early access to new features", "Diamond Club voting rights"]
    },
    {
        tokenAmount: "100,000",
        nftReward: "Red Diamond NFT",
        imageUrl: redNFT,
        tierIndex: 3,
        benefits: ["All Silver benefits", "VIP access to events", "Early access to new features", "Diamond Club voting rights"]
    },
    {
        tokenAmount: "25,000",
        nftReward: "Flawless Diamond NFT",
        imageUrl: flawlessNFT,
        tierIndex: 4,
        benefits: ["All Silver benefits", "VIP access to events", "Early access to new features", "Diamond Club voting rights"]
    }
];

const howItWorksSteps = [
    {
        icon: <RocketOutlined style={{ fontSize: '2rem' }} />,
        title: "Purchase Tokens",
        description: "Buy Diamond Tokens through our secure platform or approved exchanges to qualify for rewards."
    },
    {
        icon: <CheckCircleOutlined style={{ fontSize: '2rem' }} />,
        title: "Connect Wallet",
        description: "Link your compatible wallet to our platform to verify your token holdings."
    },
    {
        icon: <GiftOutlined style={{ fontSize: '2rem' }} />,
        title: "Claim NFT",
        description: "Once verified, choose and claim your exclusive Diamond Club NFT that corresponds to your token level."
    }
];


export const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
            <Header />

            {/* Hero Section */}
            <main className="container mx-auto px-4 pt-20 pb-16">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        NFT Rewards
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Welcome to the Diamond Token Rewards Program! As a valued holder, claim your exclusive NFT that unlocks premium benefits in the luxury Diamond Club.
                    </p>
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
                            <div key={index} className="bg-gray-700 rounded-xl p-6 text-center transition-all duration-300 hover:transform hover:scale-105 hover:bg-gray-600">
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
                            <h3 className="text-lg font-bold mb-3">When do my NFT benefits start?</h3>
                            <p className="text-gray-300">Your benefits begin immediately after claiming your NFT. You'll receive access to your tier privileges within 24 hours.</p>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-3">Can I upgrade my NFT later?</h3>
                            <p className="text-gray-300">Yes! As you acquire more Diamond Tokens, you can upgrade to higher tier NFTs while keeping your membership history.</p>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-3">Which wallets are supported?</h3>
                            <p className="text-gray-300">We support MetaMask, Coinbase Wallet, Trust Wallet, and other major Web3 wallets compatible with Ethereum and Polygon networks.</p>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-3">Are the NFTs transferable?</h3>
                            <p className="text-gray-300">Yes, all Diamond Club NFTs are fully transferable and can be traded on secondary marketplaces while retaining their benefits.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <div className="bg-gray-800 py-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-xl font-bold mb-4">Diamond Token Rewards</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">Join thousands of Diamond Token holders who are already enjoying exclusive benefits and experiences.</p>
                </div>
            </div>
        </div>
    )
}