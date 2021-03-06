import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { NFT_ADDRESS, NFT_MARKET_ADDRESS } from "../config";
import Web3Modal from "web3modal";
import axios from "axios";

// import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
// import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../utils/NFT.json";
import Market from "../utils/NFTMarket.json";
import Loading from "../components/loading";

export default function MyAssets() {
  const [nfts, setNFTs] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const tokenContract = new ethers.Contract(NFT_ADDRESS, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      NFT_MARKET_ADDRESS,
      Market.abi,
      signer
    );
    const data = await marketContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async i => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image
        };

        return item;
      })
    );

    setNFTs(items);
    setLoadingState("loaded");
  }

  if (loadingState === "loaded" && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets owned</h1>;

  return (
    <div className="flex justify-between">
      <Loading active={loadingState === "not-loaded"} />

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} className="rounded" />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} Eth
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
