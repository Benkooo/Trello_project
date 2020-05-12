export const storeString = (key: keys, data: string) => {
  window.sessionStorage.setItem(key, data);
};

export const storeObject = (key: keys, data: any) => {
  window.sessionStorage.setItem(key, JSON.stringify(data));
};

export const getObject = (key: keys): any => {
  return JSON.parse(sessionStorage.getItem(key) as string);
};

export const getString = (key: keys): string => {
  return sessionStorage.getItem(key) as string;
};

export const removeItems = (key?: keys) => {
  if (key != null) {
    window.sessionStorage.removeItem(key);
  } else {
    window.sessionStorage.clear();
  }
};

export type keys = "userEmail";
