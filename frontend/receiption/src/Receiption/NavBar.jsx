
import { assets } from '../assets/assets'


const Navbars = () => {


  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo1} alt="" />

    </div>
  )
}

export default Navbars
