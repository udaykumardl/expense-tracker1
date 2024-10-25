
import React, { useContext } from "react";
import classes from './ShowDailyExpenses.module.css'
import CartContext from "../CartContext/cart-context";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from '../Reducers/themeSlice';

const ShowDailyExpenses=(props)=>{
  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    margin:'5px',
    marginLeft:'200px'
  };
    const cartcontext=useContext(CartContext);
    const theme=useSelector(state=>state.thememode.theme)
    const dispatch=useDispatch()

    const removeItemHandler=(item,id)=>{
        cartcontext.removeItem(item,id)
      }
      const editItemHandler=(item,index)=>{
        props.setDescription(item.description)
        props.setMoneySpent(item.moneySpent)
        props.setCategory(item.category)
        cartcontext.editItem(item,index)
    
    
      }
      
  let totalMoneySpent=0;
  cartcontext.item.forEach((expense) => {
    totalMoneySpent += Number(expense.moneySpent);
    // console.log(totalMoneySpent)
  });

  const darkThemehandler=()=>{
     if(theme===false){
      dispatch(changeTheme())
     }
  }

  const downloadExpensesHandler = () => {
    const data = JSON.stringify(cartcontext.item);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
    const divClass=theme?classes.darkdiv:classes.div
    const pClass=theme?classes.darkp:classes.p
    const editClass=theme?classes.darkedit:classes.edit
    const deleteClass=theme?classes.darkdelete:classes.delete
    return (
        <div>
           {totalMoneySpent>10000 ?  <button style={buttonStyle} onClick={darkThemehandler}>Activate Premium</button>:''}   <br/>
           {totalMoneySpent>10000 ? <button style={buttonStyle} onClick={downloadExpensesHandler}>Download Expenses</button>:''}
            {
               cartcontext.items.map((expense,index)=>{
                 <div className={divClass} key={index}>
                    <p className={pClass}>{expense.description}</p>
                    <p className={pClass}>{expense.moneySpent}</p>
                    <p className={pClass}>{expense.category}</p>
                    <button className={editClass} onClick={()=>editItemHandler(expense,index)}>Edit</button>
                    <button className={deleteClass} onClick={()=>removeItemHandler(expense,index)}>Delete</button>
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
