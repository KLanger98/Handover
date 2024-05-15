import { useState } from 'react'
import './TickBox.scss'
import { IconFlagFilled } from '@tabler/icons-react'
const TickBox = () => {
  const [hover, setHover] = useState(false);
  return (
    <div className="tickbox" 
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      >
      <div className="box">
        <div className='tick' >
          <IconFlagFilled size={17} className='flag'
            color={ 
              hover ? 'var(--mantine-color-red-3)' : 'transparent'} 
          />
        </div>
      </div>
    </div>
  )
}

export default TickBox