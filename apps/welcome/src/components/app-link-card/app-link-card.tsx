import { Card, CardContent, Grid } from '@mui/material';
import styles from './app-link-card.module.scss';

/* eslint-disable-next-line */
export interface AppLinkCardProps {
    title?:string,
    description?:string,
    img?:string
}

export function AppLinkCard(props: AppLinkCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800">
      <div className='max-w-screen-xl px-4 py-2 mx-auto space-y-12 lg:space-y-10 lg:py-10 lg:px-6'>
        
        <Card>
        <CardContent>  
          <Grid container >
            <Grid item lg >
          <h1 className='text-3xl font-extrabold text-purple'>
             {props.title}
          </h1>   
          <p>
            {props.description}
          </p>
            </Grid>
            <Grid item xs={12} md={3}  alignContent={'center'} alignSelf={'center'} alignItems={'center'} >
                <img src={props.img} alt="" height={100} width={100} />
            </Grid>
          </Grid>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AppLinkCard;
