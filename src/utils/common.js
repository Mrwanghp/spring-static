/*
 * @Author: your name
 * @Date: 2021-01-14 13:47:05
 * @LastEditTime: 2021-01-14 13:47:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \spring-static\src\utils\common.js
 */
// 多维数组=》一维数组
export const iterTree = (arr)=> {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}