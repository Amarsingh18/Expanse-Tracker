import styled from "styled-components";
import React, { useEffect, useState } from "react";

const Container = styled.div`
  background-color: #f9f9f9;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  overflow-y: auto;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 12px;
  background-color: #e6e8e9;
  border: 1px solid #e6e8e9;
  outline: none;
  font-size: 16px;
`;

const Cell = styled.div`
  background-color: #ffffff;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #e6e8e9;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.isExpense ? "#f8d7da" : "#d4edda")};
  }
`;

const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      <span>{props.payload?.desc}</span>
      <span>${props.payload?.amount}</span>
    </Cell>
  );
};

const TransactionsComponent = (props) => {
  const [searchText, setSearchText] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(props.transactions);

  const filterTransactions = (searchText) => {
    if (!searchText.trim()) {
      setFilteredTransactions(props.transactions);
      return;
    }
    const filtered = props.transactions.filter(
      (transaction) =>
        transaction.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    filterTransactions(searchText);
  }, [props.transactions, searchText]);

  return (
    <Container>
      Transactions
      <Input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          filterTransactions(e.target.value);
        }}
      />
      {filteredTransactions.map((transaction) => (
        <TransactionCell key={transaction.id} payload={transaction} />
      ))}
    </Container>
  );
};

export default TransactionsComponent;
