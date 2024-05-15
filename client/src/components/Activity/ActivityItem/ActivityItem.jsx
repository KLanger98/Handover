import { Grid, Text } from '@mantine/core';
import { TickBox } from '../../'
import PropTypes from 'prop-types';


const ActivityItem = ( { item={} } ) => {
  return (
    <Grid p={3}>
        <Grid.Col span={1} p={2}>
            <TickBox />
        </Grid.Col>

        {/* Item Title */}
        <Grid.Col span={3} p={2}>
            <Text size='sm' c='var(--mantine-color-blue-9'>
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
        <Grid.Col span={3} p={2}>

        </Grid.Col>
    </Grid>
  )
}

ActivityItem.propTypes = {
  item: PropTypes.object
};

export default ActivityItem