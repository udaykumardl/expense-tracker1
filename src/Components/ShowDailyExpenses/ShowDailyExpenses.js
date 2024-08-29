
import React from "react";
import classes from './ShowDailyExpenses.module.css'

const ShowDailyExpenses=()=>{
    return (
        <div>
            {
               props.data.map((expense,index)=>{
                 <div className={classes.div}>
                    <p className={classes.p}>{expense.description}</p>
                    <p className={classes.p}>{expense.moneySpent}</p>
                    <p className={classes.p}>{expense.category}</p>
                 </div>
               })
            }
        </div>
    )

}

export default ShowDailyExpenses;