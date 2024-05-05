import { useMantineTheme } from '@mantine/core'

const HomeButton = () => {
    const theme = useMantineTheme();
  return (
    <div style={{ 
        width:"35px",
        height:"35px", 
        borderRadius: theme.radius['sm'], 
        backgroundColor: theme.colors["columbia-blue"][3],
        alignContent: "center",
        fontSize: '18px',
        fontWeight: 500,
        color: "white"
    }}>D</div>
  )
}

export default HomeButton