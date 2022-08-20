import styles from './pharmacy.module.scss';
import {Typography, Box,Fab,Icon,Grid,Container,Button,Modal,TextField,} from '@mui/material';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import MuiToggleButton from '@mui/material/ToggleButton';
import { styled } from '@mui/material/styles';
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
export interface PharmacyProps {}

export function Pharmacy(props: PharmacyProps) {
  const [expanded, setExpanded] = useState();
  const Change = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [alignmentf, setAlignmentf] = useState();
  const handleAlignmentf = (event: any, newAlignment: any) => {
    setAlignmentf(newAlignment);
  };

  const [alignmentf2, setAlignmentf2] = useState();
  const handleAlignmentf2 = (event: any, newAlignment: any) => {
    setAlignmentf2(newAlignment);
  };

  const [formats, setFormats] = useState(() => []);
  const handleFormat = (event: any, newFormats: any) => {
    setFormats(newFormats);
  };

  let [num, setNum] = useState(0);
  let incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
    }
  };
  let decNum = () => {
    if (num > 0) {
      setNum(num - 1);
    }
  };
  let handleChange = (e: any) => {
    setNum(e.target.value);
  };

  const [alignment, setAlignment] = useState();
  const handleAlignment = (event: any, newAlignment: any) => {
    setAlignment(newAlignment);
  };

  const [alignmentt, setAlignmentt] = useState();
  const handleAlignmentt = (event: any, newAlignment: any) => {
    setAlignmentt(newAlignment);
  };

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <div className={styles['container']}>

      <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} lg={4}>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" aria-setsize={16} >
              <Box sx={style}>
                <Accordion expanded={expanded === 'panel1'} onChange={Change('panel1')} >
                  <AccordionSummary expandIcon={ expanded === 'panel1' ? <RemoveIcon /> : <AddIcon /> } aria-controls="panel1a-content" id="panel1a-header" style={{ backgroundColor: 'lightgray' }} >
                    <Typography>Aceto AminoPhene 500mg</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div>
                        <h2>Dosage</h2>
                      </div>
                      <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment" >
                        <ToggleButton style={{ marginRight: '30px', width: '95px', height: '35px', border: '1px solid', borderRadius:28}} value="left" aria-label="left aligned" >
                          1 Tab
                        </ToggleButton>
                        <ToggleButton style={{ marginRight: '30px', width: '95px', height: '35px', border: '1px solid', borderRadius: 28, }} value="center" aria-label="centered" >
                          2 Tab
                        </ToggleButton>
                        <ToggleButton style={{ width: '95px', height: '35px', border: '1px solid', borderRadius: 28, }} value="right" aria-label="right aligned" >
                          Custom
                        </ToggleButton>
                      </ToggleButtonGroup>

                      <br></br>
                      <div>
                        <h2>Frequency</h2>
                      </div>

                      <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting" sx={{ border: '1px solid', borderRadius: 28}} >
                        <ToggleButton style={{ height: '35px', borderBottomLeftRadius: 28, borderTopLeftRadius: 28}} value="bold" aria-label="bold" >
                          Morning
                        </ToggleButton>
                        <ToggleButton style={{ height: '35px'}} value="italic" aria-label="italic" >
                          Afternoon
                        </ToggleButton>
                        <ToggleButton style={{ height: '35px', borderBottomRightRadius: 28, borderTopRightRadius: 28}} value="underlined" aria-label="underlined" >
                          Evening
                        </ToggleButton>
                      </ToggleButtonGroup>

                      <ToggleButtonGroup value={alignmentf} exclusive onChange={handleAlignmentf} aria-label="text alignment" >
                        <ToggleButton style={{ marginLeft: '35px', marginRight: '30px', width: '100px', height: '35px', border: '1px solid', borderRadius: '50px', }} value="left" aria-label="left aligned" >
                          SOS
                        </ToggleButton>

                        <ToggleButton style={{ marginRight: '30px', width: '100px', height: '35px', border: '1px solid', borderRadius: '50px', }} value="center" aria-label="centered" >
                          QID
                        </ToggleButton>
                      </ToggleButtonGroup>

                      <ToggleButtonGroup value={alignmentf2} exclusive onChange={handleAlignmentf2} aria-label="text alignment" >
                        <ToggleButton style={{ marginTop: '20px', marginRight: '40px', width: '150px', height: '35px', border: '1px solid', borderRadius: 28, }} value="right" aria-label="right aligned" >
                          After Lunch
                        </ToggleButton>

                        <ToggleButton style={{ marginTop: '20px', width: '150px', height: '35px', border: '1px solid', borderRadius: 28, }} value="riht" aria-label="right aligned" >
                          Before Bedtime
                        </ToggleButton>
                        <ToggleButton style={{ marginLeft: '40px', marginTop: '20px', width: '150px', height: '35px', border: '1px solid', borderRadius: 28, }} value="rht" aria-label="right aligned" >
                          Once a week
                        </ToggleButton>
                      </ToggleButtonGroup>

                      <br></br>
                      <div>
                        <h2>
                          Days&nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Starting
                          From
                        </h2>
                      </div>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <RemoveIcon style={{ height: '15px' }} onClick={decNum} ></RemoveIcon>

                          <input type="text" style={{ width: '60px', height: '25px', textAlign: 'center', }} value={num} onChange={handleChange} />

                          <AddIcon style={{ height: '15px' }} onClick={incNum} ></AddIcon>
                        </Grid>
                        <Grid item xs={2}>
                          <ToggleButtonGroup value={alignmentt} exclusive onChange={handleAlignmentt} aria-label="text alignment">
                            <ToggleButton style={{ width: '95px', height: '35px', border: '1px solid', borderRadius: 28, }} value="left" aria-label="left aligned" >
                              Today
                            </ToggleButton>

                            <ToggleButton style={{ marginLeft: '40px', width: '100px', height: '35px', border: '1px solid', borderRadius: 28, }} value="center" aria-label="centered" >
                              Tomorrow
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </Grid>
                      </Grid>
                      <div>
                        <TextField style={{ marginLeft: '40px', width: '600px', }} id="standard-basic" label="Special Instruction" variant="standard" />
                        <br></br>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Button style={{ color: 'black', fontWeight: '700', marginLeft: '280px', }} variant="text" >
                  <AddIcon /> Add More
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

export default Pharmacy;
