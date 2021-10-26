import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import '../css/Infobox.css';

const Infobox = ({ title, cases, total,isRed, active, ...props }) => {
    return (
        <Card onClick={props.onClick}
            className={`infobox ${active && "infobox--selected"} ${isRed && "infobox--red"}`}>
            <CardContent>
                <Typography className="infobox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className={`infobox__cases ${!isRed && "infobox__cases--green"}`}>{cases}</h2>
                <Typography className="infobox__total" color="textSecondary">
                    {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
