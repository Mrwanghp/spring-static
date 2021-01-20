/*
 * @Author: wang
 * @Date: 2021-01-14 13:47:05
 * @LastEditTime: 2021-01-20 10:11:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \spring-static\src\utils\common.js
 */
// 多维数组=》一维数组
export const iterTree = (arr) => {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
// 分割数组
export const separation = (arr, num) => {
  var newarr = [];
  for (var i = 0; i < arr.length; i++) {
    if (i % num === 0) {
      newarr.push([]);
    }
    newarr[newarr.length - 1].push(arr[i]);
  }
  return newarr;
}
// iosOrAndroid
export const judgeClient = () => {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //判断是否是 android终端
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 ios终端
  return isAndroid && 'Android' || isIOS && 'IOS' || 'PC';
}
export const bodyScroll = (event) => {
  event.preventDefault();
}
// 禁止页面滑动
export const prohibited = () => {
  return {
    'IOS': () => {
      // 键盘弹出事件处理
      window.addEventListener('focusin', () => {
        document.body.addEventListener('touchmove', bodyScroll, {
          passive: false
        });
      });
      // 键盘收起事件处理
      window.addEventListener('focusout', () => {
        document.body.removeEventListener('touchmove', bodyScroll, {
          passive: false
        });
      });
    },
    'Android': () => {
      const innerHeight = window.innerHeight;
      window.addEventListener('resize', () => {
        const newInnerHeight = window.innerHeight;
        // 键盘弹出事件处理
        if (innerHeight > newInnerHeight) {
          document.body.addEventListener('touchmove', bodyScroll, {
            passive: false
          });
        } else {
          // 键盘收起事件处理
          document.body.removeEventListener('touchmove', bodyScroll, {
            passive: false
          });
        }
      });
    },
    'PC': () => {
      alert('请使用手机访问！')
    }
  }[judgeClient()]()
}
