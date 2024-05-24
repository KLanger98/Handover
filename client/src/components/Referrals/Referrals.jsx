import { Grid, Stack, Title, Divider, Space } from '@mantine/core'
import { Container } from '..' 
import { ReferralItem } from '..'
import { IconCirclePlus } from '@tabler/icons-react'
import './Referrals.scss'
import PropTypes from 'prop-types';


const Referrals = ({ title='', incomplete=[], inprogress=[], completed=[]}) => {


  console.log("Incomplete", incomplete.length)

  console.log("In-Progress", inprogress.length)

  console.log("Completed", completed.length)

  return (
    <Container> 
      <Stack gap={0}>
        {/* Referrals Title */}
        <Grid b={15} >
          <Grid.Col span={8} p={0}>
            <Title order={3} c='blue-grey.9' align='left' pb={20} pt={25} pl={30}>
              {title} 
            </Title>
          </Grid.Col>
          <Grid.Col span={4} p={0}>
            <div className="addReferral">
              <IconCirclePlus size={30}  />
            </div>
          </Grid.Col>
        </Grid>
  
        <Divider />

        <Stack gap={0}>
          {
            incomplete.map((item, index) =>  <ReferralItem key={index}  item={item} />) 
          } 
          <Space h={10} />
          { inprogress.length > 0 && (
            <>
              <Title order={6} p={10} pl={25} c='columbia-blue.6'>In-progress</Title>
              <Divider />
              {
                inprogress.map((item, index) =>  <ReferralItem key={index}  item={item} />) 
              } 
            </> 
          )} 
          <Space h={10} />
          { completed.length > 0 && (
            <>
            <Title order={6} p={10} pl={25} c='red.6'>Completed</Title>
              <Divider />
              {
                completed.map((item, index) =>  <ReferralItem key={index} item={item} />) 
              } 
            </> 
          )}
           <Space h={20} />
        </Stack>
      </Stack>
    </Container>
  ) 

}

//Type Validation
Referrals.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array
};

export default Referrals