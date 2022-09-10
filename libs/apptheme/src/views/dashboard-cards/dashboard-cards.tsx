//import styles from './dashboard-cards.module.scss';
import { Card, CardContent, Typography, Box, Fab, Icon, CardMedia } from '@mui/material';
// import {FeatherIcon} from 'feather-icons-react';

/* eslint-disable-next-line */
export interface DashboardCardsProps {

  text_heading: string;
  total_count: string;
  text_total: string;
  text_sub: string;
  color?:string
  color_bg?:string
  backgroundImage?:string;
}


export function DashboardCards(props: DashboardCardsProps) {

  const color = props.color;
  const color_bg = props.color_bg;
  const backgroundImage = props.backgroundImage;

  return (

    <Card sx={{backgroundColor: color_bg, color: color, backgroundImage: backgroundImage, backgroundPosition: 'right', backgroundRepeat: "no-repeat"}}>
        {/* sx={{backgroundColor: (theme) => theme.palette.info.main,color: 'white'}} */}

        <CardContent>
            <Box display="flex" alignItems="flex-start">
                <Typography variant="h3" fontWeight="700" sx={{marginBottom: '0'}} gutterBottom>
                    {props.text_heading}
                </Typography>
                <Box sx={{marginLeft: 'auto'}}>
                    <Typography variant="h3" fontWeight="700" sx={{ marginBottom: '0' }} gutterBottom>
                        {props.text_total}
                    </Typography>
                </Box>
                {/* <CardMedia component="img" sx={{ width: 111 }} image="assets/images/dashboard_content/rb_logo_app.png" /> */}
            </Box>
            <Typography variant="h4" fontWeight="500" sx={{ marginBottom: '0' }} gutterBottom>
                {props.total_count}
            </Typography>

            <Box display="flex" alignItems="flex-start" sx={{ marginBottom: '0', marginTop: '20px' }}>
                <Typography variant="h4" fontWeight="500" sx={{ marginBottom: '0' }} gutterBottom>
                    {props.text_sub}
                </Typography>
                {/* <Box sx={{marginLeft: 'auto'}}>
                    <Icon>list</Icon>
                </Box> */}
            </Box>


        </CardContent>

    </Card>

  );
}

export default DashboardCards;
