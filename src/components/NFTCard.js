import { useEffect,useState } from "react";
import { getMetadata } from '../utils/nft.js';
import { getOrder } from '../utils/market.js';
import '../App.css';

const NFTCard =({tokenId,onclick})=>{
    const [metadata,setMetadata] = useState('')
    const [order,setOrder] = useState('')

    useEffect(()=>{
        const getInfo = async () => {
            const metadata = await getMetadata(tokenId);
            const order = await getOrder(tokenId);

            setMetadata(metadata);
            setOrder(order);
        }
        getInfo();
    },[]);
return(
    <div className="nft-card" onClick={onclick}>
        <div className="nft-card-image">
            <img src={metadata.imageURL} alt="nft-image"/>
        </div>
        <div className="nft-card-info">
            <h3>{metadata.title}</h3>
            <p>Price:{order.price} USDT</p>
        </div>
    </div>
);
};

export default NFTCard;