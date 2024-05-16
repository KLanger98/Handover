import { useMantineTheme } from '@mantine/core'
import { PropTypes } from 'prop-types'

const HomeSquareIcon = ({content , height='35px', width='35px', hover}) => {

    const theme = useMantineTheme();

    const styles = {
        default: { 
            transition: 'ease-out .5s',
            width: width,
            height: height, 
            borderRadius: theme.radius['sm'], 
            backgroundColor: theme.colors["columbia-blue"][3],
            alignContent: "center",
            fontSize: '18px',
            fontWeight: 500,
            color: "white"
        },

        hover: {
            width: width,
            height: height, 
            borderRadius: theme.radius['sm'], 
            backgroundColor: theme.colors["columbia-blue"][6],
            alignContent: "center",
            fontSize: '18px',
            fontWeight: 500,
            color: "white"
            
        }
    }

    const currentStyle = hover ? { ...styles.default, ...styles.hover } : styles.default;
   
  return (
    <div 
    style={currentStyle}
    >{content}</div>
  )
}

HomeSquareIcon.propTypes = {
    content: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    hover: PropTypes.bool
}


export default HomeSquareIcon