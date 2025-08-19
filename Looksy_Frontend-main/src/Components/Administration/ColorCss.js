import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles({
    mainContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
        width:"110%",
        height:"100%",
    },
    box:{
        marginLeft:150,
        width:"48vw",
        height:"auto",
        borderRadius:10,
        background:'white',
        boxShadow:"0px 0px 5px 3px #80808045"
    },
    gridStyle:{
        padding:20
    },
    headingText:{
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





