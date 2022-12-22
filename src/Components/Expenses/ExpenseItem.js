import { useDispatch } from "react-redux";
import classes from "./ExpenseItem.module.css";
import { expenseActions } from "../../store/expense-slice";
import { Fragment } from "react";
import ShowExpense from "./ShowExpense";

const ExpenseItem = (props) => {
  const { amount, description, category, id } = props.item;
  let email = localStorage.getItem("email").replace(".", "").replace("@", "");

  const dispatch = useDispatch();

  const deleteExpenseHandler = () => {
    console.log("inside delete",id);
    fetch(
      `https://refreshexpense-default-rtdb.firebaseio.com/${email}/${id}.json`,
      {
        method: "DELETE",
      }
    );
    <ShowExpense id={id} />;

    dispatch(expenseActions.removeExpense(id));
  };

  const editExpenseHandler = () => {
    document.getElementById("amount").value = amount;
    document.getElementById("description").value = description;
    document.getElementById("category").value = category;
    fetch(
      `https://refreshexpense-default-rtdb.firebaseio.com/${email}/${id}.json`,
      {
        method: "DELETE",
      }
    );

    <ShowExpense id={id} />;
  };

  return (
    <Fragment className={classes.fragment}>
      <li className={classes.list} key={Math.random()}>
        <span className={classes.amount}>{amount}</span>
        <span className={classes.description}>{description}</span>
        <span className={classes.category}>{category}</span>
        <div className={classes.buttons}>
          <button onClick={editExpenseHandler}>Edit</button>
          <button onClick={deleteExpenseHandler}>Delete</button>
        </div>
      </li>
    </Fragment>
  );
};

export default ExpenseItem;
