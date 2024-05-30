import { Grid, Text } from '@mantine/core';
import './SignInItem.scss';
import PropTypes from 'prop-types';


const SignInItem = ( { item={} } ) => {
  console.log('SignInItem', item)
  const date = formatAustralianDateTime(item.date);

  function formatAustralianDateTime(timestamp) {
    // Create a new Date object using the timestamp
    const date = new  Date(timestamp/1);
    console.log(date)
    // Get the day, month, and year from the date object
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
  
    // Get the hours, minutes, and seconds from the date object
    const time = (date.getUTCHours()+10) + ':' + date.getMinutes();
  
    // Format the date and time in DD/MM/YYYY HH:MM:SS format
    return `${time} - ${day}/${month}/${year}`;
  }
  


  return (
    <div className='activity-item'>
      <Grid p={0} offset={0}>
          <Grid.Col span={1} py={2} />

          {/* Item Date */}
          <Grid.Col span={2} p={2}>
              <Text size='sm' c='var(--mantine-color-blue-9'>
                  {date}
              </Text>
          </Grid.Col>
          
          {/* User Details (if referral)*/}
          <Grid.Col span={3} p={2}>

            
              <div className='user-details'>
                <div className='img-container'>
                  <img  src={item.user.imageUrl} alt={item.user.fullName} />
                </div>
                <Text className='user-name' size='sm' c='var(--mantine-color-blue-9)'>
                  {item.user.fullName}
                </Text>
              </div>
          </Grid.Col>


          <Grid.Col span={6} py={2} />
          
      </Grid>
    </div>
  )
}

SignInItem.propTypes = {
  item: PropTypes.object,
};

export default SignInItem