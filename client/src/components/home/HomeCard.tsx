import React from 'react'
import { Card, CardActionArea, IconButton } from '@material-ui/core'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Router from "next/router";

interface Props {
    title: string,
    addItems: any,
    favorite: boolean,
    color: string,
    url: string,
    id: string
}

const HomeCard: React.FC<Props> = ({title, addItems, favorite, color, url, id}) => {

    const doRedirect = () => {
        console.log("HFUOHFOUHAOE");
        Router.push({
            pathname: '/board',
            query: {
                title: title,
                favorite: favorite,
                color: color,
                url: url,
                id: id
            }
        })
    }

    return (
        <div>
            <CardActionArea onClick={doRedirect} style={{marginTop: '10px'}}>
                <Card style={{backgroundColor: color, height: '90px', textAlign: 'left'}}>
                        <div style={{color: 'white', fontSize: '17px', fontWeight: 'bold', marginLeft: '10px', marginTop: '10px'}}>
                            {title}
                        </div>
                </Card>
            </CardActionArea>
            {
                favorite ?
                    <IconButton itemID={title} onClick={addItems} style={{marginTop: '-80px', marginLeft: '72%', marginBottom: '-20px'}}>
                        <StarBorderIcon style={{height: '17px', color: 'yellow'}} />
                    </IconButton> :
                    <IconButton itemID={title} onClick={addItems} style={{marginTop: '-80px', marginLeft: '72%', marginBottom: '-20px'}}>
                        <StarBorderIcon style={{height: '17px', color: 'white'}} />
                    </IconButton>
            }
        </div>
    )
}

export default HomeCard
