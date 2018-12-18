import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatesPicker = props => {
    return (
        <div className="form-group">
            <label className="form-label">
                {props.title}
            </label>
            <br></br>
            <DatePicker
                className="form-control"
                selected={props.selected}
                onChange={props.onChange}
                dateFormat={props.dateFormat}
            />
        </div>

    );
};

export default DatesPicker;