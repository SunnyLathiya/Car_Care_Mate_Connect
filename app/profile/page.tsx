// "use client"
// import React, { useEffect } from "react";
// import styles from "@/css/Profile.module.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { useDispatch } from "react-redux";
// import { getProfile } from "@/redux/slices/userSlice";


// const Profile = () => { 
//   const {user} = useSelector((state: RootState) => state.user);

//   console.log("xyz", user)
//   const dispatch: AppDispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getProfile())
//     console.log("hello")
//   }, [dispatch]);
//   return (
//     <>
//        <div className="container rounded bg-white mt-5 mb-5">
//   <div className="row">
//     <div className="col-md-3 border-right">
//       <div className="d-flex flex-column align-items-center text-center p-3 py-5">
//         <img
//           className="rounded-circle mt-5"
//           width="150px"
//           src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
//           alt="Profile Picture"
//         />
//         <span className="font-weight-bold">username</span>
//         <span className="text-black-50">edogaru@mail.com.my</span>
//       </div>
//     </div>
//     <div className="col-md-5 border-right">
//       <div className="p-3 py-5">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h4 className="text-right">Profile Settings</h4>
//         </div>
//         <div className="row mt-2">
//           <div className="col-md-6">
//             <label className="labels">FIRSTNAME</label>
//             <input type="text" className="form-control" placeholder="First Name" value={user?.firstName} />
//           </div>
//           <div className="col-md-6">
//             <label className="labels">LASTNAME</label>
//             <input type="text" className="form-control" placeholder="Surname" value={user?.lastName} />
//           </div>
//         </div>
//         <div className="row mt-3">
//           <div className="col-md-12">
//             <label className="labels">user</label>
//             <input type="text" className="form-control" placeholder="Enter Phone Number" value={user?.phoneNumber} />
//           </div>
//           <div className="col-md-12">
//             <label className="labels">{user?.email}</label>
//             <input type="text" className="form-control" placeholder="Enter Email ID" value={user?.email} />
//           </div>
//           <div className="col-md-12">
//             <label className="labels">yourCar</label>
//             <input type="text" className="form-control" placeholder="Education" value={user?.yourCar} />
//           </div>
//           <div className="col-md-12">
//             <label className="labels">favouriteCar</label>
//             <input type="text" className="form-control" placeholder="Education" value={user?.favouriteCar} />
//           </div>
//           <div className="col-md-12">
//             <label className="labels">Address Line 1</label>
//             <input type="text" className="form-control" placeholder="Enter Address Line 1" value={user?.address} />
//           </div>
//           <div className="col-md-12">
//             <label className="labels">Postcode</label>
//             <input type="text" className="form-control" placeholder="Enter Postcode" value={user?.zipcode} />
//           </div>
//           <div className="row mt-3">
//           <div className="col-md-6">
//             <label className="labels">Country</label>
//             <input type="text" className="form-control" placeholder="Country" value={user?.country} />
//           </div>
//           <div className="col-md-6">
//             <label className="labels">State/Region</label>
//             <input type="text" className="form-control" placeholder="State/Region" value={user?.state} />
//           </div>
//         </div>
//         </div>
//         <div className="mt-5 text-center">
//           <button className="btn btn-primary profile-button" type="button">
//             Save Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div> 



//     </>
//   );
// };

// export default Profile;


"use client"
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getProfile, updateProfile } from "@/redux/slices/userSlice";
// import { ToastSuccess, ToastError } from "@/utils/toast"; // Assuming you have a utility for toast notifications
import styles from "@/css/Profile.module.css";
import axios from "axios";
import Cookies from 'js-cookie';
import { ToastError, ToastSuccess } from "@/components/common/Toast";
import { useRouter } from "next/navigation";


