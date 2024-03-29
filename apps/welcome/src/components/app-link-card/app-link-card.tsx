import { Card, CardContent, Grid } from '@mui/material';
import { width } from '@mui/system';
import styles from './app-link-card.module.scss';

/* eslint-disable-next-line */
export interface AppLinkCardProps {
    title?:string,
    description?:any,
    img?:string,
    reverse?:boolean
}

export function AppLinkCard(props: AppLinkCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800">
      <div className='max-w-screen-xl px-4 py-2 mx-auto space-y-12 lg:space-y-10 lg:py-10 lg:px-6'>
        
        <Card>
        <CardContent sx={{width:'100%'}} >  
          <Grid container  direction={props.reverse?'row-reverse':'row'}>
            <Grid item lg={10} md={10} >
          <h1 className='text-3xl font-extrabold text-purple'>
             {props.title}
          </h1>   
         
            {props.description}
                   
            </Grid>
            <Grid item xs={12} lg md  justifyContent={'right'} textAlign={'center'} justifySelf={'center'} 
                          alignContent={'center'} alignSelf={'center'} alignItems={'center'} >
                <img src={props.img} alt="" height={100} width={100}   />
            </Grid>
          </Grid>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AppLinkCard;
