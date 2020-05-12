import React, { useState, MouseEvent } from 'react'
import { Typography, Grid, CardActionArea, Card } from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import HomeCard from './HomeCard';

interface Props {
}

const HomeBoard: React.FC<Props> = () => {
    
    const [ favoriteItems ] = useState(Array<string>())

    const addItems = (e: MouseEvent) => {
        e.preventDefault()
        const id = e.currentTarget.getAttribute("itemid")
        const test = id as string
        favoriteItems.push(test)
        console.log(favoriteItems)
    }

    return (
        <div style={{
            margin: '40px 0 0',
            padding: '0 66px',
            maxWidth: '1200px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <FavoriteBorderIcon style={{color: '#3b526f'}}/>
                <Typography style={{fontWeight: 'bold', marginLeft: '20px', color: '#3b526f'}}>
                    Favorite Boards
                </Typography>
            </div>
            <div style={{textAlign: 'center' }}>
                {favoriteItems.map((num) => 
                    <p>
                        {num}
                    </p>
                )}
            </div>

            <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center' }}>
                <PersonOutlineIcon style={{color: '#3b526f'}}/>
                <Typography style={{fontWeight: 'bold', marginLeft: '20px', color: '#3b526f'}}>
                    Personal Boards
                </Typography>
            </div>


            <div style={{textAlign: 'center' }}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <HomeCard addItems={addItems} title="Bistro"/>
                    </Grid>
                    <Grid item xs={4}>
                        <HomeCard addItems={addItems} title="Corewar"/>
                    </Grid>
                    <Grid item xs={4}>
                        <HomeCard addItems={addItems} title="Minishell"/>
                    </Grid>
                    <Grid item xs={4}>
                        <HomeCard addItems={addItems} title="Printf"/>
                    </Grid>
                    <Grid item xs={4}>
                        <CardActionArea style={{marginTop: '10px'}}>
                            <Card style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height: '90px' }}>
                                Create new board
                            </Card>
                        </CardActionArea>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default HomeBoard;