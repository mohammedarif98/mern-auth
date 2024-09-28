import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";


const Profile = () => {

  const fileRef = useRef(null);
  const [image,setImage] = useState(undefined);
  const [imgUploadPercentage,setImgUploadPercentage] = useState(0);
  const [imageError,setImageError] = useState(false);
  const [formData,setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  // console.log(formData);

  useEffect(()=>{
    if(image){
      handleFileUpload(image)
    }
  },[image]);
  
  const handleFileUpload = async(image)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,image);

    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        // console.log('uploading is progress ' + progress + " % done");
        setImgUploadPercentage(Math.round(progress));
    },
    (error)=>{
      setImageError(true);
      console.error('File upload error:', error);  
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData,profilePicture: downloadURL })
      });
    }
    );
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-20">Profile Page</h1>
      <form className="flex flex-col gap-5">
        <input type="file" ref={ fileRef } hidden accept="image/*" onClick={ (event)=>setImage(event.target.files[0]) } />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt=""
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
          onClick={() => fileRef.current.click()}
        />

        <p className="text-sm self-center ">
          {imageError ? (
            <span className="text-red-800">Error in uploading image (file size must be less than 4mb)</span>
          ) : imgUploadPercentage > 0 && imgUploadPercentage < 100 ? (
            <span className="text-slate-600">{`Uploading: ${imgUploadPercentage}%`}</span>
          ) : imgUploadPercentage === 100 ? (
            <span className="text-green-500">Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>

        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="username"
          className="bg-slate-200 rounded-lg p-3"
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="bg-slate-200 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-200 rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg upperCase hover:opacity-95 disabled:opacity-70">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-800 font-semibold cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-800 font-semibold cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
