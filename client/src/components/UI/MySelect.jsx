import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MySelect({changeInterval}) {
    const [sec, setSec] = React.useState('');


    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 160 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Update Interval</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={sec}
                    onChange={(e) => {
                        setSec(e.target.value);
                        changeInterval(e.target.value * 1000);
                    }}
                    autoWidth
                    label="Age"
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}