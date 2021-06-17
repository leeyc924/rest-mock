import dayjs from 'dayjs';

const log = (type: string, params: Array<{} | string>) => {
  if (String(process.env.NODE_DEBUG).indexOf(type) < 0) {
    return;
  }

  let logStr = '';
  params.forEach(param => {
    if (typeof param === 'object') {
      logStr += JSON.stringify(param);
    } else {
      if (logStr !== '') {
        logStr += ' ';
      }
      logStr += param;
    }
  })
  console.log(type, dayjs().format('YYYYMMDDHHmmss'), logStr);
}

const debug = (...params: any[]) => log('DEBUG', params);
const info = (...params: any[]) => log('INFO', params);
const error = (...params: any[]) => log('ERROR', params);
const warn = (...params: any[]) => log('WARN', params);

export default {
  debug,
  info,
  error,
  warn,
}