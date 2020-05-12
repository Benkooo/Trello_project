export const storeString = (key: keys, data: string) => {
  if(typeof(Storage) !== "undefined"){
    sessionStorage.setItem(key, data);
  }
};

export const storeObject = (key: keys, data: any) => {
  if(typeof(Storage) !== "undefined"){
    sessionStorage.setItem(key, JSON.stringify(data));
  }
};

export const getObject = (key: keys): any => {
  if(typeof(Storage) !== "undefined"){
    return JSON.parse(sessionStorage.getItem(key) as string);
  }
};

export const getString = (key: keys): any => {
  if(typeof(Storage) !== "undefined"){
    return sessionStorage.getItem(key) as string;
  }
export const getString = (key: keys): string => {
  return sessionStorage.getItem(key) as string;
};

export const removeItems = (key?: keys) => {
  if(typeof(Storage) !== "undefined"){
    if (key != null) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.clear();
    }
  }
};

export type keys = "userEmail";
