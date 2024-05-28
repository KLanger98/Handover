import { Grid, Stack, Title, Divider, Space } from '@mantine/core'
import { Container } from '..' 
import { ReferralItem } from '..'
import { IconCirclePlus } from '@tabler/icons-react'
import './Referrals.scss'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect }  from 'react';

const Referrals = ({ title='', incomplete=[], inprogress=[], completed=[]}) => {
  const navigate = useNavigate();

  // useEffect(() => {
  // console.log('Referrals', incomplete, inprogress, completed)
  // }, [incomplete, inprogress, completed])

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
              <IconCirclePlus size={30} onClick={() => navigate('/app/referrals/new')}/>
            </div>
          </Grid.Col>
        </Grid>
  
        <Divider />

        <Stack gap={0}>
          <AnimatePresence initial={false}>
          {
            incomplete.map((item) =>  <ReferralItem  key={`incomplete-${item._id}`} item={item} />) 
          } 
          <Space h={10} key='space-1' />
          { inprogress.length > 0 && (
             <>
              <Title initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x:'100%'}} order={6} p={10} pl={25} c='columbia-blue.6'>In-progress</Title>
              <Divider />
              {
                inprogress.map((item) =>  <ReferralItem   key={`inprogress-${item._id}`} item={item} />) 
              } 
            </> 
          )} 
          <Space h={10} key='space-2' />
          { completed.length > 0 && (
            <>
            <Title order={6} p={10} pl={25} c='red.6'>Completed</Title>
              <Divider />
              {
                completed.map((item) =>  <ReferralItem key={`completed-${item._id}`} item={item} />) 
              } 
            </> 
          )}
          </AnimatePresence>
           <Space h={20} />
        </Stack>
      </Stack>
    </Container>
  ) 

}

//Type Validation
Referrals.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  incomplete: PropTypes.array,
  inprogress: PropTypes.array,
  completed: PropTypes.array
};

export default Referrals