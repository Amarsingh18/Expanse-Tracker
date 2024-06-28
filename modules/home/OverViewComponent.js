import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: center;
  font-size: 16px;
  width: 100%;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin: 30px;
  justify-content: center;
  width: 100%;
`;

const ExpenseBox = styled.div`
  position: relative;
  border-radius: 10px;
  border: 1px solid #e6e8e9;
  padding: 30px 40px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
  background-color: ${(props) => (props.isIncome ? "#d4edda" : "#f8d7da")};
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  cursor: pointer; /* Enable cursor pointer */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px); /* Lift up on hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Add shadow on hover */
  }
  & span {
    color: ${(props) => (props.isIncome ? "#155724" : "#721c24")};
    font-weight: bold;
    font-size: 28px;
  }
  &:after {
    content: "";
    position: absolute;
    top: -20px;
    left: -20px;
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
  }
`;

const BalanceBox = styled.div`
  font-size: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
  background-color: #ffffff;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  & span {
    color: #0d1d2c;
    opacity: 80%;
    font-weight: bold;
    font-size: 24px;
  }
`;

const Button = styled.div`
  font-size: 18px;
  background: ${(props) => props.background || "#007bff"};
  display: flex;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  flex-direction: row;
  border-radius: 10px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  ${(props) =>
    props.hover &&
    css`
      &:hover {
        background: ${props.hover};
      }
    `}
`;

const AddTransactionContainer = styled.div`
  font-size: 16px;
  display: ${(props) => (props.isAddTxnVisible ? "flex" : "none")};
  color: #0d1d2c;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #e6e8e9;
  width: 100%;
  align-items: center;
  padding: 20px;
  margin: 10px 0;
  gap: 15px;
  background-color: #ffffff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  & input {
    width: 90%;
    outline: none;
    padding: 12px 15px;
    border-radius: 10px;
    border: 1px solid #e6e8e9;
  }
`;

const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin: 10px 0;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;

const AddTransactionView = (props) => {
  const [amount, setAmount] = useState();
  const [desc, setDesc] = useState();
  const [type, setType] = useState("EXPENSE");

  return (
    <AddTransactionContainer isAddTxnVisible={props.isAddTxnVisible}>
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <RadioBox>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="income">Income</label>
      </RadioBox>

      <Button
        onClick={() =>
          props.addTransaction({
            id: Date.now(),
            amount: Number(amount),
            desc,
            type,
          })
        }
        background="#28a745"
        hover="#218838"
      >
        Add Transaction
      </Button>
    </AddTransactionContainer>
  );
};

const OverViewComponent = (props) => {
  const [isAddTxnVisible, toggleAddTXn] = useState(false);
  return (
    <Container>
      <BalanceBox>
        Balance: ${props.income - props.expense}
        <Button
          onClick={() => toggleAddTXn((isVisible) => !isVisible)}
          background="#007bff"
          hover="#0056b3"
        >
          {isAddTxnVisible ? "CANCEL" : "ADD"}
        </Button>
      </BalanceBox>
      {isAddTxnVisible && (
        <AddTransactionView
          isAddTxnVisible={isAddTxnVisible}
          addTransaction={(payload) => {
            props.addTransaction(payload);
            toggleAddTXn((isVisible) => !isVisible);
          }}
        />
      )}
      <ExpenseContainer>
        <ExpenseBox onClick={() => console.log("Clicked Expense")}>
          Expense<span>${props.expense}</span>
        </ExpenseBox>
        <ExpenseBox
          isIncome={true}
          onClick={() => console.log("Clicked Income")}
        >
          Income<span>${props.income}</span>
        </ExpenseBox>
      </ExpenseContainer>
    </Container>
  );
};

export default OverViewComponent;
