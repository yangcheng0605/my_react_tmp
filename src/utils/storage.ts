import Cookie from "js-cookie";
import ENV from "./config";
import { jsonParse } from "../utils";

const Storage = function(config: any) {
  const getItem = (key: string) => {
    const data = localStorage.getItem(key);
    if (data != null) {
      return jsonParse(data);
    }
    return null;
  };
  const setItem = (key: string, value: string, formatData: boolean = true) => {
    return localStorage.setItem(
      key,
      formatData ? JSON.stringify(value) : value
    );
  };
  const removeItem = (key: string) => {
    return localStorage.removeItem(key);
  };
  const clearAllItem = () => {
    localStorage.clear();
  };
  const getCookie = (name: string) => {
    return Cookie.get(name);
  };
  const setCookie = (name: string, value: any) => {
    Cookie.set(name, value, { path: config.path });
  };
  const removeCookie = (name: string) => {
    Cookie.remove(name, { path: config.path });
  };
  return Object.freeze({
    getCookie,
    setCookie,
    removeCookie,
    getItem,
    setItem,
    removeItem,
    clearAllItem
  });
};
export default Storage(ENV);
