import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCardList = createAsyncThunk("cards/getList", async (params = {}) => {
  const token = localStorage.getItem("clientPass");
  const headers = { Authorization: "Bearer " + token, 'Content-Type': "application/json" };
  return (await axios.get(`http://localhost:8080/api/v1/cards`, { params, headers, data: {} })).data;
});

export const getCardDetail = createAsyncThunk("cards/getCard", async (id) => {
  return (await axios.get(`http://localhost:8080/api/v1/cards/${id}`)).data;
});

export const saveCardDetail = createAsyncThunk(
  "cards/saveCard",
  async (card) => {
    return await axios.put(`http://localhost:8080/api/v1/cards/${card.id}`, card);
  }
);

export const addCard = createAsyncThunk("cards/createCard", async (card) => {
  return await axios.post(`http://localhost:8080/api/v1/cards`, card);
});

export const deleteCard = createAsyncThunk("cards/deleteCard", async (id) => {
  return await axios.delete(`http://localhost:8080/api/v1/cards/${id}`);
});
