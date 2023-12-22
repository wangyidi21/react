// import logo from './logo.svg';
// import './App.css';
// import { useState,useEffect } from 'react';



// function Counter({name}) {

//   useEffect(()=>{
//     console.log(`${name} also clicked ${count} times.`);
//   })
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//        <p>{name} clicked {count} times.</p>
//        <button onClick={() => setCount(count + 1)}>Click me!</button>
//     </div>
//   );
// }

// function App() {
//   const message="Hello World";
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App111.js</code> and save to reload.
//         </p>
//         <p>{ message }</p>
//         <Counter  name="wangyidi"/>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import UploadImage from './components/UploadImage.js';
import Navbar from './components/Navbar.js';
import UploadSuccess from './components/UploadSuccess.js';
import NFTGrid from './components/NFTGrid.js';
import NFTDetail from './components/NFTDetail.js';
function App() {
    const [walletAddress,setWallet]=useState("");

    useEffect(()=>{
        //getWalletAddress();
        addWalletListener();
    },[])
    
    function addWalletListener(){
        if(window.ethereum){
            window.ethereum.on('accountsChanged',(accounts)=>{
                if (accounts.length>0){
                    setWallet(accounts[0]);
                }else{
                    console.log("No account");
                    setWallet("");
                }
        });
      }else{
        alert("Please intall Metamask!")
      }
    }
 


    const getWalletAddress=async()=>{
        if (window.ethereum){
            try{

            
            const  accounts=await window.ethereum.request({method:'eth_requestAccounts'});
           
            setWallet(accounts[0]);

         
    }catch(error){
        alert("Please install Metamask");
        console.error('Error connecting to wallet:',error)
    }
    }
};

    return (
        <div id="container">
        
            <Router>
            <Navbar onConnectWallet={getWalletAddress} walletAddress={walletAddress}/>
            
            <Routes>
                <Route path="/create"exact element={<UploadImage address={walletAddress}/>} />
                <Route path="/success" element={<UploadSuccess />} />
                <Route path="/" element={<NFTGrid />} />
                <Route path="/nft-detail/:tokenId" element={<NFTDetail />} />
            </Routes>
            </Router>
           
            
        </div>
    );
    };

export default App;
