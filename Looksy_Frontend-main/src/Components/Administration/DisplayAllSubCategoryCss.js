import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles({
    mainContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%',
    },
    box:{
        marginLeft:200,
        marginTop:25,
        marginBottom:25,
        width:'53vw',
        height:'auto',
        background:'white',
        borderRadius:10,
    },
    gridStyle:{
        padding:20
    },
    headingText:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontSize:30,
        fontFamily:'Merriweather Sans',
        color: '#01579b',
        letterSpacing:0.5,
        fontWeight:700,    
    },
    center:{
        display:'flex',
        justifyContent:"center",
        alignItems:'center'
    },
})


