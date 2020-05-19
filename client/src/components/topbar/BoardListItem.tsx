import React from 'react' 
import { ListItem, Typography, Card } from '@material-ui/core'

interface Props {
}

const BoardListItem: React.FC<Props> = ({ }) => {
    return (
        <div>
            <ListItem button style={{backgroundColor: '#E7E3DE', borderRadius: '4px', marginTop: '5px'}}>
                <Card style={{width: '25px', height: '25px', marginTop: '0px', backgroundColor: 'red'}}>
                </Card>    
                <Typography style={{fontSize: '15px', marginLeft: '25px', fontWeight: 'bold', color: '#3b526f'}}>
                    Bistro
                </Typography>
            </ListItem>
        </div>
    )
}

export default BoardListItem