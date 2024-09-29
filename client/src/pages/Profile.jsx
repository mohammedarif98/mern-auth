import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch,useSelector } from "react-redux";
import { updateUserStart,updateUserSuccess,updateUserFailure, deleteUserStart,deleteUserFailure,deleteUserSuccess } from "../redux/user/userSlice";



export default function Profile(){
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState(undefined);
  const [imgUploadPercentage, setImgUploadPercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const { currentUser,loading,error } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('uploading is progress ' + progress + " % done");
        setImgUploadPercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.error("File upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleChange = (event) => {
    setFormData({ ...formData,[event.target.id]: event.target.value })
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await fetch(`/api/user/update-profile/${currentUser._id}`,{
        method : 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if(data.success === false){
        dispatch(updateUserFailure(data));
        return
      }
      dispatch(updateUserSuccess(data));
      // navigate('/');
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }

  const handleDeleteAccount = async() => {
    try {
      dispatch(deleteUserStart())
      const response = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if(data.success === false){
        dispatch(deleteUserFailure(data))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error))
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-20">Profile Page</h1>
      <form className="flex flex-col gap-5" onSubmit={ handleSubmit }>
        <input
          type="file"
          id="profilePicture"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(event) => setImage(event.target.files[0])}
          />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt=""
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
          onClick={() => fileRef.current.click()}
        />

        <p className="text-sm self-center ">
          {imageError ? (
            <span className="text-red-800">
              Error in uploading image (file size must be less than 4mb)
            </span>
          ) : imgUploadPercentage > 0 && imgUploadPercentage < 100 ? (
            <span className="text-slate-600">{`Uploading: ${imgUploadPercentage}%`}</span>
          ) : imgUploadPercentage === 100 ? (
            <span className="text-green-500">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="username"
          className="bg-slate-200 rounded-lg p-3"
          onChange={ handleChange }
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="bg-slate-200 rounded-lg p-3"
          onChange={ handleChange }
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-200 rounded-lg p-3"
          onChange={ handleChange }
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg upperCase hover:opacity-95 disabled:opacity-70"
        disabled={imgUploadPercentage > 0 && imgUploadPercentage < 100}
        >
        { loading ? "Loading ....." : "Update" }
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-800 font-semibold cursor-pointer" onClick={ handleDeleteAccount }>
          Delete Account
        </span>
        <span className="text-red-800 font-semibold cursor-pointer">
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-4 text-center">{ error && "Something went wrong" }</p>
      <p className="text-green-700 mt-4 text-center">{ updateSuccess && "Updated successfully" }</p>
    </div>
  );
};


