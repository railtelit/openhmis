/* eslint-disable no-var */
//import styles from './appointment-cards.module.scss';
import { Card, CardContent, Typography, Box, Fab, Icon, CardMedia, Grid, Checkbox, Button, IconButton, Menu, MenuItem, List, Stack  } from '@mui/material';
import React, {useState, useEffect, useRef} from "react";
import Fade from '@mui/material/Fade';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppointmentCardsProps {}

var cardInfo:any = [];
var appointment_sno:any;
var appointment_image:any;

export function AppointmentCards(props: AppointmentCardsProps) {

  const [image, setImage] = useState("assets/images/users/user_image.png");
  const inputRef = useRef<HTMLInputElement>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function tConvert (time:any) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice (1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    return time.join ('');
  }

  useEffect(() => {

    const loadUsers = async () => {

      cardInfo = [];

      const response = await axios.get('http://at.erpapps.in/fhir/Appointment?_include=Appointment:patient');
      const posts = response.data.entry;
      //console.log("Appointment Data:- "+ JSON.stringify(posts));

      for (var i = 0; i < posts.length; i++){

        if(posts[i].resource.resourceType.startsWith('Appointment')){

          const participant = posts[i].resource.participant;
          //console.log("participant" + JSON.stringify(participant));

          for (var j = 0; j < participant.length; j++){

            var reference = participant[j].actor.reference;

            if(reference.startsWith("Patient")){

              var patient = participant[j].actor.display;
              //console.log("participant patient:- " + patient);

            }else if(reference.startsWith("Practitioner")){

              var doctor = participant[j].actor.display;
              //console.log("participant doctor:- " + doctor);
            }
          }

          var appointment_time = posts[i]?.resource?.start;
          var appointment_type = posts[i]?.resource?.appointmentType?.coding[0]?.code;

          var item:any = {};
            item ["patient"] = patient;
            item ["doctor"] = doctor;
            item ["appointment_type"] = appointment_type;
            item ["appointment_time"] = tConvert (appointment_time.substring(11, 16));
            item ["button_id"] = "button_"+Number(i+1);
            item ["image_id"] = "image_"+Number(i+1);
            item ["sno"] = Number(i+1);

            cardInfo.push(item);
        }
      }

      console.log("JSON:- " + JSON.stringify(cardInfo));

    }
    loadUsers();
  }, [])

  function showButton(e:any){
    e.target.style.opacity = 1;
  }

  function hideButton(e:any){
    e.target.style.opacity = 0;
  }

  const handleButtonClick = (event:any) => {
    appointment_sno = event.currentTarget.value;
    inputRef.current!.click();
  };

  const onImageChange = (event:any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    document.getElementById("image_"+appointment_sno)!.setAttribute( 'src', URL.createObjectURL(event.target.files[0]));
  };

  const handleError = () => setImage("assets/images/users/user_image.png");


  return (

      <Grid container>

          {cardInfo.map((card:any, index:any) => (

              <Card key={index} sx={{width: '25%', backgroundColor: 'white', color: 'black', padding: "10px", boxShadow: "3px 5px 10px 2px rgba(0, 0, 0, 0.5)"}}>

                {/* , backgroundImage: backgroundImage, backgroundPosition: 'right', backgroundRepeat: "no-repeat", border: "1px solid",*/}
                  {/* sx={{backgroundColor: (theme) => theme.palette.info.main,color: 'white'}} */}

                  <CardContent sx={{padding: 0,"&:last-child": {paddingBottom: 0}}}>

                      <Box display="flex" alignItems="flex-start">
                          {/* <Icon style={{ color: 'black', fontSize: 30 }}>more_vert</Icon> */}

                          <IconButton aria-label="more" id="fade-button" aria-controls={open ? 'fade-menu' : undefined} aria-expanded={open ? 'true' : undefined} aria-haspopup="true" onClick={handleClick} >
                              <Icon style={{ color: 'black', fontSize: 30 }}>more_vert</Icon>
                          </IconButton>

                        <Menu id="fade-menu" MenuListProps={{ 'aria-labelledby': 'fade-button', }} anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade} >
                          <MenuItem onClick={handleClose}>Edit</MenuItem>
                          <MenuItem onClick={handleClose}>Cancel</MenuItem>
                        </Menu>

                        <Box sx={{marginLeft: 'auto'}}>
                            <Typography variant="h5" fontWeight="700">
                                {card.doctor}
                            </Typography>
                        </Box>
                      </Box>

                      <Grid container>
                          <Grid item md={3}>
                              <Box display="flex" alignItems="flex-start" style={{ display:'flex', justifyContent:'center' }} className='image_box'>
                                  <CardMedia id={card.image_id} component="img" sx={{ width: 50, height: 50 }} image={image} onError={handleError} />
                              </Box>
                              <Box display="flex" alignItems="flex-start" style={{ display:'flex', justifyContent:'center' }}>

                                  <input type="file" ref={inputRef} onChange={onImageChange} className="filetype" hidden/>
                                  <Button value={card.sno} onClick={handleButtonClick} onMouseOver={e => { showButton(e) }} onMouseLeave={e => { hideButton(e) }} sx={{ opacity: 0 }}><Icon style={{ color: 'black', fontSize: 30 }}>camera_alt</Icon></Button>
                              </Box>
                          </Grid>

                          <Grid item md={7}>
                              <Grid item md={12}>
                                <Box sx={{marginLeft: 'auto'}}>
                                    <Typography variant="h5" fontWeight="600">
                                        {card.patient}
                                    </Typography>
                                </Box>
                              </Grid>
                              <Grid item md={12}>
                                <Box sx={{marginLeft: 'auto'}}>
                                    <Typography variant="h3" fontWeight="800">
                                        {card.appointment_time}
                                    </Typography>
                                </Box>
                              </Grid>
                              <Grid item md={12}>
                                <Box sx={{marginLeft: 'auto'}}>
                                    <Typography variant="h6" fontWeight="500">
                                        {card.appointment_type}
                                    </Typography>
                                </Box>
                              </Grid>
                          </Grid>
                          <Grid item md={2} sx={{ display:'flex', justifyContent:'center', flexDirection: 'column', alignItems: 'flex-start' }}>
                              <Checkbox sx={{color: "#6745b5", transform: `scale(1.5)` }} icon={<Icon>how_to_reg</Icon>} checkedIcon={<Icon>how_to_reg</Icon>}/>
                          </Grid>
                      </Grid>
                  </CardContent>
              </Card>
          ))}
      </Grid>
    );
}

export default AppointmentCards;
