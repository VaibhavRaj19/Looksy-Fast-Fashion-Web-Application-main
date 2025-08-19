import React from 'react';
// Styles
import { useStyles } from './FooterCss';
// Components
import { Grid } from '@mui/material';
// Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// Media Query 
import useMediaQuery from '@mui/material/useMediaQuery';


export default function Footer(props) {
  var classes=useStyles()
  const matches = useMediaQuery('(max-width:1150px)');
    
  return (
    <div>
    
      {matches?
      <div className={classes.mainContainerMobile}>
       <div className={classes.boxMobile}>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <h4>COMPANY</h4>
                <div className={classes.center}>
                 <a href='#!' className={classes.aStyles}>About Us</a>
                 <a href='#!' className={classes.aStyles}>Term and Condition</a>
                 <a href='#!' className={classes.aStyles}>Collaboration</a>
                 <a href='#!' className={classes.aStyles}>Privacy Policy</a>
                 <a href='#!' className={classes.aStyles}>Shipping Policy</a>
                 <a href='#!' className={classes.aStyles}>Media</a>
                </div>              
            </Grid>
            <Grid item xs={6}>
                <h4>NEED HELP</h4>
                <div className={classes.center}>
                 <a href='#!' className={classes.aStyles}>FAQs</a>
                 <a href='#!' className={classes.aStyles}>Email Us</a>
                 <a href='#!' className={classes.aStyles}>Return, Refund and Cancellation Policy</a>
                 <a href='#!' className={classes.aStyles}>Track Order</a>
                 <a href='#!' className={classes.aStyles}>Carrer</a>
                 <a href='#!' className={classes.aStyles}>Site Map</a>
                </div>
            </Grid>
            <Grid item xs={6}>
                <h4>LOCATION</h4>
                <div className={classes.center}>
                    14, Infront Of Park Hem Singh Ki <br/> Pared, Sindhu Adarsh Colony,<br/> Hem singh Ki Pared, Gwalior, Madhya Pradesh<br/> 474011<br/>
                </div>
            </Grid>
            <Grid item xs={6}>
                <h4>LET'S BE FRIENDS</h4>
                <div className={classes.iconRow}>
                 <a href='#!' className={classes.iconStyles}> <FacebookIcon fontSize="large" /></a>
                 <a href='#!' className={classes.iconStyles}><InstagramIcon fontSize="large" /></a>
                 <a href='#!' className={classes.iconStyles}> <WhatsAppIcon fontSize="large" /></a>
                 <a href='#!' className={classes.iconStyles}> <LinkedInIcon fontSize="large" /></a>
                </div>
            </Grid>
        </Grid>
      </div></div>:
      <div className={classes.mainContainer}>
       <div className={classes.box}>
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <h4>COMPANY</h4>
                <div className={classes.center}>
                 <a href='#!' className={classes.aStyles}>About Us</a>
                 <a href='#!' className={classes.aStyles}>Term and Condition</a>
                 <a href='#!' className={classes.aStyles}>Collaboration</a>
                 <a href='#!' className={classes.aStyles}>Privacy Policy</a>
                 <a href='#!' className={classes.aStyles}>Shipping Policy</a>
                 <a href='#!' className={classes.aStyles}>Media</a>
                </div>              
            </Grid>
            <Grid item xs={3}>
                <h4>NEED HELP</h4>
                <div className={classes.center}>
                 <a href='#!' className={classes.aStyles}>FAQs</a>
                 <a href='#!' className={classes.aStyles}>Email Us</a>
                 <a href='#!' className={classes.aStyles}>Return, Refund and Cancellation Policy</a>
                 <a href='#!' className={classes.aStyles}>Track Order</a>
                 <a href='#!' className={classes.aStyles}>Carrer</a>
                 <a href='#!' className={classes.aStyles}>Site Map</a>
                </div>
            </Grid>
            <Grid item xs={3}>
                <h4>LOCATION</h4>
                <div className={classes.center}>
                    14, Infront Of Park Hem Singh Ki <br/> Pared, Sindhu Adarsh Colony,<br/> Hem singh Ki Pared, Gwalior, Madhya Pradesh<br/> 474011<br/>
                </div>
            </Grid>
            <Grid item xs={3}>
                <h4>LET'S BE FRIENDS</h4>
                <div className={classes.iconRow}>
                 <a href='#!' className={classes.iconStyles}> <FacebookIcon fontSize="large" /></a>
                 <a href='#!' className={classes.iconStyles}><InstagramIcon fontSize="large" /></a>
                 <a href='#!' className={classes.iconStyles}> <WhatsAppIcon fontSize="large" /></a>
                 <a href='#!' className={classes.iconStyles}> <LinkedInIcon fontSize="large" /></a>
                </div>
            </Grid>
        </Grid>
      </div>
      </div>
      }
    </div> 
  );
}


