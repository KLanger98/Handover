import PropTypes from 'prop-types';
import './Container.scss'

const Container = ({ children, p='' }) => {

  const padding = p.includes('px') ? p : `${p}px`;

  return (
    <div className='activity-container' style={{ padding }}>

        {children}

    </div>
  )
}

Container.propTypes = {

  children: PropTypes.node,
  p: PropTypes.string,
}

export default Container