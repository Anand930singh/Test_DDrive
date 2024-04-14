import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import Typewriter from "typewriter-effect";
import { ImCross } from "react-icons/im";
import Eth from './assets/Ethereum.png'

import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [showFileUpload, setShowFileUpload] = useState(true);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <div className="conatainerxyz">
      <div className="bgImage">
        <img src="https://www.pngall.com/wp-content/uploads/13/Grid-PNG-File.png" />
      </div>

      <div className='animation-example'>
        <div className='item'>
          <div className='line'></div>
          <div className='dot'></div>
          <div className='circle'></div>
        </div>
        <div className='item'>
          <div className='line'></div>
          <div className='dot'></div>
          <div className='circle'></div>
        </div>
        <div className='item'>
          <div className='line'></div>
          <div className='dot'></div>
          <div className='circle'></div>
        </div>
        <div className='item'>
          <div className='line'></div>
          <div className='dot'></div>
          <div className='circle'></div>
        </div>
        <div className='item -type2'>
          <div className='line'></div>
          <div className='dot'></div>
          <div className='circle'></div>
        </div>
        <div className='item -type2'>
          <div className='line'></div>
          <div className='dot'></div>
          <div className='circle'></div>
        </div>
        <div className='item -type2'>
          <div className='line'></div>
          <div className='dot'></div>
          <div className='circle'></div>
        </div>
        <div className='item -type2'>
          <div className='line'></div>
          <div className='dot'></div>
          <div className='circle'></div>
        </div>
        <div className='center'>
          <div className='circle'></div>
          <div className='circle'></div>
          <div className='circle'></div>
        </div>
      </div>
      <div className="ethereum"><img src={Eth} /></div>
      <div className="navbar">
        <div className="siteName">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("D-Drive 3.O")
                .pauseFor(1000)
                .start();
            }}
          />
        </div>
        <div>
          {!modalOpen && (
            <button className="share" onClick={() => setModalOpen(true)}>
              Share
            </button>
          )}
        </div>
      </div>
      {modalOpen && (<div className="modelxyz">
        <div className="icons"><ImCross style={{color:'red'}} onClick={()=>setModalOpen(false)}/></div>
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      </div>)}
      {!modalOpen && (<div className="App">

        <div className="connectedOrNot">
          <p style={{ color: account ? "green" : "red" }}>
            <span>Account :</span> {account ? account : "Not connected"}
          </p>
        </div>
          <div className="xyz1234">
        <div className="cardNav">
          <button
            style={{ backgroundColor: showFileUpload ? "green" : "white" }}
            className="button-1" onClick={() => setShowFileUpload(true)}>Upload File</button>
          <button
            style={{ backgroundColor: !showFileUpload ? "green" : "white" }}
            className="button-2" onClick={() => setShowFileUpload(false)}>Get Files</button>
        </div>
        <div className="cardContainer">
          {showFileUpload ? (
            <FileUpload account={account} provider={provider} contract={contract} />
          ) : (
            <Display contract={contract} account={account} />
          )}
        </div>
          </div>
      </div>)}
    </div>
  );
}

export default App;
