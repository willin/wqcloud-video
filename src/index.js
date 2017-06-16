const debug = require('debug');
const qs = require('querystring');
const { getTimestamp, md5 } = require('@dwing/common');

exports.fcgi = require('./fcgi');
exports.statcgi = require('./statcgi');

exports.getPushUrl = ({ bizid = 0, streamid = '', key = '', expires = 3600 } = {}) => {
  const time = getTimestamp() + expires;
  const livecode = `${bizid}_${streamid}`;
  const query = {
    bizid,
    txTime: time.toString(16).toUpperCase()
  };
  query.txSecret = md5(`${key}${livecode}${query.txTime}`);
  debug('wqcloud:common:params')(query);
  return `trmp://${bizid}.livepush.myqcloud.com/live/${livecode}?${qs.stringify(query)}`;
};
