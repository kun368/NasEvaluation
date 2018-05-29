import React, { Component } from 'react';

export default class PlatformBlackIntro extends Component {
  static displayName = 'PlatformBlackIntro';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          ...styles.wrapper,
          backgroundImage:
            'url(https://img.alicdn.com/tfs/TB1.IQmRVXXXXbYXVXXXXXXXXXX-2760-1480.png)',
        }}
      >
        <div style={styles.body}>
          <h2 style={styles.title}>我们的优势</h2>
          <p style={styles.text}>
            基于区块链的去中心化的导师评价口碑交流平台<br />
            天然匿名加密，不惧隐私泄露<br />
            数据永久可查，无法篡改
          </p>
        </div>
        <div style={styles.extraBody}>
          <img
            alt=""
            src="http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-29/77853974.jpg"
            height="218"
            width="706"
            style={styles.image}
          />
          <div style={styles.extraText}>
            <p style={styles.extraTextItemLeft}>基于优秀的星云智能合约</p>
            <p style={styles.extraTextItemCenter}>可按学院教师过滤查询</p>
            <p style={styles.extraTextItemRight}>公平 公正 公开 信息匿名</p>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    height: 740,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
  body: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    marginTop: 130,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    lineHeight: '24px',
    letterSpacing: '2px',
  },
  extraBody: {
    textAlign: 'center',
    position: 'relative',
    marginTop: 80,
  },
  image: {
    display: 'block',
    margin: '0 auto',
  },
  extraText: {
    width: 706,
    margin: '0 auto',
    display: 'flex',
    color: '#fff',
  },
  extraTextItemLeft: {
    width: '215px',
    textAlign: 'center',
  },
  extraTextItemCenter: {
    width: '275px',
    textAlign: 'center',
  },
  extraTextItemRight: {
    width: '215px',
    textAlign: 'center',
  },
};
