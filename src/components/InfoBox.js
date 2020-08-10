import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import '../css/InfoBox.css';

function InfoBox({ isGreen = false, active, title, cases, total, ...props }) {
    return (
        <Card 
            onClick = {props.onClick} 
            className={`infoBox ${active && 'infoBox--selected'}`} 
            style={{ backgroundColor:"wheat" }
        }>
            <CardContent>
                <Typography color="textSecondary" className="infoBox__title">
                    { title }
                </Typography>
                <h2 className={`${isGreen ? 'isGreen' : 'inforBox__cases'}`}>
                    { cases }
                </h2>
                <Typography color="textSecondary" className="infoBox__total">
                    { total } Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
