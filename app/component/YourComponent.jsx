'use client'
import { useDispatch, useSelector } from 'react-redux';
import { sendDataToAPI } from '../lib/features/counter/counterSlice';

export const YourComponent = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.counter);

  const handleSendData = () => {
    dispatch(sendDataToAPI(state));
    alert('data is send successfully')
  };

  return (
    <button className=' cursor-pointer outline' 
    onClick={handleSendData}
    >
      Send Data to API
    </button>
  );
};
