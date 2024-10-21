import React, { useContext, useState } from "react";
import classes from './DailyExpenses.module.css'

import ShowDailyExpenses from "../ShowDailyExpenses/ShowDailyExpenses";
import CartContext from "../CartContext/cart-context";

const DailyExpenses=()=>{
    const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        margin:'5px'
      };
    const [description,setDescription] =useState('')
    const [moneySpent,setMoneySpent] =useState('')
    const [category,setCategory] =useState('');
    const [data,setData]=useState([]);

    const cartcontext=useContext(CartContext)

    const descriptionHandler=(event)=>{
        setDescription(event.target.value)
    }
    const moneySpentHandler=(event)=>{
        setMoneySpent(event.target.value)
    }
    const categoryHandler=(event)=>{
        setCategory(event.target.value)
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        let newobj={
            description,
            moneySpent,
            category
        }
        setData((prevState)=>[...prevState,newobj])
        cartcontext.addItem(newobj)
        console.log(data)
        setDescription('')
        setMoneySpent('')
        setCategory('')
    }



    return(
        <div className={classes.div}>
            <form onSubmit={submitHandler} className={classes.form}>
                <h1>Expense Tracker</h1>
                <label htmlFor="description"  className={classes.label}>Description</label>
                <input type="text" id="description" onChange={descriptionHandler} value={description} className={classes.input}/>
                <label htmlFor="moneyspent" className={classes.label}>Money Spent</label>
                <input  type="number" id="moneyspent" onChange={moneySpentHandler} value={moneySpent} className={classes.input}/>
                <label htmlFor="category" className={classes.label}>Category:</label>

                <select name="category" id="category" onChange={categoryHandler} value={category} className={classes.input}>
                    <option value="select">Select</option>
                    <option value="food">Food</option>
                    <option value="petrol">Petrol</option>
                    <option value="salary">Salary</option>
                </select>
                <button type="submit" className={classes.button}>Add Expenses</button>
            </form>
            <button style={buttonStyle}>Buy Premium</button>
            <ShowDailyExpenses data={data}
             description={description}
             setDescription={setDescription}
             moneySpent={moneySpent}
             setMoneySpent={setMoneySpent}
             category={setCategory}
             setCategory={setCategory}/>

        </div>
    )
}

export default DailyExpenses;