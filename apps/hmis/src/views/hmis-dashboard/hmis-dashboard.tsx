import styles from './hmis-dashboard.module.scss';
import { Card, CardContent, Typography, Box, Fab, Icon, Grid, Container, Button, Modal, ButtonGroup, TextField } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCards from '../dashboard-cards/dashboard-cards'
import DashboardCharts from '../dashboard-charts/dashboard-charts'
import { useState } from 'react';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface HmisDashboardProps {}

export function HmisDashboard(props: HmisDashboardProps) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {

    setIsActive(current => !current);

    // setIsActive(true);
  };

  return (

    <Container >
      <Grid container spacing={2}>

        <Grid item xs={12}  sm={4} lg={4}>

            <DashboardCards backgroundImage="url('assets/images/dashboard_content/patient.ico')" text_heading='Registered Patients' text_total='49' total_count='Total Patient : 58' text_sub='Today: 10' color='white' color_bg='rgb(30, 136, 229)'/>
        </Grid>
        <Grid item xs={12} sm={4} lg={4}>

            <DashboardCards backgroundImage="url('assets/images/dashboard_content/doctor.ico')" text_heading='Total Doctors' text_total='25' total_count='Consultants: 18' text_sub='Medical Officers: 0' color='white' color_bg='rgb(255, 88, 88)'/>
        </Grid>
        <Grid item xs={12} sm={4} lg={4}>

            <DashboardCards backgroundImage="url('assets/images/dashboard_content/appointment.ico')" text_heading='Total Appointments' text_total='39' total_count='Completed: 15' text_sub='Pending: 10' color='white' color_bg='rgb(183, 172, 238)'/>
        </Grid>

        <Grid item xs={12} sm={4} lg={4}>
            <DashboardCharts/>
        </Grid>

        <Grid item xs={12} sm={4} lg={4}>

          <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" aria-setsize={16}>
              <Box sx={style}>
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                    <div
                      className="accordion-button"
                      //type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                      data-size="A4"
                      style={{ backgroundColor: "lightgray",marginTop:'0px'}}
                    >
                      Aceto AminoPhene 500mg
                    </div>
                  </h2>
                </div>
              </div>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div>
                    <h2>Dosage</h2>
                  </div>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>

                    <Box
                      // className="tabActive"
                      sx={{
                        border: '2px solid #EAEAEA',
                        borderRadius: '25px',
                        padding: '5px',
                        width: '95px',
                        height: '35px',
                        textAlign: 'center',
                        // background: '#EAEAEA'
                        backgroundColor: isActive ? '#9543AA' : '',
                        color: isActive ? 'white' : '',
                      }}
                      onClick={handleClick}
                      >Tab 1</Box>

                    </Grid>
                    <Grid item xs={2}>
                      <Button

                        variant="contained"
                        style={{

                          borderRadius: 28,
                        }}

                      >

                        2 Tab
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        className="example"
                        variant="contained"
                        style={{
                          borderRadius: 28,
                        }}
                      >
                        Custom
                      </Button>
                    </Grid>
                  </Grid>
                  <br></br>
                  <div>
                    <h2>Frequency</h2>
                  </div>
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <ButtonGroup
                        style={{ borderRadius: "60" }}
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        <Button className="example" style={{ color: "black" }}>
                          Morning
                        </Button>
                        <Button className="example">Afternoon</Button>
                        <Button className="example" style={{}}>
                          Evening
                        </Button>
                      </ButtonGroup>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        className="example"
                        variant="contained"
                        style={{
                          borderRadius: 28,
                          width: "100px",
                        }}
                      >
                        SOS
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        className="example"
                        variant="contained"
                        style={{
                          borderRadius: 28,
                          width: "100px",
                        }}
                      >
                        QID
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        className="example"
                        variant="contained"
                        style={{
                          borderRadius: 28,
                          width: "150px",
                        }}
                      >
                        After Lunch
                      </Button>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Button
                        className="example"
                        variant="contained"
                        style={{
                          borderRadius: 28,
                          width: "200px",
                        }}
                      >
                        Before Bedtime
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        className="example"
                        variant="contained"
                        style={{
                          borderRadius: 28,
                          width: "200px",
                        }}
                      >
                        Once a week
                      </Button>
                    </Grid>
                  </Grid>
                  <br></br>
                  <div>
                    <h2>
                      Days&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Starting
                      From
                    </h2>
                  </div>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      {/* <RemoveIcon onClick={decNum}>-</RemoveIcon>

                      <input
                        type="text"
                        style={{ width: "50px", textAlign: "center" }}
                        value={num}
                        onChange={handleChange}
                      />

                      <AddIcon onClick={incNum}>+</AddIcon> */}
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        className="example"
                        variant="contained"
                        style={{
                          borderRadius: 28,
                          width: "120px",
                        }}
                      >
                        Today
                      </Button>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        className="example"
                        variant="contained"
                        style={{
                          borderRadius: 28,
                          width: "150px",
                        }}
                      >
                        Tomorrow
                      </Button>
                    </Grid>
                  </Grid>
                  <div>
                    <TextField
                      style={{
                        marginLeft: "40px",
                        width: "600px",
                      }}
                      id="standard-basic"
                      label="Special Instruction"
                      variant="standard"
                    />
                    <br></br>
                  </div>
                </div>
              </div>
              <Button
                style={{ color: "black", fontWeight: "700", marginLeft: "280px" }}
                variant="text"
              >
                {/* <AddIcon /> */}
                Add More
              </Button>
              <br></br>

              <Button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  marginLeft: "150px",
                  width: "400px",
                }}
                variant="contained"
              >
                CONFIRM
              </Button>
              </Box>
            </Modal>
          </div>
        </Grid>

      </Grid>

    </Container>
  );
}

export default HmisDashboard;
