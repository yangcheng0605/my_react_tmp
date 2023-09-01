import axios from "axios";
// import { hashHistory } from "react-router";
// import Cookie from "js-cookie";
// import ENV from "config";
import storage from "./storage";
import { isEmpty } from "lodash";

// 请求列表
let requestList:any = [];
// 取消列表
// const CancelToken = axios.CancelToken;
let sources = {};
let jumpingToLogin = false;

axios.defaults.timeout = 300000
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

// axios.defaults.baseURL = ENV.apiUrl;

axios.interceptors.request.use(
    config => {
        const request = JSON.stringify(config.url) + JSON.stringify(config.data);
        // config.cancelToken = new CancelToken(cancel => {
        //   sources[request] = cancel;
        // });
        // console.log(config)
        // config.responseType = 'blob'
        if (requestList.includes(request)) {
            // sources[request]("取消重复请求");
        } else {
            requestList.push(request);
            //   store.dispatch({
            //     type: "SET_GLOBAL_LOADING",
            //     payload: true
            //   });
        }

        const token = storage.getCookie("callbot_ticket");
        if (token && token !== "undefined") {
            config.headers["x-access-token"] = token;
        }
        if (isEmpty(token)) {
            //   window.location.hash("/login");
            window.location.replace("#/login");
        }
        const language = storage.getCookie("language");
        if (language && language !== "undefined") {
            config.headers["accept-language"] = language;
        } else {
            config.headers["accept-language"] = "en";
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// let jumpingToLogin = false;

axios.interceptors.response.use(
    function (response) {
        const request =
            JSON.stringify(response.config.url) +
            JSON.stringify(response.config.data);
        requestList.splice(requestList.findIndex((item:any) => item === request), 1);
        if (requestList.length === 0) {
            // store.dispatch('changeGlobalState', {loading: false})
            //   store.dispatch({
            //     type: "SET_GLOBAL_LOADING",
            //     payload: false
            //   });
        }
        if (response.data.code === 100401 || response.data.code === 100403) {
            //   message.error("登录超时，即将重新登录！");
            //   window.ELEMENT.Message.error("认证失效，请重新登录！", 1000);
            //   hashHistory.push("/login");
        }
        return response;
    },
    function (error) {
        if (axios.isCancel(error)) {
            requestList.length = 0;
            // store.dispatch('changeGlobalState', {loading: false})

            throw new axios.Cancel("cancel request");
        } else {
            if (
                error.response &&
                error.response.status &&
                error.response.status === 401
            ) {
                // hashHistory.push("/login");

                // 防止多次调用请求时重复提示。只用提示一次
                if (!jumpingToLogin) {
                    // message.error("登录超时，即将重新登录！");
                    jumpingToLogin = true;
                    setTimeout(() => {
                        jumpingToLogin = false;
                        window.location.replace("#/login");
                    }, 2000);
                } else {
                }
            } else {
                // message.error(getLangTxt("messages.common", "tipNetWorkError"));
            }
            // if (error.response.status === 403) {
            //   // return;
            // }

            //
        }

        return Promise.reject(error);
    }
);

const request = function (url:string, params:any, config:any, method:string) {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        axios[method == "getFile" && 'get' || method](url, params, Object.assign({}, config))
            .then(
                (response:any) => {
                    if (config.responseType == 'blob'){ 
                        if (response.status = 200) {
                            resolve({ data: response.data, headers: response.headers });
                        } else {
                            reject(response.data);
                        }
                    }
                    if (response.data.status) {
                        if (method == "getFile") {
                            resolve({ data: response.data, headers: response.headers });
                        } else {
                            resolve(response.data);
                        }

                    } else {
                        // message.error(response.data.msg);
                        if (method == "getFile") {
                            reject({ data: response.data, headers: response.headers });
                        } else {
                            reject(response.data);
                        }

                    }
                },
                (err:any) => {
                    if (err.Cancel) {
                    } else {
                        reject(err);
                    }
                }
            )
            .catch((err:any) => {
                reject(err);
            });
    });
};

const post = ({ url, data, config = {} }:any) => {
    return request(url, data, config, "post");
};
const putReq = ({ url, data, config = {} }:any) => {
    return request(url, data, config, "put");
};
const patch = ({ url, data, config = {} }:any) => {
    return request(url, data, config, "patch");
};
const del = ({ url, data, config = {} }:any) => {
    return request(url, { params: data }, config, "delete");
};
const get = ({ url, data, config = {} }:any) => {
    return request(url, { params: data }, config, "get");
};
const getFile = ({ url, data, config = {} }:any) => {
    return request(url, { params: data }, config, "getFile");
};

export { sources, post, get, putReq, del, patch, getFile };
