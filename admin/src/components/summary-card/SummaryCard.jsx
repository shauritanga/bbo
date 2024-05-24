import React from 'react'
import './card.css';
import { IoTimerOutline } from 'react-icons/io5';

function SummaryCard({total, info, icon}) {
  return (
    <div className='summary-card'>
        <div className="detail">
              <span>{total}</span>
              {info}
        </div>
        <div className="icon">
          {icon}
        </div>
    </div>
  )
}

export default SummaryCard