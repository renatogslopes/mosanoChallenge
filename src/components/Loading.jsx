import React from 'react'; 
 
import Spinner from 'react-spinkit';
 
/* Import Style */
import '../index.scss';

const Loading = props => { 
    return( 
        <div className={props.classMain} > 
            <div className='effect'> 
                <Spinner                     
                    name={props.name} 
                    color={props.color}
                    overrideSpinnerClassName={props.overrideSpinnerClassName} 
                /> 
                <span className={props.spanClass} > 
                    {props.message} 
                </span> 
            </div> 
        </div> 
    )
} 
 
export default Loading