import { PropTypes } from 'prop-types'
import { Pill } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import './ProcessPillGroup.scss'

const ProcessPillGroup = ({processes}) => {
    const navigate = useNavigate()

    const handleProcessClick = (process) => {
        if(process._id){
            navigate(`/app/processes/${process._id}`)
        }
    }
  return (
    <>
   
    <Pill.Group>
      {
        processes.map((process, i) => {
          return <Pill 
            key={`process-${i}`}
            className='process-pill'
            bg='var(--mantine-color-brown-6)'
            c='white'
            onClick={() => handleProcessClick(process)}>{process.processTitle}</Pill>
        })
      }
    </Pill.Group>
  </>
  )
}

ProcessPillGroup.propTypes = {
    processes: PropTypes.array
}

export default ProcessPillGroup