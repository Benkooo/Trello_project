import React from 'react'
import { Card, CardActionArea, IconButton } from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

interface Props {
    title: string,
    addItems: any
}

const HomeCard: React.FC<Props> = ({title, addItems}) => {
    return (
        <div>
            <CardActionArea style={{marginTop: '10px'}}>
                <Card style={{backgroundColor: '#0464a4', height: '90px', textAlign: 'left'}}>
                        <div style={{color: 'white', fontSize: '17px', fontWeight: 'bold', marginLeft: '10px', marginTop: '10px'}}>
                            {title}
                        </div>
                </Card>
            </CardActionArea>
            <IconButton itemID={title} onClick={addItems} style={{marginTop: '-80px', marginLeft: '72%', marginBottom: '-20px'}}>
                <FavoriteBorderIcon style={{height: '17px', color: 'white'}} />
            </IconButton>
        </div>
    )
}

export default HomeCard