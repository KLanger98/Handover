import { PropTypes } from 'prop-types'
import { Text, Avatar } from '@mantine/core'
import './UserStamp.scss'
import {images} from '../../../assets';

const UserStamp = ({ user }) => {

  const imageUrl = user?.imageUrl; //Set to karl if doesn't exist
  
  return (
    <div className='user-details'>
      
      <Avatar
                  variant="filled"
                  radius="xl"
                  size="sm"
                  color="columbia-blue.6"
                  src={imageUrl}
                  alt="Your Avatar"
                
                >
                  {user.initials}
                </Avatar>
       
      
      <Text className='user-name' size='xs' c='var(--mantine-color-blue-9)'>
        {user.fullName}
      </Text>
    </div>
  );
};

UserStamp.propTypes = {
  user: PropTypes.object
}

export default UserStamp