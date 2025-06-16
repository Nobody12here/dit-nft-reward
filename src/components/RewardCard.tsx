import React, { useEffect, useState } from "react";
import { Card, Divider } from "antd";
import { Check, Award } from "lucide-react";
import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";
import { config } from "../config";
import { Address, erc20Abi, formatEther } from "viem";
import { erc20TokenAddress, NFTABi, NFTAddress } from "../ABI/NFT";

interface RewardCardProps {
  tokenAmount: string;
  nftReward: string;
  imageUrl: string;
  tierIndex: number; // Add tier index to identify which tier this card represents
  benefits?: string[];
}

const RewardCard: React.FC<RewardCardProps> = ({
  tokenAmount,
  nftReward,
  imageUrl,
  tierIndex,
  benefits = [],
}) => {
  const [userTokenAmount, setUserTokenAmount] = useState(0);
  const [isClaimed, setIsClaimed] = useState(false);

  // Determine card and button states
  const isEligible =
    parseFloat(tokenAmount.replace(/,/g, "")) <= userTokenAmount;
  const getCardBorderColor = () => {
    if (isClaimed) return "border-green-500";
    if (isEligible) return "border-blue-500 hover:border-blue-400";
    return "border-gray-700";
  };

  return (
    <Card
      className={`w-full bg-gray-800/80 ${getCardBorderColor()} transition-all duration-300 ${
        isEligible && !isClaimed
          ? "hover:shadow-lg hover:shadow-blue-500/20"
          : ""
      }`}
      bordered={true}
    >
      <div className="flex flex-col items-center">
        <div className="relative w-full">
          <img
            src={imageUrl}
            alt={`${nftReward} - NFT Reward`}
            className={`w-full object-cover rounded-lg ${
              isClaimed ? "" : "filter brightness-90"
            }`}
          />

          {isClaimed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
              <div className="bg-green-600 text-white px-4 py-2 rounded-md font-bold flex items-center">
                <Award className="w-5 h-5 mr-2" />
                CLAIMED
              </div>
            </div>
          )}

          <div className="absolute top-3 right-3 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
            {tokenAmount} {parseFloat(tokenAmount) ? "DIT" : ""}
          </div>
        </div>

        <div className="text-center mt-4 w-full">
          <h3 className="text-xl font-bold text-white mb-1">{nftReward}</h3>
          <p className="text-gray-400 mb-3">Diamond Club Membership</p>

          {benefits.length > 0 && (
            <>
              <Divider className="border-gray-700 my-4" />
              <div className="text-left mb-4">
                <h4 className="text-sm uppercase text-gray-400 mb-2 font-semibold">
                  Membership Benefits
                </h4>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* <Tooltip 
            title={
              isClaimed 
                ? "You've already claimed this NFT reward" 
                : !isEligible 
                  ? `You need ${tokenAmount} DIT tokens to claim this reward` 
                  : "Click to claim your NFT reward"
            }
          >
            <Button
              type="primary"
              size="large"
              onClick={handleRewardClaim}
              loading={isLoading}
              disabled={buttonDisabled}
              className={`${getButtonStyle()} border-none flex items-center justify-center gap-2 w-full mt-2`}
              icon={getButtonIcon()}
            >
              {getButtonText()}
            </Button>
          </Tooltip> */}
        </div>
      </div>
    </Card>
  );
};

export default RewardCard;
