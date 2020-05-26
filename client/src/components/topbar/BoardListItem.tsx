import React from 'react'
import { ListItem, Typography, Card } from '@material-ui/core'
import Router from "next/router"

interface Props {
    title: string,
    favorite: boolean,
    color: string,
    url: string,
    id: string
}

const BoardListItem: React.FC<Props> = ({title, favorite, color, url, id}) => {

    const doRedirect = () => {
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
            <ListItem onClick={doRedirect} button style={{backgroundColor: '#E7E3DE', borderRadius: '4px', marginTop: '5px'}}>
                <Card style={{width: '25px', height: '25px', marginTop: '0px', backgroundColor: color}}>
                </Card>
                <Typography style={{fontSize: '15px', marginLeft: '25px', fontWeight: 'bold', color: '#3b526f'}}>
                    {title}
                </Typography>
            </ListItem>
        </div>
    )
}

export default BoardListItem
