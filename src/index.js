// (function (window) {
/**
* @param {String}  msg    错误信息
* @param {String}  url    出错文件
* @param {Number}  row    行号
* @param {Number}  col    列号
* @param {Object}  error  错误详细信息
*/
// let { method, url, isSampling, addErrData } = configData || {}

const errorType = {
  JSERR: {
    code: '01',
    msg: 'JS异常',
  },
  EVENTERR: {
    code: '02',
    msg: '静态资源加载异常',
  },
  AJAXERR: {
    code: '03',
    msg: 'AJAX请求异常',
  },
  AJAXTIMEOUTERR: {
    code: '04',
    msg: 'AJAX请求超时',
  },
}

const deviceInfo = {
  website: 'localhost',
  level: 'error',
  time: new Date().getTime() / 1000,
  uid: '匿名',
  ua: navigator.userAgent
}

/* const errorInfo = {
  tag: data.tag || window.location.pathname,
  message: data.message || error.message || '',
  url: window.location.href,
  filename: data.filename || 0,
  lineRow: data.lineno || 0,
  colno: data.colno || 0,
  domPath: domPath || '',
  element: element.outerHtml || '',
  error: {
    name: error.name || '',
    message: error.message || '',
    stack: error.stack,
  },
  router: router || '',
  cookies: cookies || ''
} */

// //错误信息提取
// let stackMsg = function (error) {
//   let errUrl = error.stack.replace(/\n/gi, "").split(/\bat\b/).slice(0, 9)[1]
//   let msg = error.toString()
//   return {
//     errMsg: msg,
//     errUrl
//   }
// }

// //错误信息组合
// let errorData = function (errorData) {

//   let { errMsg, errUrl, errType } = errorData
//   let errData = {
//     errMsg: errMsg,
//     errUrl: errUrl,
//     errIndex: window.location.href,
//     errType: errType,
//     errTime: new Date().getTime(),
//     errAgent: window.navigator.userAgent,
//     errCode: errMsg + ',' + errUrl,
//     addErrData: {}
//   }

//   if (addErrData && isPlainObject(addErrData)) {
//     for (let i in addErrData) {
//       errData.addErrData[i] = addErrData[i]
//     }
//   }

//   return errData

// }

/**
   获取浏览器类型
  */
function getBrowser() {
  var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf('Opera') > -1
  if (isOpera) {
    return 'Opera'
  }; // 判断是否Opera浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  } // 判断是否Firefox浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  } // 判断是否Safari浏览器
  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    return 'IE'
  }; // 判断是否IE浏览器
}

window.onerror = function (msg, url, row, col, error) {
  // console.log('错误信息--onerror');
  // console.log({
  //   msg,
  //   url,
  //   row,
  //   col,
  //   error
  // })
  let errorInfo = {
    errAgent: window.navigator.userAgent,
    href: location.href,
    brower: getBrowser(),
    errTime: parseInt(new Date().getTime() / 1000),
    msg: msg,
    scriptURI: url,
    lineNo: row,
    columnNo: col,
    stack: error && error.stack ? error.stack : null
  }
  reportError('post', '/middleware/errorLog', errorInfo)
  return true; // 注意，在返回 true 的时候，异常才不会继续向上抛出error;
};

/**
  * @param {String}    event         监听事件
  * @param {function}  function      出错文件
  * @param {Boolean}   useCapture    指定事件是否在捕获或冒泡阶段执行。
  *  true - 事件句柄在捕获阶段执行
  *  false- false- 默认。事件句柄在冒泡阶段执行
  */
window.addEventListener('error', (error) => {
  console.log('捕获到异常....addEventListener-error');
  console.log(error);
  // let errorInfo = {
  //   msg: msg,
  //   scriptURI: url,
  //   lineNo: row,
  //   columnNo: col,
  //   stack: error && error.stack ? error.stack : null
  // }
  // reportError('post', '/middleware/errorLog', errorInfo)
  return true;
}, true);

window.addEventListener('unhandledrejection', function (error) {
  // reportError('post', '/middleware/errorLog', error)
  console.log('promise-error', error)
});




function reportError(method = 'post', url, param = { ...deviceInfo, ...errorInfo }, successCallback, failCallback) {
  try {
    var errorObj = { ...param } || null
    var xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    xmlHttp.open(method, url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json')
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var res = JSON.parse(xmlHttp.responseText)
        typeof successCallback === 'function' && successCallback(res)
      } else {
        typeof failCallback === 'function' && failCallback()
      }
    }
    // 上报给node中间层处理
    xmlHttp.send(JSON.stringify(errorObj))
  } catch (e) {
    console.error(e)
  }
}

try {
  let name = '132'
  console.log(name2)
} catch (e) {
  console.log('异常捕获到了...', e)
}

let name = 'leo'
console.log(name3)
// })(window)

console.log(a);