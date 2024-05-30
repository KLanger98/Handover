import { Grid, Stack, Title, Divider, Space } from '@mantine/core'
import { Container } from '..' 
import { SignInItem } from '..'
import { IconCirclePlus } from '@tabler/icons-react'
import './SignIns.scss'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';

const SignIns = ({ title='', signIns=[] }) => {


  return (
    <Container> 
      <Stack gap={0}>
        {/* SignIns Title */}
        <Grid b={15} >
          <Grid.Col span={8} p={0}>
            <Title order={3} c='blue-grey.9' align='left' pb={20} pt={25} pl={30}>
              {title} 
            </Title>
          </Grid.Col>
         
        </Grid>
  
        <Divider />

        <Stack gap={0}>
          <AnimatePresence initial={false}>
          {
            signIns.map((item) =>  <SignInItem  key={`${item._id}`} item={item} />) 
          } 



          </AnimatePresence>
           <Space h={20} />
        </Stack>
      </Stack>
    </Container>
  ) 

}

//Type Validation
SignIns.propTypes = {
  title: PropTypes.string,
  signIns: PropTypes.array,
};

export default SignIns