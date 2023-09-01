// 使用方式 npm run make 组件名称  组件中文名称 组件父路由路径名称
"use strict";

process.on("exit", () => {
  console.log('创建成功');
});

if (!process.argv[2]) {
  console.error("[组件名]必填");
  process.exit(1);
}
if (!process.argv[3]) {
  console.error("[组件中文名称]必填");
  process.exit(1);
}
if (!process.argv[4]) {
  console.error("[组件父路由路径名称]必填");
  process.exit(1);
}

const path = require("path");
const fs = require("fs");
const fileSave = require("file-save");
const uppercamelcase = require("uppercamelcase");
const componentname = process.argv[2];
const chinese = process.argv[3] || componentname;
const router = process.argv[4] || '';
const ComponentName = uppercamelcase(componentname);
const PackagePath = path.resolve(__dirname, "./src/pages", ComponentName);


const Files = [
  {
    filename: `index.ts`,
    content: `export { default } from "./${ComponentName}"`,
  },
  {
    filename: `${ComponentName}.tsx`,
    content: `import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import messages, { Lang, LangLocal, messagesCommon, FM } from "./messages";
import './style.less';

export interface Props {
  history: any;
}

const ${ComponentName} =  (props:Props) => {
  const dispatch = useDispatch();
  const [xxxx, setXXX] = useState('');
  
  useEffect(() => {
  }, []);

  return (
    <div className="${ComponentName}">
      这是新创建的${ComponentName}函数组件
    </div>
  )
}
export default ${ComponentName};`,
  },
  {
    filename: `constant.ts`,
    content: `export enum ${ComponentName}Types {
  CODE_NAME = '${ComponentName}/GET',
}`,
  },
  {
    filename: `messages.ts`,
    content: `import { defineMessages } from 'react-intl'
import commonMsg from 'constants/messages'
import { FM as fm, getLangTxt } from 'utils/formatMessage'

export const scope = 'pages.${ComponentName}'
export const Lang = getLangTxt('constants')
export const LangLocal = getLangTxt(scope)
export const messagesCommon = commonMsg
export const FM = fm

export default defineMessages({
  message: 'xxx'
})`,
  },
  {
    filename: `action.ts`,
    content: `import { ${ComponentName}Types } from './constant';
import { getProductAndScene } from 'utils';

export function apiName(data, callback?:Function) {
  return {
    type: ${ComponentName}Types.CODE_NAME,
    payload: {
      data: { ...getProductAndScene(), ...data },
      callback
    }
  };
}`,
  },
  {
    filename: `saga.ts`,
    content: `import { put, call, fork, takeEvery } from 'redux-saga/effects';
import { ${ComponentName}Types } from './constant';
import { get, post, putReq, del } from 'libs/fetch';
import ApiEndpoint from 'api';

interface listResult {
  status: boolean;
  msg: string;
  data: {
    data: [];
    total: number;
  };
}

export function* apiName(action: any) {
  try {
    const api = new ApiEndpoint();
    const { data, callback } = action.payload;
    const result: listResult = yield call(post, {
      url: api.getBasePath(),
      data: data
      // config: { headers: {responseType: 'blob'} }
    });
    if (result.status) {
      callback && callback(result);
    } else {
      callback && callback(result);
    }
  } catch (error) {
    action.payload.callback && action.payload.callback(error);
  }
}

function* watchSign() {
  yield takeEvery(${ComponentName}Types.CODE_NAME, apiName);
}

export default function* ${ComponentName}Saga() {
  yield fork(watchSign);
}`,
  },
  {
    filename: `style.less`,
    content: `.${ComponentName}{
  padding: 24px 16px;
}`,
  }
];

// 添加到 components.json
const componentsFile = require("./components.json");
if (componentsFile[componentname]) {
  console.error(`${componentname} 已存在.`);
  process.exit(1);
}
componentsFile[componentname] = `./pages/${componentname}/index.ts`;
fileSave(path.join(__dirname, "./components.json"))
  .write(JSON.stringify(componentsFile, null, "  "), "utf8")
  .end("\n");


// 添加到 constants/message
const msgPath = path.join(__dirname, "./constants/messages.ts");
const msgPathContent = fs.readFileSync(msgPath, 'utf8');
const msgFileContent = msgPathContent.replace('// constantsEnd',`  ${componentname}: ${chinese},\n// constantsEnd`)
fileSave(msgPath)
  .write(msgFileContent, 'utf8')
  .end('\n');

// 添加到 router
const routerPath = path.join(__dirname, "./src/router/index.tsx");
const routerPathContent = fs.readFileSync(routerPath, 'utf8');
const routerFileContent = routerPathContent.replace('// routesEnd',`{
  path: "/${router||'callbot'}/${componentname}",
  exact: true,
  permissions: [],
  redirect: "/login",
  component: loadable(() => import("pages/${componentname}/")),
},\n// routesEnd`)
fileSave(routerPath)
  .write(routerFileContent, 'utf8')
  .end('\n');

// 添加到 sagas
const sagaPath = path.join(__dirname, "./src/sagas/index.ts");
const sagaPathContent = fs.readFileSync(sagaPath, 'utf8');
const sagaFileContent = sagaPathContent.replace('// pathEnd',`import ${ComponentName}Sage from "../pages/${componentname}/saga";\n// pathEnd`).replace('// rootEnd',`  yield fork(${ComponentName}Sage);\n// rootEnd`)
fileSave(sagaPath)
  .write(sagaFileContent, 'utf8')
  .end('\n');


// 创建 package
Files.forEach((file) => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, "utf8")
    .end("\n");
});

console.log("DONE!");
