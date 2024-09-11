import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function FloatWebinar() {

    const navigate = useNavigate();

    const handleClick =()=>{
        navigate('/')
    }
  return (
   
    <div className="floatwebinar-container" onClick={handleClick}>
      <div className="floatwebinar-outer-container">
      <i class="fa-solid fa-comments"></i>
      <p>Upcoming Webinars</p>

      </div>
      
      
    </div>
  );
}
