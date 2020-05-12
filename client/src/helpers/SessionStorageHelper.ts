export const storeString = (key: keys, data: string) => {
  sessionStorage.setItem(key, data);
};

export const storeObject = (key: keys, data: any) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getObject = (key: keys): any => {
  return JSON.parse(<string>sessionStorage.getItem(key));
};

export const getString = (key: keys): string => {
  return <string>sessionStorage.getItem(key);
};

export const removeItems = (key?: keys) => {
  if (key != null) {
    sessionStorage.removeItem(key);
  } else {
    sessionStorage.clear();
  }
};

export type keys = "userEmail";
