export default class KunUtils {

  /**
   * 用途：js中字符串超长作固定长度加省略号（...）处理
   * @param str 需要进行处理的字符串，可含汉字
   * @param len 需要显示多少个汉字，两个英文字母相当于一个汉字。
   */
  static beautySub(str, len) {
    const reg = /[\u4e00-\u9fa5]/g,    //专业匹配中文
      slice = str.substr(0, len),
      chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length)),
      realen = slice.length * 2 - chineseCharNum;
    return str.substr(0, realen) + (realen < str.length ? "..." : "");
  }
}
