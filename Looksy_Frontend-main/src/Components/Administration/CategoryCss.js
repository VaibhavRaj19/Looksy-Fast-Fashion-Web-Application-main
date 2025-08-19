import {makeStyles} from '@mui/styles';


export const useStyles = makeStyles({
  
  mainContainer: {
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      width:'100%',
      height:'100%',
      
     },
  box:{
      marginLeft:200,
      background:'white',
      height:'auto',
      width:'55%',
      borderRadius:10,
      boxShadow:'0px 0px 5px 3px #80808045',
    },
  headingText:{
    fontSize:25,
    fontFamily:'Merriweather Sans',
    color: '#01579b',
    letterSpacing:0.5,
    fontWeight:700,
    },
  gridStyle:{
      padding:20,
   },
  center:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }

  });

