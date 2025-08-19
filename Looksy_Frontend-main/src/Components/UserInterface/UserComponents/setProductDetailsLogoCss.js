import { makeStyles } from "@mui/styles";

const useStyles=makeStyles({
    main:{
        width:'100%', 
        background:"linear-gradient(to right, #00093c, #2d0b00)",
        borderRadius:10

    },
    root:{
        color:'#fff',
        fontSize:22,
        fontWeight:'bold',
        textAlign:'center'

    },
    content:{
        color:'#fff',
        padding:10
    },
    quote:{
        color:'#fff',
        marginTop:20,
        fontSize:22,
        textAlign:'center',
        fontWeight:'bold',
        letterSpacing:1
    }

})
export default useStyles