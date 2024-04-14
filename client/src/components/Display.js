import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const [image, setImage]= useState();
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      setImage(str_array);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      <div className="imagesList">
      {image && image.map((item, i) => (
         <div className="singleImage"><a href={item} target="_blank"> <img
            key={i}
            src={item}
            alt="new"
            className="image-list"
          ></img>
          </a>
          </div>
        ))}
      </div>
      <div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="button-32" onClick={getdata}>
        Get Data
      </button>
      </div>
    </>
  );
};
export default Display;
