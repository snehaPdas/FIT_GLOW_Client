import React, { ChangeEvent, FormEvent, useState } from 'react';
import { AppDispatch, RootState } from "../../app/store";
import { submitKyc } from "../../actions/TrainerAction";
import { useSelector, useDispatch } from 'react-redux';
import Loading from "../spinner/loading";

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

  const { trainerInfo, loading } = useSelector(
    (state: RootState) => state.trainer
  );
  const trainer_id = trainerInfo.id;
  let toks: any = localStorage.getItem("accesstoken");

  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.append("trainer_id", trainer_id!);
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    if (formData.adhar) form.append('adhar', formData.adhar);
    if (formData.adharback) form.append('adharback', formData.adharback);
    if (formData.certificate) form.append('certificate', formData.certificate);
    if (formData.profileImage) form.append('profileImage', formData.profileImage);

    try {
      await dispatch(submitKyc({ formData: form }));
    } catch (error) {
      console.log(error, error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      {loading && <Loading />}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-extrabold text-center text-[#572c52]">
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
            className="mt-1 p-4 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#572c52]"
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
            className="mt-1 p-4 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#572c52]"
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
            className="mt-1 p-4 w-full border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#572c52]"
          />
        </div>

        {/* Profile Image */}
        <div className="mb-6">
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#572c52] hover:file:bg-blue-100"
          />
          {previews.profileImage && (
            <img
              src={previews.profileImage}
              alt="Profile preview"
              className="mt-2 w-32 h-32 object-cover border rounded-xl"
            />
          )}
        </div>

        {/* Other Image Fields with Previews */}
        {['adhar', 'adharback', 'certificate'].map((imageField, index) => (
          <div className="mb-6" key={imageField}>
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
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#572c52] hover:file:bg-blue-100"
            />
          </div>
        ))}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#572c52] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#6a3d72] transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TrainerKyc;
