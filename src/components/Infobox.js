import PropTypes from 'prop-types';
import { useState } from 'react';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
// icons
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const CardWrapper = styled(Card)(({ theme, bgcolor, pseudocirclebg, showcircle }) => ({
    background: bgcolor,
    color: theme.palette.grey[0],
    overflow: 'hidden',
    position: 'relative',
    ...(showcircle && {
        '&>div': {
            position: 'relative',
            zIndex: 5
        },
        '&:after': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background: pseudocirclebg[0],
            borderRadius: '50%',
            zIndex: 1,
            top: -85,
            right: -95,
            [theme.breakpoints.down('sm')]: {
                top: -105,
                right: -140
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            zIndex: 1,
            width: 210,
            height: 210,
            background: pseudocirclebg[1],
            borderRadius: '50%',
            top: -125,
            right: -15,
            opacity: 0.5,
            [theme.breakpoints.down('sm')]: {
                top: -155,
                right: -70
            }
        }
    })
}));


export default function InfoBox({ title, avatar, total, cases, bgcolor, pseudocirclebg, showcircle, buttonbg }) {
    const theme = useTheme();

    const [timeValue, setTimeValue] = useState(true);
    const handleChangeTime = (event, newValue) => {
        setTimeValue(newValue);
    };

    const chooseColor = (color) => {
        if (color === "primary") {
            return [theme.palette.primary.darker, theme.palette.primary.main];
        }
        if (color === "info") {
            return [theme.palette.info.darker, theme.palette.info.main];
        }
        if (color === "error") {
            return [theme.palette.error.darker, theme.palette.error.main];
        }
        return [theme.palette.primary.darker, theme.palette.primary.main];
    };

    return (
        <CardWrapper bgcolor={bgcolor} pseudocirclebg={chooseColor(pseudocirclebg)} showcircle={showcircle ? 1 : 0}>
            <Box sx={{ p: 2.25 }}>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.largeAvatar,
                                        backgroundColor: chooseColor(pseudocirclebg)[0],
                                        color: '#fff',
                                        mt: 1
                                    }}
                                >
                                    {avatar}
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Button
                                    disableElevation
                                    variant={timeValue ? 'contained' : 'text'}
                                    size="medium"
                                    sx={{ color: 'inherit' }}
                                    color={buttonbg}
                                    onClick={(e) => handleChangeTime(e, true)}
                                >
                                    Today
                                </Button>
                                <Button
                                    disableElevation
                                    variant={!timeValue ? 'contained' : 'text'}
                                    size="medium"
                                    sx={{ color: 'inherit' }}
                                    color={buttonbg}
                                    onClick={(e) => handleChangeTime(e, false)}
                                >
                                    Total
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sx={{ mb: 0.75 }}>
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        {timeValue ? (
                                            <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75 }}>
                                                {cases}
                                            </Typography>
                                        ) : (
                                            <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75 }}>
                                                {total}
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                                ...theme.typography.smallAvatar,
                                                cursor: 'pointer',
                                                backgroundColor: theme.palette.primary[200],
                                                color: theme.palette.primary.dark
                                            }}
                                        >
                                            <ArrowDownwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            sx={{
                                                fontSize: '1rem',
                                                fontWeight: 500,
                                                color: theme.palette.grey[0]
                                            }}
                                            noWrap
                                        >
                                            {title}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </CardWrapper>
    );
};

InfoBox.propTypes = {
    title: PropTypes.string.isRequired,
    total: PropTypes.string,
    cases: PropTypes.string,
    showcircle: PropTypes.bool,
    buttonbg: PropTypes.string,
    pseudocirclebg: PropTypes.string,
    avatar: PropTypes.node,
};

InfoBox.defaultProps = {
    showcircle: false,
    buttonbg: "primary",
    pseudocirclebg: "primary"
};