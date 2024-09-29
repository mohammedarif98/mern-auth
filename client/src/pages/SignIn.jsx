import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import OAuth from '../components/OAuth'



const SignIn = () => {

  const [ formData,setFormData ] = useState({ email: "",password: "" });
  // const [ loading,setLoading ] = useState(false);
  // const [ error,setError ] = useState(false)
  const { loading,error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event)=>{
    setFormData({ ...formData,[event.target.id]:event.target.value })
  }

  const handleSubmit = async(event)=>{
    event.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart());
      // setError(false);
      // const response = await fetch("http://localhost:4000/api/auth/signin",formData);
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      // setLoading(false);
      if(data.success === false){
        // setError(true);
        dispatch(signInFailure(data))
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
      // setLoading(false);
      // setError(true);
      dispatch(signInFailure(error))
    }
  }

  return (
    <div className="p-4 max-w-lg mx-auto ">
      <h1 className="text-3xl my-10 text-center font-bold">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={ handleSubmit }>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          id="email"
          className="bg-slate-100 p-3 rounded-sm"
          onChange = { handleChange }
          value = { formData.email }
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          id="password"
          className="bg-slate-100 p-3 rounded-sm"
          onChange = { handleChange }
          value = { formData.password }
        />
        <button className="p-3 mt-3 bg-slate-900 text-white uppercase hover:opacity-85 disabled:opacity-60"
          disabled={ loading || !formData.email || !formData.password }>
          {loading ? 'Loading ....' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-4 mt-2">
        <p className="">Dont have an account ?</p>
        <Link to="/sign-up">
          <span className="text-sky-800 font-medium">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 text-center my-2">{error ? error.message || "someting went wrong!" : "" }</p>
    </div>
  )
}



export default SignIn