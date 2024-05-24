import { PropTypes } from 'prop-types'
import { Text } from '@mantine/core'
import './UserStamp.scss'
import {images} from '../../../assets';

const UserStamp = ({ user }) => {

  const imgUrl = user?.imgUrl || images.karlos;  //Set to karl if doesn't exist
  
  return (
    <div className='user-details'>
      <div className='img-container'>
        <img src={imgUrl} alt={user.fullName} />
      </div>
      <Text className='user-name' size='sm' c='var(--mantine-color-blue-9)'>
        {user.fullName}
      </Text>
    </div>
  );
};

UserStamp.propTypes = {
  user: PropTypes.object
}

export default UserStamp