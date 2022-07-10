import PropTypes from "prop-types";
//Mui Components
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
//icon
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


TableCardHeader.propTypes = {
    avatar: PropTypes.node,
    title: PropTypes.string,
    avatarBg: PropTypes.string,
    headerbg: PropTypes.string,
    tooltiptitle: PropTypes.string,
};

TableCardHeader.defaultProps = {
    title: "Enter title in title prop",
    tooltiptitle: "Table"
};

export default function TableCardHeader({ avatar, title, avatarbg, headerbg, tooltiptitle }) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                padding: "18px",
                background: headerbg,
                color: theme.palette.grey[0],
                display: "flex",
                justifyContent: "space-between"
            }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: avatarbg,
                        color: '#fff',
                        marginRight: "12px"
                    }}
                >
                    {avatar}
                </Avatar>
                <Typography variant="h5">{title}</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "12px",
                    [theme.breakpoints.down("sm")]: {
                        display: "none"
                    }
                }}
            >
                <Tooltip
                    title={tooltiptitle}
                    position="bottom-start"
                    arrow
                >
                    <InfoOutlinedIcon sx={{ cursor: "pointer" }} />
                </Tooltip>
            </Box>
        </Box>
    );
}