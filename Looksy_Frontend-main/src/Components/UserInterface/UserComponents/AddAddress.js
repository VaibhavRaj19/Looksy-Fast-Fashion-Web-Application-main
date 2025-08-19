// import React, { useState, useEffect } from "react";
// import { Button } from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { postData } from "../../Services/NodeServices";
// import AddAddressDetails from "./AddAddressDetails";

// export default function AddAddress(props) {
//   const matches = useMediaQuery("(max-width:1150px)");
//   const matches1 = useMediaQuery("(max-width:550px)");

//   const [mobileNumber, setMobileNumber] = useState(props.userData.mobilenumber);
//   const [userAddress, setUserAddress] = useState({});
//   const [change, setChange] = useState(false);

//   const fetchUserAddress = async () => {
//     var result = await postData("userinterface/check_user_address", {
//       userid: mobileNumber,
//     });
//     if (result.status) {
//       setUserAddress(result);
//     }
//   };
//   useEffect(function () {
//     fetchUserAddress();
//   }, []);
//   const handleChange = () => {
//     setChange(true);
//   };
//   const [refresh, setRefresh] = useState(false);
//   const handleUpdateAddress = (value) => {
//     setChange(value);
//     fetchUserAddress();
//     setRefresh(!refresh);
//   };

//   const showAddress = (address) => {
//     return address.map((item) => {
//       return (
//         <div>
//           {change ? (
//             <>
//               <AddAddressDetails
//                 userData={props.userData}
//                 change={change}
//                 address={item}
//                 onClick={(value) => handleUpdateAddress(value)}
//               />
//             </>
//           ) : (
//             <>
//               <div
//                 style={{
//                   color: "rgb(81, 203, 204)",
//                   fontSize: 25,
//                   fontWeight: 600,
//                   fontFamily: "cursive",
//                 }}
//               >
//                 Your Address
//               </div>
//               {matches ? (
//                 <>
//                   {matches1 ? (
//                     <>
//                       <hr style={{ width: "445px" }} />
//                     </>
//                   ) : (
//                     <>
//                       <hr style={{ width: "500px" }} />
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <hr style={{ width: "710px" }} />
//               )}
//               <div
//                 style={{ fontSize: 23, fontWeight: 500, fontFamily: "cursive" }}
//               >
//                 {props.userData.firstname}&nbsp;{props.userData.lastname}
//               </div>
//               <div style={{ fontSize: 18, fontWeight: 400 }}>
//                 {props.userData.mobilenumber}
//               </div>
//               <div style={{ fontSize: 18, fontWeight: 400 }}>
//                 {item.address}
//               </div>
//               <div style={{ fontSize: 18, fontWeight: 400 }}>
//                 {item.town}&nbsp;&nbsp;&nbsp;{item.pincode}
//               </div>
//               <div style={{ fontSize: 18, fontWeight: 400 }}>
//                 {item.city},{item.state}
//               </div>
//               <div style={{ marginTop: 15 }} onClick={handleChange}>
//                 <Button
//                   variant="contained"
//                   style={{ background: "rgb(81, 203, 204)", color: "white" }}
//                 >
//                   Change Address
//                 </Button>
//               </div>
//             </>
//           )}
//         </div>
//       );
//     });
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexWrap: "wrap",
//         background: "#fff",
//         width: "100%",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           border: "2px solid #fff",
//           margin: 20,
//           width: "100%",
//         }}
//       >
//         {userAddress.status ? (
//           <>{showAddress(userAddress.data)}</>
//         ) : (
//           <>
//             <AddAddressDetails
//               onClick={(value) => handleUpdateAddress(value)}
//               userData={props.userData}
//               change={change}
//               address={""}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
