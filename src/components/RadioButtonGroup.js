import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function RadioButtonsGroup({ onSubmit }) {
    const [value, setValue] = React.useState("cases");

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(event.target.value);
    }

    return (
        <form onChange={handleSubmit}>
            <FormControl>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel value="cases" control={<Radio color="secondary"/>} label="Total Cases" />
                <FormControlLabel value="recovered" control={<Radio />} label="Recovered" />
                <FormControlLabel value="deaths" control={<Radio color="error"/>} label="Deaths" />
            </RadioGroup>
            </FormControl>
        </form>
    );
}