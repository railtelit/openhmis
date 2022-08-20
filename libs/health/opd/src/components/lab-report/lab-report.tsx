import styles from './lab-report.module.scss';
import {Typography, Box,Fab,Icon,Grid,Container,Button,Modal,TextField,Checkbox} from '@mui/material';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import MuiToggleButton from '@mui/material/ToggleButton';
import { styled } from '@mui/material/styles';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from 'react-router-dom';

const ToggleButton = styled(MuiToggleButton)({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: '#9543AA',
  },
});
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

/* eslint-disable-next-line */
export interface LabReportProps {}

export function LabReport(props: LabReportProps) {
  const [expanded, setExpanded] = useState();
  const Change = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };






  const [alignment, setAlignment] = useState();
  const handleAlignment = (event: any, newAlignment: any) => {
    setAlignment(newAlignment);
  };



  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles['container']}>
      <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} lg={4}>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" aria-setsize={16} >
              <Box sx={style}>
                <Accordion expanded={expanded === 'panel1'} onChange={Change('panel1')} >
                  <AccordionSummary expandIcon={ expanded === 'panel1' ? <RemoveIcon /> : <AddIcon /> } aria-controls="panel1a-content" id="panel1a-header" style={{ backgroundColor: 'lightgray' }} >
                    <Typography>Lab Test Order</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div>
                        <h2>Templates</h2>
                      </div>
                      <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment" >
                        <ToggleButton style={{ marginRight: '30px', width: '95px', height: '35px', border: '1px solid', borderRadius:28}} value="left" aria-label="left aligned" >
                          Glucose
                        </ToggleButton>
                        <ToggleButton style={{ marginRight: '30px', width: '95px', height: '35px', border: '1px solid', borderRadius: 28, }} value="center" aria-label="centered" >
                         Renal
                        </ToggleButton>
                        <ToggleButton style={{ width: '95px', height: '35px', border: '1px solid', borderRadius: 28, }} value="right" aria-label="right aligned" >
                          Surgical
                        </ToggleButton>
                      </ToggleButtonGroup>

                      <br></br>
                      <div>
                        <h2>Tests</h2>
                      </div>



                      <Checkbox  />  <TextField
          id="outlined-read-only-input"
          style={{width:"650px"}}
          defaultValue="Glucose Tolerance Test 1Hr (GTT1)"

          InputProps={{
            readOnly: true,
            }}
        />
        <br></br><br></br>
                      <Checkbox  /> <TextField
          id="outlined-read-only-input"
          style={{width:"650px",height:"10px"}}
          defaultValue="Glucose Tolerance Test 2Hr (GTT2)"
          InputProps={{
            readOnly: true,
          }}/>

                      <br></br><br></br><br></br>


                      <div>
                        <TextField style={{ marginLeft: '40px', width: '600px', }} id="standard-basic" label="Search" variant="standard" />

                      </div>

                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Button style={{ color: 'black', fontWeight: '700', marginLeft: '280px', }} variant="text" >
                 Save As Template
                </Button>
                <br></br>
                <Button style={{ backgroundColor: 'black', color: 'white', marginLeft: '150px', width: '400px', }} variant="contained" >
                  CONFIRM
                </Button>
              </Box>
            </Modal>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
}

export default LabReport;
