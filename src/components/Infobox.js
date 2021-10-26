import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import '../css/Infobox.css';

const Infobox = ({ title, cases, total }) => {
    return (
        <Card>
            <CardContent>
                <Typography clasName="infobox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="infobox__cases">{cases}</h2>

                <Typography clasName="infobox__total" color="textSecondary">
                    {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
