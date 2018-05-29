import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Search} from '@icedesign/base';
import NebUtils from '../../../../util/NebUtils.js'
import SchoolDataBase from '../../../../util/schools.js'


export default class PlatformLanding extends Component {
  static displayName = 'PlatformLanding';

  static propTypes = {
    value: PropTypes.string,
  };

  static defaultProps = {
    value: 'string data',
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: SchoolDataBase.getSchoolLabel()
    })
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.body}>
          <h2 style={styles.title}>
            研究生导师口碑网
          </h2>
          <span style={styles.title2}>
            匿名加密&nbsp;&nbsp;/&nbsp;&nbsp;
            永不丢失&nbsp;&nbsp;/&nbsp;&nbsp;
            无法篡改
          </span>
          <Search
            autoWidth
            hasIcon={false}
            size="large"
            value={this.state.value}
            onSearch={this.props.onSearch}
            dataSource={this.state.dataSource}
            placeholder="输入大学名称"
          />
        </div>
      </div>
    );
  }
}

const styles = {
  buttons: {textAlign: 'center', marginTop: 33},
  body: {
    position: 'absolute',
    top: '150px',
    left: '50%',
    marginLeft: '-300px',
    width: '600px',
    color: '#fff',
    maxHeight: '260px',
    overflow: 'hidden',
    textAlign: 'center',
  },
  wrapper: {
    overflow: 'hidden',
    height: 420,
    backgroundImage:
      'url("http://zzkun-tuchuang.oss-cn-hangzhou.aliyuncs.com/18-5-27/1315648.jpg")',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundColor: '#66ABFF',
    boxShadow: '0 1px 16px 0 rgba(0,0,0,0.10)',
  },
  title: {
    fontSize: '32px',
    color: '#333',
    letterSpacing: '2px',
    lineHeight: '48px',
    textAlign: 'center',
  },
  title2: {
    color: '#333',
    textAlign: 'center',
    lineHeight: '48px',
  },
  primaryButton: {
    height: 50,
    fontSize: 16,
    padding: '0 58px',
    lineHeight: '50px',
    color: '#fff',
  },
  secondaryButton: {
    height: 50,
    fontSize: 16,
    padding: '0 58px',
    lineHeight: '50px',
    marginRight: 20,
    backgroundColor: 'transparent',
    borderColor: '#5485f7',
    color: '#5485f7',
  },
};
