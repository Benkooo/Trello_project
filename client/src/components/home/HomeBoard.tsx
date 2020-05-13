import React, { useState, MouseEvent } from 'react'
import { Typography, Grid, CardActionArea, Card } from '@material-ui/core'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import HomeCard from './HomeCard';

interface Props {
}

const HomeBoard: React.FC<Props> = () => {
    
    const [ favoriteItems, setFavoriteItems ] = useState(Array<string>())

    const addItems = (e: MouseEvent) => {
        e.preventDefault()
        const id = e.currentTarget.getAttribute("itemid")
        const toString = id as string
        setFavoriteItems([
            ...favoriteItems, toString
        ])
    }

    const removeItems = (e: MouseEvent) => {
        e.preventDefault()
        const id = e.currentTarget.getAttribute("itemid")
        const toString = id as string
        setFavoriteItems(
            favoriteItems.filter(item => item !== toString)
        )
    }

    return (
        <div style={{
            margin: '40px 0 0',
            padding: '0 66px',
            maxWidth: '1200px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <StarBorderIcon style={{color: '#3b526f'}}/>
                <Typography style={{fontWeight: 'bold', marginLeft: '20px', color: '#3b526f'}}>
                    Starred Boards
                </Typography>
            </div>
            <div style={{textAlign: 'center' }}>
                <Grid container spacing={3}>
                        {favoriteItems.map((value: string, index: number) => (
                            <Grid key={index} item xs={4}>
                                <HomeCard addItems={removeItems} title={value} favorite={true}/>
                            </Grid>
                        ))}
                </Grid>
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
                        <HomeCard addItems={addItems} title="Bistro" favorite={false}/>
                    </Grid>
                    <Grid item xs={4}>
                        <HomeCard addItems={addItems} title="Corewar" favorite={false}/>
                    </Grid>
                    <Grid item xs={4}>
                        <HomeCard addItems={addItems} title="Minishell" favorite={false}/>
                    </Grid>
                    <Grid item xs={4}>
                        <HomeCard addItems={addItems} title="Printf" favorite={false}/>
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