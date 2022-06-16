import { Grid, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './configurations-home.module.scss';
interface NavigateOption{
    label:string,
    location:string,
    icon:string
}
/* eslint-disable-next-line */
export interface ConfigurationsHomeProps {}

const configure_options:NavigateOption[]=[
    {label:'Locations',location:'locations',icon:'location_city'},
    {label:'Drugs',location:'drugs',icon:'medication'}
]
export function ConfigurationsHome(props: ConfigurationsHomeProps) {
  const navigate = useNavigate()
  return (
    <div className={styles['container']}>
      <Typography variant='h5'></Typography>
      <Grid container    >
        <Grid item md={6} xs={12}>
      <List >
          { configure_options.map(option=> 
            <ListItem key={option.location} onClick={()=>navigate(option.location)}>
              <ListItemButton>
                <ListItemAvatar>
                    <Icon> {option.icon} </Icon>
                </ListItemAvatar>
                <ListItemText primary={option.label}  ></ListItemText>
                <IconButton><Icon>arrow_right</Icon> </IconButton>
              </ListItemButton>
            </ListItem> )
            }
      </List>
      </Grid>
      </Grid>
    </div>
  );
}

export default ConfigurationsHome;