const Profile = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const  {_id}  = useSelector((state: RootState) => state.user);
  const router = useRouter();


  console.log("aaaaa", user)

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  console.log("hyy", _id)

  const dispatch = useDispatch<AppDispatch>();

  // Local state to manage form input values
  const [formValues, setFormValues] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
    yourCar: user?.yourCar || "",
    favouriteCar: user?.favouriteCar || "",
    address: user?.address || "",
    zipcode: user?.zipcode || "",
    country: user?.country || "",
    state: user?.state || "",
  });

  useEffect(() => {
    setFormValues({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
      email: user?.email || "",
      yourCar: user?.yourCar || "",
      favouriteCar: user?.favouriteCar || "",
      address: user?.address || "",
      zipcode: user?.zipcode || "",
      country: user?.country || "",
      state: user?.state || "",
    });
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])


  const handleProfileUpdate = () => {
    dispatch(updateProfile(formValues))
    console.log(formValues)
  };

  const authToken = Cookies.get('token');
  console.log(authToken)
  const handleChangePassword = async () => {
    try {
       const abc =await axios.put(
        `http://localhost:4000/api/v1/updatedpassword/`,
        { currentPassword, newPassword },
        // { withCredentials: true } // Add this if you are using cookies for authentication
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      console.log("abc", abc)
      // alert('Password updated successfully');
      ToastSuccess("Password Change successfully!")
    } catch (error) {
      console.error(error);
      // alert('Failed to update password');
      ToastError("Failed to update password")
    }
  };

  const handleDeleteAccount = async() => {
    try{
      await axios.delete(`http://localhost:4000/api/v1/deleteprofile`,
      { headers: { Authorization: `Bearer ${authToken}` } }
      )
      ToastSuccess("Account Deleted Successfully!!")
      Cookies.remove('token');
      router.push('/signup');
    }catch(error){
      ToastError("proble in delete account!")
    } 
  }

  return (
    <div className="rounded mt-5 mb-5" style={{color:"#B85042", backgroundColor:"#E7E8D1"}}>
    <div className="row">
      <div className="col-md-3 border-right">
        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
          <img
            className="rounded-circle mt-5"
            width="150px"
            src={user?.profilePhoto}
            alt="Profile Picture"
          />
          <span className="font-weight-bold">{user?.firstName}{user?.lastName}</span>
          <span className="text-black-50">{user?.email}</span>
        </div>
      </div>
      <div className="col-md-5 border-right">
        <div className="p-3 py-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Profile Settings</h4>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <label className={`${styles.labels}`}>FirstName:</label>
              <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="First Name"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  style={{ fontWeight: 'bold' }}
                />
            </div>
            <div className="col-md-6">
              <label className={`${styles.labels}`}>LastName:</label>
                <input
                   type="text"
                   className="form-control"
                   name="lastName"
                   placeholder="Surname"
                   value={formValues.lastName}
                   onChange={handleInputChange}
                   style={{ fontWeight: 'bold' }}

                 />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <label className={`${styles.labels}`}>PhoneNumber:</label>
              <input type="text" className="form-control" placeholder="Enter Phone Number"  name="phoneNumber" value={formValues.phoneNumber} onChange={handleInputChange} style={{ fontWeight: 'bold' }} />
            </div>
            <div className="col-md-12">
              <label className={`${styles.labels}`}>Email:</label>
              <input type="text" className="form-control" placeholder="Enter Email ID" name="email" value={formValues.email} onChange={handleInputChange} style={{ fontWeight: 'bold' }} />
            </div>
            <div className="col-md-12">
              <label className={`${styles.labels}`}>YourCar:</label>
              <input type="text" className="form-control" placeholder="YourCar" name="yourCar" value={formValues.yourCar} onChange={handleInputChange} style={{ fontWeight: 'bold' }}/>
            </div>
            <div className="col-md-12">
              <label className={`${styles.labels}`}>FavouruteCar:</label>
              <input type="text" className="form-control" placeholder="FavouruteCar" name="favouriteCar" value={formValues.favouriteCar} onChange={handleInputChange} style={{ fontWeight: 'bold' }}/>
            </div>
            <div className="col-md-12">
              <label className={`${styles.labels}`}>Address:</label>
              <input type="text" className="form-control" placeholder="Enter Address Line 1" name="address" value={formValues.address} onChange={handleInputChange} style={{ fontWeight: 'bold' }}  />
            </div>
            <div className="col-md-12">
              <label className={`${styles.labels}`}>ZipCode:</label>
              <input type="text" className="form-control" placeholder="Enter Postcode" name="zipcode" value={formValues.zipcode} onChange={handleInputChange} style={{ fontWeight: 'bold' }} />
            </div>
            <div className="row mt-3">
            <div className="col-md-6">
              <label className={`${styles.labels}`}>Country:</label>
              <input type="text" className="form-control" placeholder="Country" name="country" value={formValues.country} onChange={handleInputChange} style={{ fontWeight: 'bold' }} />
            </div>
            <div className="col-md-6">
              <label className={`${styles.labels}`}>State:</label>
              <input type="text" className="form-control" placeholder="State/Region" name="state" value={formValues.state} onChange={handleInputChange} style={{ fontWeight: 'bold' }} />
            </div>
          </div>
          </div>
          <div className="mt-5 text-center">
            <button className={`${styles.profileButton} btn btn-primary`} type="button" onClick={handleProfileUpdate}>
              Save Profile
            </button>
          </div>
        </div>
        
      </div>

      <div className="col-md-4" style={{marginTop:"50PX"}}>
            <div className="p-3 py-5">

<div className="d-flex justify-content-between align-items-center experience">
        <u><h4><span>Edit Password</span></h4></u>
        <button className="btn btn-primary" style={{marginRight:"12px"}} onClick={handleChangePassword}>
          <i className="fa fa-plus"></i>&nbsp;Change Password
        </button>
      </div>
      <br />
      <div className="col-md-12">
        <label className={`${styles.labels}`}>Current Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <br />
      <div className="col-md-12">
        <label className={`${styles.labels}`}>New Password:</label>
        <input
          type="password"
          className="form-control"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="position-absolute bottom-0 end-0 mb-4 me-3">
      {/* Button for deleting account positioned at the bottom right */}
      <button className="btn btn-danger" style={{marginTop:"50px", marginLeft:"225px"}} onClick={handleDeleteAccount}>
        <i className="fa fa-trash"></i>&nbsp;Delete Account
      </button>
    </div>
            </div>
        </div>
    </div>
  </div> 
  );
};

export default Profile;





