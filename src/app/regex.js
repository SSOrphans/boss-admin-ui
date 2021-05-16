export const validEmail = new RegExp(
  "^[a-z0-9!'#$%&*+/=?^_`{|}~-]+(?:.[a-z0-9!'#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-zA-Z]{2,}$"
);

export const validPin = new RegExp("^[0-9]{4}$");

export const validCvv = new RegExp("^[0-9]{3}$");

export const validAccountId = new RegExp("^[0-9]{1,16}$");

export const validNumberHash = new RegExp("^[0-9]{1,64}$");
