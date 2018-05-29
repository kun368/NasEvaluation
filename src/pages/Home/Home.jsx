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

  render() {
    return (
      <div className="home-page" style={{ background: '#fff' }}>
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
