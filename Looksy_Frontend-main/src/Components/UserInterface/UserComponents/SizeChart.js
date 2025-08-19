import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import Slide from '@mui/material/Slide';

import size from "../../../Assets/sizeShirt.png";

import { useStyles } from './SizeChartCss';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


export default function SizeChart(props){
   var classes = useStyles()
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const signupDialog = () => {
        return (<div>
            <BootstrapDialog
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                PaperProps={{ sx: { position: "fixed", top: 0, right: 0, m: 0 } }}
                fullWidth
                maxWidth="xs"
                scroll='body'
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <div style={{ fontSize: 25,color:'#02475b',marginTop:10,display:'flex',justifyContent:'center' }}>SIZE GUIDE</div>
                </BootstrapDialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <div className={classes.sizechart}>
                       <table>
                        <tr>
                            <th className={classes.sizeguide}>SIZE</th>
                            <th className={classes.sizeguide}>CHEST</th>
                            <th className={classes.sizeguide}>LENGTH</th>
                            <th className={classes.sizeguide}>SLEEVE</th>
                        </tr>
                        
                        <tr>
                            <td className={classes.sizeguide1}>M</td>
                            <td className={classes.sizeguide1}>101</td>
                            <td className={classes.sizeguide1}>68</td>
                            <td className={classes.sizeguide1}>63</td>
                        </tr>
                        <tr>
                            <td className={classes.sizeguide1}>L</td>
                            <td className={classes.sizeguide1}>106</td>
                            <td className={classes.sizeguide1}>70</td>
                            <td className={classes.sizeguide1}>65</td>
                        </tr>
                        <tr>
                            <td className={classes.sizeguide1}>XL</td>
                            <td className={classes.sizeguide1}>112</td>
                            <td className={classes.sizeguide1}>71</td>
                            <td className={classes.sizeguide1}>66</td>
                        </tr>
                        <tr>
                            <td className={classes.sizeguide1}>XXL</td>
                            <td className={classes.sizeguide1}>117</td>
                            <td className={classes.sizeguide1}>72</td>
                            <td className={classes.sizeguide1}>67</td>
                        </tr>
                        
                        </table> 
                        </div>
                        <div style={{fontWeight:600,display:'flex',justifyContent:'center',marginTop:10}}>All measurements of the garment are (in cms)</div>
                    </Grid> 
                    <Grid item xs={12}>
                        <div className={classes.shirtimg}>
                    <img src={size} style={{width:'60%',height:'auto',marginTop:17}} alt="" />
                    </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{fontWeight:500,fontSize:24}}>
                        How To Measure:
                        </div>
                        <div style={{fontWeight:500,fontSize:15}}>
                        Not sure about sweatshirt size? Follow the below instructions:
                        </div>
                        <div style={{fontWeight:400,fontSize:13}}>
                            <ul type="disc">
                             <li>Keep your body relaxed to get precise dimensions.</li>   
                             <li><b>Chest:</b>Measure from under arms around the chest,</li>   
                             <li><b>Shoulder:Measure</b> from the left shoulder tip to the right shoulder tip.</li>   
                             <li><b>Length:</b>Measure from highest point of the shoulder to bottom edge.</li>   
                             <li><b>Sleeve:</b>Measure from the shoulder to the wrist.</li>   
                            </ul>

                        </div>
                    </Grid>   

                    </Grid>
                </DialogContent>
            </BootstrapDialog>
        </div>)
    }




    return(<div>
         <div onClick={handleClickOpen} style={{  fontWeight:600 ,fontSize:18 ,color:'#51CCCC',cursor:'pointer' }}>
            SIZE CHART
        </div>

        {signupDialog()}
      
    </div>)
}