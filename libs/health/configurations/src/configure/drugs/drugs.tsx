import { Card, CardContent, CardHeader, Chip, Grid, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import  Axios  from 'axios';
import { useEffect, useState } from 'react';
import { BehaviorSubject, combineLatest, map, Subject, tap } from 'rxjs';
import styles from './drugs.module.scss';
import { drugmaster } from './drugsmaster';
import Highlighter from 'react-highlight-words'
/* eslint-disable-next-line */
export interface DrugsProps {}
const searchSubject = new Subject<string>();
const drugs = new BehaviorSubject<any[]>([])
export function ConfigureDrugs(props: DrugsProps) {
  // Get Drugs Data : 
    const [druglist,setdruglist]=useState<any[]>(drugmaster); 
    const [searchText,setsearchText]=useState<string>('')
    const [searchResult,setsearchResult]=useState<any>({})
    useEffect(()=>{
        //           
          setdruglist( drugmaster.map(value => ( {...value,
                type: value.drugName.indexOf('AND')>0 ? 'COMPOSITE':'SINGLE',
                quantity: Number( value.drugQuan.match(/(Qty:\d*)/)?.at(0)?.split(":")[1] ) } )  ).sort( (a,b)=> b.quantity - a.quantity   )  ); 
          const sub = combineLatest ( [searchSubject.asObservable(),drugs.asObservable() ]).pipe(       
              tap( ([search,_])=> setsearchText(search))       ,
              map( ([search,druglist])=>  ({ search, searchlist: druglist.filter(item=>  item.drugName.match(new RegExp(search.replace(' ','.*'),'ig') )  )
                           })  )
          ).subscribe( ( {search,searchlist} )=>{
            const singleq = searchlist.filter(( (i) => i.type==='SINGLE' && i.quantity > 0 )).slice(0,10)
            const singleqn = searchlist.filter(( (i)=> i.type==='SINGLE' && i.quantity === 0 )).slice(0,10)
            const compositeq = searchlist.filter((i=> i.type!=='SINGLE' && i.quantity > 0 )).slice(0,10)
            const compositeqn = searchlist.filter((i=> i.type!=='SINGLE' && i.quantity === 0 )).slice(0,10);
            setsearchResult({singleq,singleqn,compositeq,compositeqn});
           
          });
          
          return ()=>{
                sub.unsubscribe();
          }
    },[]); 
  useEffect(()=>{
       drugs.next(druglist);
  },[druglist])
  interface ResultCardProps{
      list:any[],
      heading:string,
      bgColor?:string
  }
  const ResultCard = (props:ResultCardProps )=> <Card sx={{p:0,m:1,backgroundColor:props.bgColor||'blue',color:'white'}} color='info'  >
                            <Typography  variant='h5' sx={{m:1}} > {props.heading} </Typography>
                            <CardContent sx={{p:0,m:0,backgroundColor:'white',color:'black'}}  >
                                <List sx={{p:0}}>
                                    { props.list.map( (item,index )=> 
                                        <ListItemButton key={index} sx={{p:1,m:0,width:'100%',border:1}} >                                                                                     
                                          <Typography      variant='caption' >
                                              <Highlighter highlightClassName='mark' textToHighlight={item.drugName}  searchWords={searchText.split(' ')} />
                                            </Typography>
                                          {item.quantity>0 ?
                                          <Chip  label={item.quantity}  /> 
                                           : null }
                                        </ListItemButton>
                                         ) 
                                        }
                                </List>
                            </CardContent>
                        </Card>
  return (
    <div className={styles['container']}>
          <Grid container my={2}>
              <Grid item md={12}>
                  <TextField onChange={(e)=> searchSubject.next(e.target.value) } fullWidth  label='Search Drug' />
              </Grid>
              <Grid item container spacing={0}  md={12}>
                    <Grid item md={3}  >
                          <ResultCard heading={'Individual ( Qty > 0 )'} list={searchResult.singleq||[]} />
                    </Grid>
                    <Grid item md={3}>
                          <ResultCard heading={'Individual ( Qty = 0 )'} bgColor='red' list={searchResult.singleqn||[]} />
                    </Grid>
                    <Grid item md={3}>
                          <ResultCard heading={'Composite  ( Qty > 0 )'}  list={searchResult.compositeq||[]} />
                    </Grid>
                    <Grid item md={3}>
                          <ResultCard  heading={'Composite ( Qty = 0 )'} bgColor='red' list={searchResult.compositeqn||[]} />
                    </Grid>
              </Grid>
          </Grid>
    </div>
  );
}

export default ConfigureDrugs;
