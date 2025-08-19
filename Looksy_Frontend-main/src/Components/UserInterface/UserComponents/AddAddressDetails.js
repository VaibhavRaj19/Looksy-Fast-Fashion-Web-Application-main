// import React, { useState } from "react";
// import { Grid, Button } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import Checkbox from "@mui/material/Checkbox";
// import Swal from "sweetalert2";
// import { postData } from "../../Services/NodeServices";
// const label = { inputProps: { "aria-label": "Checkbox demo" } };

// export default function AddAddressDetails(props) {
//   const [mobileNumber, setMobileNumber] = useState(props.userData.mobilenumber);
//   const [firstName, setFirstName] = useState(props.userData.firstname);
//   const [lastName, setLastName] = useState(props.userData.lastname);
//   const [pincode, setPinCode] = useState(props.address?.pincode);
//   const [town, setTown] = useState(props.address?.town);
//   const [city, setCity] = useState(props.address?.city);
//   const [state, setState] = useState(props.address?.state);
//   const [address, setAddress] = useState(props.address?.address);
//   //   const [userid,setUserId]= useState(props.userData.userid)
//   const [changeAddress, setChangeAddress] = useState(props.change);

//   const handleClick = async () => {
//     if (town && pincode && city && state && address) {
//       var result = await postData("userinterface/submit_useraddress", {
//         userid: mobileNumber,
//         pincode: pincode,
//         town: town,
//         city: city,
//         state: state,
//         address: address,
//       });
//       if (result.status) {
//         Swal.fire("Address Submitted Successfully....");
//         props.onClick(false);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Fail to Submit ur Address...!",
//         });
//       }
//     } else {
//       Swal.fire("Pls Input Complete Address...");
//     }
//   };

//   const handleChangeAddress = async () => {
//     if (town && pincode && city && state && address) {
//       var result = await postData("userinterface/update_useraddress", {
//         userid: mobileNumber,
//         pincode: pincode,
//         town: town,
//         city: city,
//         state: state,
//         address: address,
//       });
//       if (result.status) {
//         Swal.fire("Address Updated Successfully....");
//         props.onClick(false);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Fail to Update Address...!",
//         });
//       }
//     } else {
//       Swal.fire("Pls Input Complete Address...");
//     }
//   };

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         {changeAddress ? (
//           <div>
//             <Button
//               onClick={handleChangeAddress}
//               variant="contained"
//               style={{ background: "rgb(81, 203, 204)", color: "white" }}
//             >
//               Change Address
//             </Button>
//           </div>
//         ) : (
//           <div>
//             <Button
//               onClick={handleClick}
//               variant="contained"
//               style={{ background: "rgb(81, 203, 204)", color: "white" }}
//             >
//               Add Address
//             </Button>
//           </div>
//         )}
//       </Grid>

//       <Grid item xs={6}>
//         <div style={{ background: "#fff" }}>
//           <TextField
//             color="secondary"
//             margin="normal"
//             fullWidth
//             placeholder="First Name"
//             disableUnderline={false}
//             InputLabelProps="disableAnimation"
//             size="small"
//             value={firstName}
//           />
//         </div>
//       </Grid>

//       <Grid item xs={6}>
//         <div style={{ background: "#fff" }}>
//           <TextField
//             color="secondary"
//             margin="normal"
//             fullWidth
//             placeholder="Last Name"
//             disableUnderline={false}
//             InputLabelProps="disableAnimation"
//             size="small"
//             value={lastName}
//           />
//         </div>
//       </Grid>
//       <Grid item xs={6}>
//         <div style={{ background: "#fff" }}>
//           <TextField
//             color="secondary"
//             margin="normal"
//             fullWidth
//             placeholder="Phone No."
//             disableUnderline={false}
//             InputLabelProps="disableAnimation"
//             size="small"
//             value={mobileNumber}
//           />
//         </div>
//       </Grid>

//       <Grid item xs={6}>
//         <div style={{ background: "#fff" }}>
//           <TextField
//             color="secondary"
//             margin="normal"
//             fullWidth
//             placeholder="PIN Code"
//             disableUnderline={false}
//             InputLabelProps="disableAnimation"
//             size="small"
//             value={pincode}
//             onChange={(event) => setPinCode(event.target.value)}
//           />
//         </div>
//       </Grid>

//       <Grid item xs={6}>
//         <div style={{ background: "#fff" }}>
//           <TextField
//             color="secondary"
//             margin="normal"
//             fullWidth
//             placeholder="Town/Village"
//             disableUnderline={false}
//             InputLabelProps="disableAnimation"
//             size="small"
//             value={town}
//             onChange={(event) => setTown(event.target.value)}
//           />
//         </div>
//       </Grid>
//       <Grid item xs={6}>
//         <div style={{ background: "#fff" }}>
//           <TextField
//             color="secondary"
//             margin="normal"
//             fullWidth
//             placeholder="City/District"
//             disableUnderline={false}
//             InputLabelProps="disableAnimation"
//             size="small"
//             value={city}
//             onChange={(event) => setCity(event.target.value)}
//           />
//         </div>
//       </Grid>

//       <Grid item xs={6}>
//         <div style={{ background: "#fff" }}>
//           <TextField
//             color="secondary"
//             margin="normal"
//             fullWidth
//             placeholder="State"
//             disableUnderline={false}
//             InputLabelProps="disableAnimation"
//             size="small"
//             value={state}
//             onChange={(event) => setState(event.target.value)}
//           />
//         </div>
//       </Grid>

//       <Grid item xs={6}>
//         <div style={{ background: "#fff" }}>
//           <TextField
//             color="secondary"
//             margin="normal"
//             fullWidth
//             placeholder="Address (House No,Building,Street,Area)"
//             disableUnderline={false}
//             InputLabelProps="disableAnimation"
//             size="small"
//             value={address}
//             onChange={(event) => setAddress(event.target.value)}
//           />
//         </div>
//       </Grid>
//       <Grid item xs={12}>
//         <Checkbox {...label} /> Make this my Default Address
//       </Grid>
//     </Grid>
//   );
// }
