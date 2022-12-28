import ExpenseItem from "./ExpenseItem";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const ShowExpense = (props) => {
  // const showExpense = useSelector((state) => state.expense.expenses);
  const allExpenses = useSelector((state) => state.expense.expenses);

  // console.log("inside show expense",props);
  // let id = props.id;
  // const checkExpense = useSelector((state) => state.expense.expenses);
  // console.log("Checking props", props);
  // let email = localStorage.getItem("email").replace(".", "").replace("@", "");

  // const [check, setcheck] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`https://refreshexpense-default-rtdb.firebaseio.com/${email}.json`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       setcheck(res.data);
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //     });
  // }, [id]);
  // if (check == null) {
  //   return <h1>Please add your expense</h1>;
  // }
  // console.log("checking check", typeof check);
  // console.log(check);
  // const result = Object.values(check);
  // console.log("checking result", typeof result);
  // console.log(result);
  if(allExpenses.length == 0) {
    return <h1>Please add Expense</h1>
  }


  return (
    <ul>
      {allExpenses.map((item) => (
        <ExpenseItem
          item={{
            id: item.id,
            amount: item.amount,
            description: item.description,
            category: item.category,
          }}
        />
      ))}
    </ul>
  );
};

export default ShowExpense;
