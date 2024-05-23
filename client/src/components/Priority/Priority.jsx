import { PropTypes } from 'prop-types'
import './Priority.scss'

const Priority = ( info ) => {
  return (
    <div className="priority">
        <div className="ballBox">
          <div className={`ball ${info.priority}`}>

          </div>
        </div>
    </div>
  )
}

Priority.propTypes = {
  priority: PropTypes.string
}
export default Priority