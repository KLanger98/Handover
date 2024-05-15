import { Stack, Title, Divider } from '@mantine/core'
import { Container } from '..' //I made my own container for styling purposes
import { ActivityItem } from './'
import './Activity.scss'
import PropTypes from 'prop-types';

const Activity = ({ title='', items=[], type='task'}) => {
    

  return (
    <Container> 
      <Stack gap={0}>
        {/* Activity Title */}
        <Title order={3} c='blue-grey.9' align='left' pt={0} pb={7}>
          {title} 
        </Title>
  
        <Divider/>

        <Stack gap={0}>
          {
            items.map((item, index) =>  <ActivityItem key={index} type={type} item={item} />) 
          }  
        </Stack>
      </Stack>
    </Container>
  )

}

//Type Validation
Activity.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.array
};

export default Activity