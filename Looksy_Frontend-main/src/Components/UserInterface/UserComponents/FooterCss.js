import { makeStyles } from "@mui/styles";


export const useStyles=makeStyles({
    mainContainer:{
        width:'98.9vw',
        height:'auto',
        background:'linear-gradient(90deg, rgba(36,0,0,0.9251050762101716) 0%, rgba(224,2,208,1) 11%, rgba(121,9,43,0.8914916308320203) 96%, rgba(255,0,74,0.5777661406359419) 100%)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexWrap:'wrap'
    },
    box:{
        width:'90%',
        height:'35vh',
        color:'#FFF',
        marginLeft:168,
        display:'flex',
        flexWrap:'wrap'
    },
    center:{
        display:'flex',
        flexDirection:'column',
    },
    aStyles:{
        textDecoration:'none',
        color:'#FFF',
        '&:hover': {
            textDecoration: 'underline',
            color: '#341f97'
          },
        lineHeight: '180%'
    },
    iconStyles:{
        color:'#FFF'
    },
    iconRow:{
        display:'flex'
    },
    mainContainerMobile:{
        marginTop:20,
        width:'98.4vw',
        height:'auto',
        background:'linear-gradient(90deg, rgba(36,0,0,0.9251050762101716) 0%, rgba(224,2,208,1) 11%, rgba(121,9,43,0.8914916308320203) 96%, rgba(255,0,74,0.5777661406359419) 100%)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexWrap:'wrap'
    },
    boxMobile:{
        width:'75%',
        height:'72vh',
        color:'#FFF',
        marginLeft:25
        
    },

})