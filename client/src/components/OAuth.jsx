
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase'
import  { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom'
 

export default function OAuth(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async() => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider)
            const response = await fetch('/api/auth/google',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            })
            const data = await response.json()
            console.log('-----> ',data);
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
           console.log("could not login with error ",error.message);    
        }
    }

  return(
    <button type='button' onClick={ handleGoogleClick } className="p-3 mt-0 bg-red-700 text-white uppercase hover:opacity-85 disabled:opacity-60" >
        Login with Google
    </button>
  )
}


