import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { SequenceIndexerClient } from "@0xsequence/indexer";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const indexer = new SequenceIndexerClient(
  "https://polygon-indexer.sequence.app"
);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [nftBalances, setNftBalances] = useState([]);

  useEffect(() => {
    // try any contract and account address you'd like :)
    const contractAddress = "0x60f028C82f9f3bF71e0C13fE9e8E7f916b345C00";
    const accountAddress = "0x1B46F75aC63bc57DFE82A374bDCdbfB08d125792";

    // query Sequence Indexer for all nft balances of the account on Polygon
    async function getNftBalances() {
      const balances = await indexer.getTokenBalances({
        contractAddress: contractAddress,
        accountAddress: accountAddress,
        includeMetadata: true,
      });
      console.log("balance is ", balances);
      setNftBalances(balances.balances);
    }
    getNftBalances();
  }, []);

  return (
    <>
    <div className="flex items-center ml-4">
    <ConnectButton label="Connect Wallet" className="bg-olive-500" />
  </div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">My NFTs</h1>
      <ul className="bg-white rounded-md shadow-md w-96 p-4">
        {nftBalances.map((balance, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <Image
                // src={balance.tokenMetadata.image}
                src="https://i.imgur.com/gAhQs3c.jpg"
                className="w-8 h-8"
                alt="NFT logo"
                width={32}
                height={32}
              />
              <div className="flex flex-col">
                <span className="font-medium text-sm text-black">
                  {balance.tokenMetadata.name}
                </span>
                <span className="text-sm text-gray-500">
                  {balance.tokenMetadata.symbol}
                </span>
              </div>
            </div>
            <span className="text-gray-700">{balance.tokenBalance}</span>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
