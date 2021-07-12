export default {
  // 对象转url参数
  rap(data:any, isPrefix = true) {
    const prefix = isPrefix ? '?' : '';
    const _result = [];
    for (const key in data) {
      const value = data[key];
      // 去掉为空的参数
      if (['', undefined, null].includes(value)) {
        continue;
      }
      if (value.constructor === Array) {
        value.forEach((_value) => {
          _result.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(_value)}`);
        });
      } else {
        _result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }

    return _result.length ? prefix + _result.join('&') : '';
  },
  // 日期格式化 date 日期
  formatTime(date:Date):string {
    if (!(date instanceof Date)) {
      console.warn('date instanceof Date must be true');
      return '';
    }
    const Y = date.getFullYear();
    const M = date.getMonth() + 1 - 0 >= 10
      ? Number(date.getMonth()) + 1
      : `0${Number(date.getMonth()) + 1}`;
    const D = date.getDate() >= 10 ? Number(date.getDate()) : `0${Number(date.getDate())}`;
    const h = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
    const m = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    const s = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;
    return `${Y}年${M}月${D}日 ${h}:${m}:${s}`;
  },
  // 计算倒计时 tiem 时间
  filterDeadline(time:string | Date):string {
    const deadlineDate:number = new Date(time).getTime();
    const newDate:number = Date.now();
    const getTime:number = deadlineDate - newDate / 1000;
    if (getTime < 0) {
      return ' 0 天 0 时 0 分 ';
    }
    const day = getTime / 3600 / 24; //  天数
    const hour = (getTime - day * 3600 * 24) / 3600; //  小时
    const minute = (getTime - (day * 3600 * 24 + hour * 3600)) / 60; //  分钟
    const second = getTime % 60; // 秒
    function checkTime(t:number):string | number {
      return t < 10 ? `0${t}` : t
    }
    return ` ${checkTime(day)} 天 ${checkTime(hour)} 时 ${checkTime(minute)} 分 ${checkTime(
      second,
    )} 秒`;
  },
};
