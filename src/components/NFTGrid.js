import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NFTCard from "./NFTCard";
import { balanceof,tokenOfOwnerByIndex }from '../utils/nft';
import '../App.css';

const NFTGrid=()=>{
    const [nfts,setNfts]=useState([]);
    const navigate=useNavigate();

    const handleCardClick = (tokenId) => {
        navigate(`/nft-detail/${tokenId}`);
    };
useEffect(()=>{
    const fetchNFTs = async () => {
        const length=await balanceof("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");
        console.log('length',length)
        for (let i=0;i<length;i++){
            const tokenId=await tokenOfOwnerByIndex("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",i);
            console.log('i',i)
            setNfts((prev)=>[...prev,tokenId]);
            setNfts((prev)=>[...new Set(prev)])
            }
        };
        fetchNFTs();
    },[]);
return(
    <div className="nft-grid">
        {nfts.map((nft)=>(
            <NFTCard tokenId={nft} onclick={() => handleCardClick(nft)} />
        ))}
    </div>
);
};

export default NFTGrid;