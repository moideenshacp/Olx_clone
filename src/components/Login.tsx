import guitar from '../assets/guitar.png'
import google from '../assets/google.png'
import phone from '../assets/phone.png'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/setup'

type popupProp ={
  setLoginPop:any
}

const Login = (props:popupProp) => {

  const googleSignIn = async()=>{
    try {
      await signInWithPopup(auth,googleProvider)
    } catch (error) {
      console.log(error);
      
    }
}

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

  <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:w-96 sm:max-w-lg">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <h1 onClick={()=>props?.setLoginPop(false)} className='font-semibold text-3xl cursor-pointer'>X</h1>
          <div className="sm:flex sm:items-start">
           
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <div className="mt-2">
                <img src={guitar} className='w-28 ml-24'/>
                <p className="text-base font-medium mt-5 text-center">Help us become one of the safest places <br/> to buy and sell.</p>

                <div className='flex border-2 border-black p-2 rounded-md mt-12 cursor-pointer hover:border-4'>
                    <img src={phone} className='w-6 h-6' />
                    <h1 className='font-semibold ml-2'>Continue with phone</h1>
                </div>
                <div onClick={googleSignIn} className='flex border-2 border-gray-200 p-2 rounded-md mt-3 cursor-pointer'>
                    <img src={google} className='w-6 h-6' />
                    <h1 className='font ml-14'>Continue with Google</h1>
                </div>
                <h1 className='text-center mt-4 font-semibold'>OR</h1>
                <h1 className='text-center mt-4 font-semibold underline cursor-pointer'>Login With Email</h1>
                <h1 className='text-center mt-28  text-xs '>All your personal details are safe with us.</h1>
                <h1 className=' text-center mt-4  text-xs '>If you continue, you are accepting <span className='text-blue-600'>OLX Terms and <br/> Conditions and Privacy Policy</span> </h1>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  </div>
</div>

  )
}

export default Login
