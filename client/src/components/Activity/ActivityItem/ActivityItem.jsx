import { useState } from 'react';
import { Grid, Text } from '@mantine/core';
import { TickBox } from '../../'
import { IconTrash } from '@tabler/icons-react';
import './ActivityItem.scss';
import PropTypes from 'prop-types';


const ActivityItem = ( { item={} } ) => {
  const [ mainHover, setMainHover ] = useState(false);
  const [ trashHover, setTrashHover ] = useState(false);
  return (
    <div
      onMouseEnter={() => setMainHover(true)} 
      onMouseLeave={() => setMainHover(false)}
      className={'activity-item' + (mainHover ? ' hover' : '')}
      >
      <Grid p={0} offset={0}>
          <Grid.Col span={1} py={2}>
              <TickBox />
          </Grid.Col>

          {/* Item Title */}
          <Grid.Col span={3} p={2}>
              <Text size='sm' c={ !mainHover ? 'var(--mantine-color-blue-9' : 'var(--mantine-color-red-2)'}>
                  {item.title}
              </Text>
          </Grid.Col>

          {/* Item Description */}
          <Grid.Col span={5} p={3}>
          <Text size='sm' c='var(--mantine-color-brown-9'>
                  {item.desc}
              </Text>
          </Grid.Col>
          
          {/* User Details (if referral)*/}
          <Grid.Col span={2} p={2}>

          </Grid.Col>
          <Grid.Col span={1} p={2}>
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

ActivityItem.propTypes = {
  item: PropTypes.object
};

export default ActivityItem