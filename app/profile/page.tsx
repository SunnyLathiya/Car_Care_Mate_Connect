"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getProfile, updateProfile } from "@/redux/slices/userSlice";
import styles from "@/css/Profile.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastError, ToastSuccess } from "@/components/common/Toast";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "@/components/firebase";
import { User } from "../types";
import Axios from "@/redux/APIs/Axios";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.user);
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const router = useRouter();
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const dispatch: AppDispatch = useDispatch();

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
    profilePhoto: user?.profilePhoto || "",
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
      profilePhoto: user?.profilePhoto || "",
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
    dispatch(getProfile());
  }, [dispatch]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    try {
      if (!file) {
        return;
      }
      const storageRef = ref(imageDb, `images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setFormValues((prevValues) => ({
        ...prevValues,
        profilePhoto: downloadURL,
      }));

      ToastSuccess("Image Uploaded successfully.");
    } catch (error: any) {
      ToastError(error.message);
    }
  };

  const validateProfile = () => {
    let isValid = true;
    if (!formValues.firstName.trim()) {
      setFirstNameError("First Name is required.");
      isValid = false;
    } else {
      setFirstNameError("");
    }
    if (!formValues.lastName.trim()) {
      setLastNameError("Last Name is required.");
      isValid = false;
    } else {
      setLastNameError("");
    }
    if (!formValues.phoneNumber.trim()) {
      setPhoneNumberError("PhoneNumber is required.");
      isValid = false;
    } else if (formValues.phoneNumber.trim().length !== 10) {
      setPhoneNumberError("Phone number should be exactly 10 digits.");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }
    return isValid;
  };

  const handleProfileUpdate = async () => {
    if (!validateProfile()) {
      return;
    }

    try {
      await dispatch(updateProfile(formValues as User));
      ToastSuccess("Profile updated successfully");
    } catch (error: any) {
      ToastError(error.message);
    }
  };


  const authToken = Cookies.get("token");

  const validateNewPassword = () => {
    if (!currentPassword) {
      setNewPasswordError('Current password is required.');
      return false;
    }

    if (!newPassword) {
      setNewPasswordError('New password is required.');
      return false;
    }

    if (newPassword.length < 8) {
      setNewPasswordError("Password must be at least 8 characters long.");
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setNewPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit."
      );
      return false;
    }

    setNewPasswordError("");
    return true;
  };

  const handleChangePassword = async () => {
    if (!validateNewPassword()) {
      return;
    }

    try {
      const authToken = Cookies.get("token");
      const response = await Axios.put(
        `/updatedpassword/`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      ToastSuccess("Password Changed Successfully!");
    } catch (error) {
      ToastError("Failed to update password. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const authTokens = Cookies.get("token");
      await Axios.patch(
        `/deleteprofile`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens}`,
          },
        }
      );
      ToastSuccess("Account Deleted Successfully!!");
      Cookies.remove("token");
      router.push("/signup");
    } catch (error) {
      ToastError("problem in delete account!");
    }
  };

  return (
    <div
      className="rounded mt-5 mb-5 "
    >
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5 mb-3"
              width="150px"
              height="150px"
              src={formValues.profilePhoto || "/default-profile-photo.png"}
              alt="Profile Picture"
            />
            <span className="font-weight-bold mb-3" style={{ marginLeft: "100px" }}>
              <input
                type="file"
                onChange={onFileChange}
              />
            </span>
            <span className="mb-3">
              <button onClick={uploadImage}>upload</button>
            </span>
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
                <label className={`${styles.labels}`}>FirstName*:</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="First Name"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  style={{ fontWeight: "bold" }}
                />
                {firstNameError && <div className="text-danger">{firstNameError}</div>}
              </div>
              <div className="col-md-6">
                <label className={`${styles.labels}`}>LastName*:</label>
                <input
                  type="text"
                  className="form-control fw-bold"
                  name="lastName"
                  placeholder="Surname"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                />
                {lastNameError && <div className="text-danger">{lastNameError}</div>}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className={`${styles.labels}`}>PhoneNumber*:</label>
                <input
                  type="text"
                  className="form-control fw-bold"
                  placeholder="Enter Phone Number"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleInputChange}
                />
                {phoneNumberError && <div className="text-danger">{phoneNumberError}</div>}
              </div>
              <div className="col-md-12">
                <label className={`${styles.labels}`}>Email*:</label>
                <input
                  type="text"
                  className="form-control fw-bold"
                  placeholder="Enter Email ID"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div className="col-md-12">
                <label className={`${styles.labels}`}>YourCar:</label>
                <input
                  type="text"
                  className="form-control fw-bold"
                  placeholder="YourCar"
                  name="yourCar"
                  value={formValues.yourCar}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12">
                <label className={`${styles.labels}`}>FavouruteCar:</label>
                <input
                  type="text"
                  className="form-control fw-bold"
                  placeholder="FavouruteCar"
                  name="favouriteCar"
                  value={formValues.favouriteCar}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12">
                <label className={`${styles.labels}`}>Address:</label>
                <input
                  type="text"
                  className="form-control fw-bold"
                  placeholder="Enter Address Line 1"
                  name="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-12">
                <label className={`${styles.labels}`}>ZipCode:</label>
                <input
                  type="text"
                  className="form-control fw-bold"
                  placeholder="Enter Postcode"
                  name="zipcode"
                  value={formValues.zipcode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className={`${styles.labels}`}>Country:</label>
                  <input
                    type="text"
                    className="form-control fw-bold"
                    placeholder="Country"
                    name="country"
                    value={formValues.country}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className={`${styles.labels}`}>State:</label>
                  <input
                    type="text"
                    className="form-control fw-bold"
                    placeholder="State/Region"
                    name="state"
                    value={formValues.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
              <button
                className={`${styles.profileButton} btn btn-primary`}
                type="button"
                onClick={handleProfileUpdate}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        <div className={`${styles.rightside} col-md-4`}>
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience">
              <u>
                <h4>
                  <span>Edit Password</span>
                </h4>
              </u>
              <button
                className="btn btn-primary me-3"
                onClick={handleChangePassword}
              >
                <i className="fa fa-plus"></i>Change Password
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
              {newPasswordError && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {newPasswordError}
                </div>
              )}
            </div>
            <div className="position-absolute bottom-0 end-0 mb-5 me-5">
              <button
                className="btn btn-danger custom-button"
                onClick={handleDeleteAccount}
              >
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
