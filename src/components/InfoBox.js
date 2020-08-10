import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import '../css/InfoBox.css';

function InfoBox({ title, cases, total }) {
    return (
        <Card className="infoBox" style={{ backgroundColor:"wheat" }}>
            <CardContent>
                <Typography color="textSecondary" className="infoBox__title">
                    { title }
                </Typography>
                <h2 className="inforBox__cases">
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
