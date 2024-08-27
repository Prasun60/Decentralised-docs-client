import { useState } from "react";
import "./Display.css";
const Display = ({ contracts, accounts }) => {
  const [data, setData] = useState([]);

  
  const getdata = async () => {
    console.log("Button clicked");
    let dataArray ;
    const Otheraddress = document.querySelector(".address").value;
    // console.log(Otheraddress)


    try {
      if (Otheraddress) {
        dataArray =  await contracts.display(Otheraddress);
        console.log(dataArray);
        setData(dataArray)
      } else {
        console.log(accounts);
        dataArray =  await contracts.display(accounts);
        console.log("Fetched data array" , dataArray);
        setData(dataArray)
      }
    } catch (e) {
      console.log("hhhhhhhhhhhiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
      console.error(e);
      alert("You don't have access");
    }
    // console.log(dataArray);
    // const isEmpty = Object.keys(dataArray).length === 0;
    // console.log("Running");
    // if (!isEmpty) {
    //   const str = dataArray.toString();
    //   const str_array = str.split(",");
    //   console.log(str);
    //   console.log("HI");
    //   console.log(str_array);
    //   const images = str_array.map((item, i) => {
    //     return (
    //       <></>
    //       // <a href={item} key={i} target="_blank">
    //       //   <img
    //       //     key={i}
    //       //     src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
    //       //     alt="new"
    //       //     className="image-list"
    //       //   ></img>
    //       // </a>
    //     );
    //   });
    //   setData(images);
    // } else {
    //   alert("No image to display");
    //   console.log("Nope");
    // }
  };

  console.log("data : ",data)
  return (
    <> 
      
      {/* <div className="image-list">{data}</div> */}
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
      <hr>
      </hr>
      <hr>
      </hr>

      {
        data.map((item)=>{
          return(
            <div>
              <img src={`${item}`}  height={200} width={200}/>
            </div>
          )
        })
      }
    </>
  );
};
export default Display;