import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import OverViewComponent from "./OverViewComponent";
import TransactionsComponent from "./TransactionsComponent";

const Container = styled.div`
  background-color: #f0f0f0;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-size: 18px;
  width: 360px;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const HomeComponent = (props) => {
  const [transactions, updateTransaction] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  // Calculate total expense and income
  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transactions.forEach((payload) =>
      payload.type === "EXPENSE"
        ? (exp += payload.amount)
        : (inc += payload.amount)
    );
    updateExpense(exp);
    updateIncome(inc);
  };

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  // Add new transaction to the list
  const addTransaction = (payload) => {
    const transactionArray = [...transactions];
    transactionArray.push(payload);
    updateTransaction(transactionArray);
  };

  return (
    <Container>
      <OverViewComponent
        expense={expense}
        income={income}
        addTransaction={addTransaction}
      />
      {transactions.length > 0 && (
        <TransactionsComponent transactions={transactions} />
      )}
    </Container>
  );
};

export default HomeComponent;
