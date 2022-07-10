import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
// material
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

const RootStyle = styled("div")(({ theme }) => ({
    padding: theme.spacing(2, 1, 2, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`
    }
}));

TableListToolbar.propTypes = {
    filterName: PropTypes.string,
    onFilterName: PropTypes.func
};

export default function TableListToolbar({ filterName, onFilterName }) {
    return (
        <RootStyle>
            <SearchStyle
                value={filterName}
                onChange={onFilterName}
                placeholder="Search country"
                startAdornment={
                    <InputAdornment position="start">
                        <Box sx={{ color: 'text.disabled', height: 24 }}>
                            <SearchIcon />
                        </Box>
                    </InputAdornment>
                }
            />
        </RootStyle>
    );
}
