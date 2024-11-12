import reactImage from '../assets/react.svg';
import { Button } from './buttons/Buttons';

export default function QRModal({ onClose }) {

  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border
        border-blue-950 rounded-2xl bg-[#030712] w-11/12 max-w-[30rem] z-50"
      >
        <div className='w-full py-4 px-6'>
          <h3 className="text-center text-2xl text-gray-50 font-semibold">
            Mon QR Code
          </h3>
        </div>
        <div className="py-4 w-full border-t border-b border-blue-950 flex flex-col items-center
          justify-center gap-3"
        >
          <div className="w-full max-w-72 aspect-square rounded-lg flex-shrink-0 bg-gray-800">
            <img src={reactImage} alt="your qr code" className='w-full h-full object-contain' />
          </div>
          <div className='text-center text-gray-300 px-6'>
            <p>Partagez votre QR Code avec les associations pour recevoir vos points!</p>
          </div>
        </div>
        <div className='w-full py-4 px-6'>
          <Button 
            styleType="secondary" 
            className="w-full" 
            onClick={() => onClose(false)}
          >
            Fermer
          </Button>
        </div>
      </div>
      <div 
        className="fixed top-0 left-0 w-full h-full bg-black/50 z-10 backdrop-blur-sm filter-active"
        onClick={() => onClose(false)}
      />
    </>
  )
}