import Upload from "./contracts/Upload.sol/Upload.json"
import {useState,useHook, useEffect} from "react";
import {ethers} from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css" ;
function App(){
  const [account,setAccount] =  useState("");
  const [provider,setProvider] = useState(null);
  const [contract,setContract] = useState(null);
  const [modal,setModal]=useState(false);

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async()=>{
      if(provider){
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        })
        window.ethereum.on("accountChanged",()=>{
          window.location.reload();
        })
        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            setAccount(""); // No account connected
          }
        });
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0xe8B3a4281ab944320f31f6f8f773b5c1d20409Ba";

        const contract = new ethers.Contract(
          contractAddress,Upload.abi,signer
        )
        console.log("contract communication successsssssssssssss")
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      }
      else{
        console.error("Metamask not installed");
      }
    };
    provider && loadProvider();
  },[]);


  useEffect(() => {
    if (contract) {
      console.log("contract exisstttttttttttttttttttt")
      contract.display("0xE8Dc9F3cecc1E7DD7737001f1987cc2813246A93")
      .then((result) => console.log(result)) // Convert BigNumber to string
      .catch((error) => console.error("Error:", error));
    }
  }, [contract]);



  return <><div className="App">
    
    <h1>Heading</h1>
    <div className="bg"></div>
    <div className="bg bg2"></div>
    <div className="bg bg3"></div>

    <p>Account: {account?account:"Not Connected"}</p>
    <FileUpload accounts = {account} providers = {provider} contracts = {contract}></FileUpload>
    <Display  contracts = {contract} accounts={account}></Display>
    </div></>
}
export default App;