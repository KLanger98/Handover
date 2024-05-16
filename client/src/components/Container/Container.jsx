import ropTypes from 'prop-types';
import './Container.scss'

const Container = ({ children }) => {
  return (
    <div className='activity-container'>

        {children}

    </div>
  )
}

Container.propTypes = {

  children: ropTypes.node
}

export default Container