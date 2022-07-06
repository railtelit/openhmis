//import styles from './appointment-cards.module.scss';
import { Card, CardContent, Typography, Box, Fab, Icon, CardMedia, Grid, Checkbox, Button, IconButton, Menu, MenuItem   } from '@mui/material';
import React, {useState, useEffect} from "react";
import Fade from '@mui/material/Fade';
import axios from 'axios';

export interface AppointmentCardsProps {

  text_doctor: string;
  color?:string;
  color_bg?:string;
  patient_name: string;
  appointment_time: string;
  appointment_type: string;
  icon?: string;
  checked_icon?: string;
}

var jsonObj:any = [];

export function AppointmentCards(props: AppointmentCardsProps) {

  const color = props.color;
  const color_bg = props.color_bg;
  const [style, setStyle] = useState({display: 'none'});


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {

    const loadUsers = async () => {

      const response = await axios.get('http://at.erpapps.in/fhir/Appointment?_include=Appointment:patient');
      const posts = response.data.entry;
      //console.log("Appointment Data:- "+ JSON.stringify(posts));

      for (var i = 0; i < posts.length; i++){

        if(posts[i].resource.resourceType.startsWith('Appointment')){

          const participant = posts[i].resource.participant;
          //console.log("participant" + participant);

          for (var j = 0; j < participant.length; j++){

            if(participant[j].actor.reference.startsWith('Patient')){

              var patient_name = participant[j].actor.display;
              //console.log("Appointment:- "+ patient_name);

            }else if(participant[j].actor.reference.startsWith('Practitioner')){

              var doctor_name = participant[j].actor.display;
              //console.log("Appointment:- "+ doctor_name);
            }

            var appointment_type = posts[i].resource.appointmentType.coding[i].code;
            var appointment_time = posts[i].resource.start;

            var item:any = {};
            item ["patient_name"] = patient_name;
            item ["doctor_name"] = doctor_name;
            item ["appointment_type"] = appointment_type;
            item ["appointment_time"] = appointment_time;

            jsonObj.push(item);
            console.log("JSON:- " + JSON.stringify(jsonObj));

            //console.log("Appointment:- "+ patient_name +" - "+ doctor_name +" - "+ appointment_time +" - "+ appointment_type);
          }


        }
      }
    }
    loadUsers();
  }, [])


  return (

    <Card sx={{backgroundColor: color_bg, color: color, padding: "10px", boxShadow: "3px 5px 10px 2px rgba(0, 0, 0, 0.5)"}}>

      {/* , backgroundImage: backgroundImage, backgroundPosition: 'right', backgroundRepeat: "no-repeat", border: "1px solid",*/}
        {/* sx={{backgroundColor: (theme) => theme.palette.info.main,color: 'white'}} */}

        <CardContent sx={{padding: 0,"&:last-child": {paddingBottom: 0} }}>

            <Box display="flex" alignItems="flex-start">
                {/* <Icon style={{ color: 'black', fontSize: 30 }}>more_vert</Icon> */}

                <IconButton aria-label="more" id="fade-button" aria-controls={open ? 'fade-menu' : undefined} aria-expanded={open ? 'true' : undefined} aria-haspopup="true" onClick={handleClick} >
                    <Icon style={{ color: 'black', fontSize: 30 }}>more_vert</Icon>
                </IconButton>

              <Menu id="fade-menu" MenuListProps={{ 'aria-labelledby': 'fade-button', }} anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade} >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Cancel</MenuItem>
                <MenuItem onClick={handleClose}>Postponed</MenuItem>
              </Menu>

              <Box sx={{marginLeft: 'auto'}}>
                  <Typography variant="h5" fontWeight="700">
                      {props.text_doctor}
                  </Typography>
              </Box>

            </Box>

            <Grid container>
                <Grid item md={3} onMouseEnter={e => { setStyle({display: 'block'}); }} onMouseLeave={e => { setStyle({display: 'none'}) }}>
                    <Box display="flex" alignItems="flex-start" style={{ display:'flex', justifyContent:'center' }} className='image_box'>
                        <CardMedia component="img" sx={{ width: 50, height: 50 }} image="assets/images/users/user_image.png" />
                    </Box>
                    <Box display="flex" alignItems="flex-start" style={{ display:'flex', justifyContent:'center' }}>
                        <Button style={style}><Icon style={{ color: 'black', fontSize: 30 }}>camera_alt</Icon></Button>
                    </Box>

                </Grid>
                <Grid item md={7}>
                    <Grid item md={12}>
                      <Box sx={{marginLeft: 'auto'}}>
                          <Typography variant="h5" fontWeight="600">
                              {props.patient_name}
                          </Typography>
                      </Box>
                    </Grid>
                    <Grid item md={12}>
                      <Box sx={{marginLeft: 'auto'}}>
                          <Typography variant="h2" fontWeight="800">
                              {props.appointment_time}
                          </Typography>
                      </Box>
                    </Grid>
                    <Grid item md={12}>
                      <Box sx={{marginLeft: 'auto'}}>
                          <Typography variant="h5" fontWeight="500">
                              {props.appointment_type}
                          </Typography>
                      </Box>
                    </Grid>
                </Grid>
                <Grid item md={2} sx={{ display:'flex', justifyContent:'center', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Checkbox sx={{color: "#6745b5", transform: `scale(1.5)` }} icon={<Icon>{props.icon}</Icon>} checkedIcon={<Icon>{props.checked_icon}</Icon>}/>
                </Grid>
            </Grid>

        </CardContent>

    </Card>

  );
}

export default AppointmentCards;
