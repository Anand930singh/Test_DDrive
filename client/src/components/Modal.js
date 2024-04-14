import { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [addressValue, setAddressValue] = useState("");
  
  const sharing = async () => {
    try {
      await contract.allow(addressValue);
      setModalOpen(false);
    } catch (error) {
      console.error("Error sharing:", error);
      // Handle error as needed, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    const accessList = async () => {
      if (contract) {
        try {
          const addressList = await contract.shareAccess();
          const select = document.querySelector("#selectNumber");
          select.innerHTML = ""; // Clear existing options

          addressList.forEach((address) => {
            const option = document.createElement("option");
            option.textContent = address;
            option.value = address;
            select.appendChild(option);
          });
        } catch (error) {
          console.error("Error retrieving access list:", error);
          // Handle error as needed
        }
      }
    };
    
    accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              value={addressValue}
              onChange={(e) => setAddressValue(e.target.value)}
              placeholder="Enter Address"
            />
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button id="cancelBtn" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button onClick={sharing}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
