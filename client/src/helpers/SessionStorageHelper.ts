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
    return JSON.parse(<string>sessionStorage.getItem(key));
  }
};

export const getString = (key: keys): any => {
  if(typeof(Storage) !== "undefined"){
    return <string>sessionStorage.getItem(key);
  }
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
