import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Menu, Text } from '@mantine/core';
import {  Priority, UserStamp } from '..'
import { IconTrash } from '@tabler/icons-react';
import './ReferralItem.scss';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { DELETE_REFERRAL } from '../../utils/mutation';
import { QUERY_REFERRALS } from '../../utils/queries';
import {motion } from 'framer-motion';


const ReferralItem = ( { item={} } ) => {
  const [ mainHover, setMainHover ] = useState(false);
  const [ trashHover, setTrashHover ] = useState(false);
  const navigate = useNavigate();
  const [deleteReferral] = useMutation(DELETE_REFERRAL, {
    variables: { referralId: item._id },
    refetchQueries: [{ query: QUERY_REFERRALS }]
    });


  const goToReferral = () => {
    navigate(`/app/referrals/${item._id}`)
  }


  const handleDelete = () => {
    deleteReferral();
  }

  return (
    <motion.div
      onMouseEnter={() => setMainHover(true)} 
      onMouseLeave={() => setMainHover(false)}
      className={'activity-item' + (mainHover ? ' hover' : '')}
      key={item._id}
      layout
      initial={{ opacity: 0, height: 0 }} 
      animate={{ opacity: 1, height: 45}}
      exit={{ opacity: 0, height: 0 }}
      >
       
      <Grid p={0} offset={0}>
          <Grid.Col span={{ base: 2, lg: 1, md: 1, sm: 2}} py={2} onClick={() => goToReferral()}>
            <div style={{ display: 'flex', justifyContent:'center' }}>

              <Priority priority={item.priority} />

            </div>
          </Grid.Col>

          {/* Item Title */}
          <Grid.Col span={{ base: 3, lg: 3, md: 3, sm: 2}} p={2} onClick={() => goToReferral()}>
             
              <Text size='sm' c={ !mainHover ? 'var(--mantine-color-blue-9' : 'var(--mantine-color-brown-6)'}>
                  {item.title}
              </Text>
              
          </Grid.Col>

          {/* Item Description */}
          <Grid.Col span={{ base: 5, lg: 5, md: 5, sm: 6 }} p={3} onClick={() => goToReferral()}>
          <Text size='sm' c='var(--mantine-color-brown-9'>
                  {item.desc}
              </Text>
             
          </Grid.Col>
          
          {/* User Details (if referral)*/}
          <Grid.Col span={{ base: 2, lg: 2, md: 2, sm: 1 }} p={2} className='large-only'>
              <UserStamp user={item.assignedBy} />
          </Grid.Col>
          


          <Grid.Col span={1} p={2} style={{ display: 'flex'}} className='large-only'>
            {
              /* Space Filler */
              !mainHover && <div style={{ height:'25px' }} onClick={() => goToReferral()} />
            }
            { 
            mainHover &&  (
            <>
           
                <Menu shadow="md" width={150} transitionProps={{ transition: 'rotate-right', duration: 150 }}>
                  <Menu.Target>
                  <IconTrash 
                size={17} 
                onMouseEnter={()=> setTrashHover(true)} 
                onMouseLeave={()=> setTrashHover(false)}
               
                color={trashHover ? 'red' : 'black'}
                />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item 
                      leftSection={<IconTrash size={15} />}
                      color='red'
                      onClick={() => handleDelete()}
                      >
                      You're Sure?
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            )}
           
          </Grid.Col>
      </Grid>
    </motion.div>
  )
}

ReferralItem.propTypes = {
  item: PropTypes.object,
};

export default ReferralItem