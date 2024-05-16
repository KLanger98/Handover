import {Button, Title} from '@mantine/core'
import { HomeSquareIcon } from '../components'
import { useState } from 'react'
import { PropTypes } from 'prop-types'
  
const HomeButton = ({ content='' }) => {
    const [hover, setHover] = useState(false);

    content = content.trim();
    const firstLetter = content[0];
    return (
        <Button 
            onMouseEnter={()=>setHover(true)}
            onMouseLeave={()=>setHover(false)}
            variant='dashboard'
            leftSection={<HomeSquareIcon hover={hover} setHover={setHover} content={firstLetter} height="30px" width="30px"/>} 
            rightSection={<span />}
            justify='left'
            w='100%'
            >
            <Title order={4} size={20}
            >
                {content}
            </Title>
            </Button>
    )
}

HomeButton.propTypes = {
    content: PropTypes.string
};


export default HomeButton