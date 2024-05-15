import ropTypes from 'prop-types';

const Container = ({ children }) => {
  return (
    <div style={{ 
        display: 'block',
        width: "100%",
        padding: '20px',
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, .10)',
        borderRadius: 'var(--mantine-radius-md)'
        }}>

        {children}

    </div>
  )
}

Container.propTypes = {

  children: ropTypes.node
}

export default Container