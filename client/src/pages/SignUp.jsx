import {useState} from "react";
import { Link } from "react-router-dom";

const SignUp = () => {

  const [formData,setFormData] = useState({});
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleChange = (event)=>{
    setFormData({...formData,[event.target.id]:event.target.value})
  }

  const handleSubmit = async(event)=>{
    event.preventDefault();
    try {
      setLoading(true);
      setError(false);
      // const response = await fetch("http://localhost:4000/api/auth/signup",formData);
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if(data.success === false){
        setError(true);
        // Display error message for 5 seconds and then hide it
        setTimeout(() => {
          setError(false);
        }, 5000);
        return;
      }
    } catch (error) {
      setLoading(false);
      console.error('There was an error signing up:', error);
      setError(true);
      // Display error message for 5 seconds and then hide it
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }

  return (
    <div className="p-4 max-w-lg mx-auto ">
      <h1 className="text-3xl my-10 text-center font-bold">Sign-Up</h1>
      <form className="flex flex-col gap-4" onSubmit={ handleSubmit }>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          id="username"
          className="bg-slate-100 p-3 rounded-sm"
          onChange = { handleChange }
          />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          id="email"
          className="bg-slate-100 p-3 rounded-sm"
          onChange = { handleChange }
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          id="password"
          className="bg-slate-100 p-3 rounded-sm"
          onChange = { handleChange }
        />
        <button className="p-3 mt-3 bg-slate-900 text-white uppercase hover:opacity-85 disabled:opacity-60"
          disabled={ loading || !formData.username || !formData.email || !formData.password}>
          {loading ? 'Loading ....' : 'Sign-Up'}
        </button>
      </form>
      <div className="flex gap-4 mt-2">
        <p className="">Have an account ?</p>
        <Link to="/sign-in">
          <span className="text-sky-800 font-medium">Sign-In</span>
        </Link>
      </div>
      <p className="text-red-700 text-center my-2">{error && "someting went wrong!"}</p>
    </div>
  );
};

export default SignUp;
