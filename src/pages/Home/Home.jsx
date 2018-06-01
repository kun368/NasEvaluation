import React, { Component } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PlatformLanding from './components/PlatformLanding';
import PlatformBlackIntro from './components/PlatformBlackIntro';
import SimpleTable from "./components/SimpleTable/SimpleTable";
import CreateActivityForm from "./components/CreateActivityForm/CreateActivityForm";
import NebUtils from "../../util/NebUtils";
import {Feedback} from '@icedesign/base';

const Toast = Feedback.toast;

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      tableData: {
        list: [],
        isShow: false
      }
      welcomeDialogShow: true,
    };
    this.onSearchSchool = this.onSearchSchool.bind(this);
  }

  onSearchSchool(value) {
    let key = value.key;
    if (!key || key.trim() === "") {
      return;
    }
    key = key.trim();

    Toast.loading(`正在获取${key}的导师评价数据，请稍后...`);
    NebUtils.userCallAxios(
      "querySchool",
      `["${key.trim()}"]`,
      ret => {
        console.log(ret);
        Toast.success(`获取${key}的导师评价数据成功！`);
        this.setState({
          tableData: {
            list: ret.reverse(),
            isShow: true
          }
        })
      }
    );
  };

  onWelcomeDialogClose = () => {
    this.setState({
      welcomeDialogShow: false
    });
  };

  renderWelcomeDialog() {
    return (
      <Dialog
        visible={this.state.welcomeDialogShow}
        onOk={this.onWelcomeDialogClose}
        closable="esc,mask,close"
        onCancel={this.onWelcomeDialogClose}
        onClose={this.onWelcomeDialogClose}
        title="欢迎使用研究生导师评价网！"
      >
        <p style={{color: 'red'}}>研究生导师评价网隆重上线，可跨平台使用，率先支持四种使用方式。考研不易，帮助学弟学妹找个好导师！</p>
        <ul>
          <li>方法一. Chrome浏览器打开本应用，安装WebExtensionWallet扩展，使用扩展本身交易</li>
          <li>方法二. Chrome浏览器打开本应用，安装WebExtensionWallet扩展和NAS手机钱包，使用手机扫码交易</li>
          <li>方法三. 手机/平板浏览器打开星云健身助手，上传文件时自动调用钱包交易（只需要安装NAS手机钱包）</li>
          <li>方法四. 直接在NAS手机钱包DApp市场里选择本应用使用</li>
        </ul>
        <p style={{color: 'red'}}>更多功能还在不断添加中！</p>
      </Dialog>
    );
  }

  render() {
    return (
      <div className="home-page" style={{ background: '#fff' }}>
        {this.renderWelcomeDialog()}
        <Header />
        <PlatformLanding onSearch={this.onSearchSchool}/>
        <SimpleTable tableData={this.state.tableData}/>
        <CreateActivityForm/>
        <PlatformBlackIntro />
        <Footer />
      </div>
    );
  }
}
