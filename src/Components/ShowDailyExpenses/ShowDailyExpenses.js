
import React, { useContext } from "react";
import classes from './ShowDailyExpenses.module.css'
import CartContext from "../CartContext/cart-context";

const ShowDailyExpenses=(props)=>{
    const cartcontext=useContext(CartContext);

    const removeItemHandler=(item,id)=>{
        cartcontext.removeItem(item,id)
      }
      const editItemHandler=(item,index)=>{
        props.setDescription(item.description)
        props.setMoneySpent(item.moneySpent)
        props.setCategory(item.category)
        cartcontext.editItem(item,index)
    
    
      }
    return (
        <div>
            {
               cartcontext.items.map((expense,index)=>{
                 <div className={classes.div} key={index}>
                    <p className={classes.p}>{expense.description}</p>
                    <p className={classes.p}>{expense.moneySpent}</p>
                    <p className={classes.p}>{expense.category}</p>
                    <button className={classes.edit} onClick={()=>editItemHandler(expense,index)}>Edit</button>
                    <button className={classes.delete} onClick={()=>removeItemHandler(expense,index)}>Delete</button>
                 </div>
               })
            }
        </div>
    )

}

export default ShowDailyExpenses;



// import React, { useContext } from "react";
// import classes from './ShowDailyExpenses.module.css';
// import AuthContext from "../AuthContext/auth-context";


// const ShowDailyExpenses = (props) => {
//     const cartcontext = useContext(AuthContext);

//     const removeItemHandler = (item,index) => {
//         cartcontext.removeItem(item,index); // Ensure `removeItem` expects an id
//     };

//     const editItemHandler = (item, index) => {
//         props.setDescription(item.description);
//         props.setMoneySpent(item.moneySpent);
//         props.setCategory(item.category);
//         cartcontext.editItem(item, index); // Ensure `editItem` is defined in `CartContext`
//     };

//     return (
//         <div>
           
//           {cartcontext.items && cartcontext.items.length > 0 ? (
//             cartcontext.items.map((expense, index) => (
//                 <div className={classes.div} key={index}>
//                     <p className={classes.p}>{expense.description}</p>
//                     <p className={classes.p}>{expense.moneySpent}</p>
//                     <p className={classes.p}>{expense.category}</p>
//                     <button className={classes.edit} onClick={() => editItemHandler(expense, index)}>Edit</button>
//                     <button className={classes.delete} onClick={() => removeItemHandler(expense,index)}>Delete</button>
//                 </div>
//             ))
//         ) : (
//             <p>No expenses found.</p>
//         )}
//     </div>
//     );
// };

// export default ShowDailyExpenses;
