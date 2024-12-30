import React, { ChangeEvent, FormEvent, useState } from 'react';
import { AppDispatch, RootState } from "../../app/store";
import {submitKyc} from "../../actions/TrainerAction"
import { AsyncThunkAction, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';



function TrainerKyc() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    adhar: null,
    adharback: null,
    certificate: null,
    profileImage: null,
  });

  const [previews, setPreviews] = useState({
    adhar: null,
    adharback: null,
    certificate: null,
    profileImage: null,
  });
  const {  trainerInfo } = useSelector(
    (state: RootState) => state.trainer
  );
    const trainer_id=trainerInfo.id
  let toks: any = localStorage.getItem("accesstoken");

  const dispatch = useDispatch<AppDispatch>();


  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.append("trainer_id",trainer_id!)

    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    if (formData.adhar) form.append('adhar', formData.adhar);
    if (formData.adharback) form.append('adharback', formData.adharback);
    if (formData.certificate) form.append('certificate', formData.certificate);
    if (formData.profileImage) form.append('profileImage', formData.profileImage);

    console.log('Form submitted:', formData);
    try {
        await dispatch(submitKyc( {formData:form })); 

    } catch (error) {
        console.log(error,error)
    }
  };
  


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
          Verification Form
        </h2>

        {/* Text Fields */}
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your valid email address"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Profile Image */}
        <div className="mb-4">
          <label
            htmlFor="profileImage"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#572c52] hover:file:bg-blue-100"
          />
          {previews.profileImage && (
            <img
              src={previews.profileImage}
              alt="Profile preview"
              className="mt-2 w-32 h-32 object-cover border rounded-md"
            />
          )}
        </div>

        {/* Other Image Fields with Previews */}
        {['adhar', 'adharback', 'certificate'].map((imageField, index) => (
          <div className="mb-4" key={imageField}>
            <label
              htmlFor={imageField}
              className="block text-sm font-medium text-gray-700"
            >
              {['Adhar', 'Adhar Back', 'Certificate'][index]}
            </label>
            <input
              type="file"
              id={imageField}
              name={imageField}
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#572c52] hover:file:bg-blue-100"
            />
            {/* {previews[imageField] && (
              <img
                src={previews[imageField]}
                alt={`${imageField} preview`}
                className="mt-2 w-32 h-32 object-cover border rounded-md"
              />
            )} */}
          </div>
        ))}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-[#572c52] text-white rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TrainerKyc;
function dispatch(arg0: AsyncThunkAction<any, { formData: FormData; }, { state?: unknown; dispatch?: ThunkDispatch<unknown, unknown, UnknownAction>; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown; }>) {
    throw new Error('Function not implemented.');
}

