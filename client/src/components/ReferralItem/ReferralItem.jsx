import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Text } from '@mantine/core';
import { TickBox, Priority } from '..'
import { IconTrash } from '@tabler/icons-react';
import './ReferralItem.scss';
import PropTypes from 'prop-types';


const ReferralItem = ( { item={}, type='task' } ) => {
  const [ mainHover, setMainHover ] = useState(false);
  const [ trashHover, setTrashHover ] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setMainHover(true)} 
      onMouseLeave={() => setMainHover(false)}
      className={'activity-item' + (mainHover ? ' hover' : '')}
      onClick={() => navigate(`/app/referrals/${item._id}`)}
      >
      <Grid p={0} offset={0}>
          <Grid.Col span={1} py={2}>
            <div style={{ display: 'flex', justifyContent:'center' }}>
             
              <TickBox />
              <Priority priority={item.priority} />
            </div>
          </Grid.Col>

          {/* Item Title */}
          <Grid.Col span={3} p={2}>
             
              <Text size='sm' c={ !mainHover ? 'var(--mantine-color-blue-9' : 'var(--mantine-color-brown-6)'}>
                  {item.title}
              </Text>
          </Grid.Col>

          {/* Item Description */}
          <Grid.Col span={ type == 'tasks' ? 7 : 5} p={3}>
          <Text size='sm' c='var(--mantine-color-brown-9'>
                  {item.desc}
              </Text>
             
          </Grid.Col>
          
          {/* User Details (if referral)*/}
          <Grid.Col span={2} p={2}>
            
              <div className='user-details'>
                <div className='img-container'>
                  <img  alt={item.assignedBy.fullName} />
                </div>
                <Text className='user-name' size='sm' c='var(--mantine-color-blue-9)'>
                  {item.assignedBy.fullName}
                </Text>
              </div>
            

          </Grid.Col>
          


          <Grid.Col span={1} p={2} style={{ display: 'flex'}}>
            {
              /* Space Filler */
              !mainHover && <div style={{ height:'25px' }} />
            }
            { 
            mainHover &&  <IconTrash 
              size={17} 
              onMouseEnter={()=> setTrashHover(true)} 
              onMouseLeave={()=> setTrashHover(false)}
              color={trashHover ? 'red' : 'black'}
              />
            }
           
          </Grid.Col>
      </Grid>
    </div>
  )
}

ReferralItem.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string
};

export default ReferralItem