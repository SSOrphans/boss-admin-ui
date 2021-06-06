import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCardDetail = createAsyncThunk("cards/getCard", async (id) => {
  return (await axios.get(`http://localhost:8080/api/cards/${id}`)).data;
});

export const saveCardDetail = createAsyncThunk(
  "cards/saveCard",
  async (card) => {
    return await axios.put(`http://localhost:8080/api/cards/${card.id}`, card);
  }
);

export const addCard = createAsyncThunk("cards/createCard", async (card) => {
  return await axios.post(`http://localhost:8080/api/cards`, card);
});

export const deleteCard = createAsyncThunk("cards/deleteCard", async (id) => {
  return await axios.delete(`http://localhost:8080/api/cards/${id}`);
});
