import React, {Component} from 'react';
import {Table, Pagination, Rating, Balloon} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import IceLabel from '@icedesign/label';
import KunUtils from '../../../../util/KunUtils.js'
import {Base64} from 'js-base64';
import moment from 'moment';

moment.locale('zh-cn');

export default class SimpleTable extends Component {
  static displayName = 'SimpleTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      filterParams: []
    }
  }

  renderAddress = (value) => {
    const str = KunUtils.beautySub(value, 5);
    const trigger =
      <div>
        {str}
      </div>;

    return (
      <Balloon trigger={trigger} triggerType="hover">
        {value}
      </Balloon>
    );
  };

  renderSchool = (value) => {
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };

  renderContent = (value) => {
    value = Base64.decode(value);
    const str = KunUtils.beautySub(value, 5);
    const trigger = <p>{str}</p>;

    return (
      <Balloon trigger={trigger} triggerType="hover">
        {value}
      </Balloon>
    );
  };

  renderTime = (value) => {
    const t1 = moment(new Date(value)).format('LLLL');
    const t2 = moment(new Date(value)).format('YYYY-MM-DD');
    const trigger = <p>{t2}</p>;

    return (
      <Balloon trigger={trigger} triggerType="hover">
        {t1}
      </Balloon>
    );
  };

  renderScore = (value) => {
    const trigger = <Rating value={value.scoreSum} type="grade" showInfo={false}/>;

    return (
      <Balloon trigger={trigger} triggerType="hover">
        <div>学术水平评分：<Rating value={value.scoreAcademic} type="grade"/></div>
        <br/>
        <div>科研经费评分：<Rating value={value.scoreFunding} type="grade"/></div>
        <br/>
        <div>师生关系评分：<Rating value={value.scoreRelationship} type="grade"/></div>
        <br/>
        <div>学生前途评分：<Rating value={value.scoreFuture} type="grade"/></div>
        <br/>
        <div>综合评价评分：<Rating value={value.scoreSum} type="grade"/></div>
        <br/>
      </Balloon>
    );
  };

  onFilter(filterParams) {
    console.log(filterParams);
    this.setState({
      filterParams: filterParams,
    })
  }

  extractFilterLabel(tableData, name) {
    let res = new Set(tableData.map(it => {
      return it[name];
    }));
    res = new Array(...res).map(it => {
      return {
        label: it,
        value: it
      }
    });
    return res;
  }

  render() {
    if (this.props.tableData.isShow === false) {
      return '';
    }

    // 过滤
    let tableData = this.props.tableData.list.slice();
    for (let key in this.state.filterParams) {
      let selectedKeys = this.state.filterParams[key].selectedKeys;
      if (selectedKeys.length) {
        tableData = tableData.filter(record => {
          return selectedKeys.some(value => {
            return record[key].indexOf(value) > -1;
          });
        });
      }
    }

    // 转换数据格式
    tableData.map(it => {
      it.scores = {
        scoreAcademic: parseInt(it.scoreAcademic),
        scoreFunding: parseInt(it.scoreFunding),
        scoreRelationship: parseInt(it.scoreRelationship),
        scoreFuture: parseInt(it.scoreFuture),
        scoreSum: parseInt(it.scoreSum)
      }
    });

    return (
      <div className="simple-table" style={{margin: '20px 12%'}}>
        <IceContainer>
          <Table
            dataSource={tableData}
            className="basic-table"
            hasBorder={false}
            onFilter={this.onFilter.bind(this)}
          >
            <Table.Column
              filters={this.extractFilterLabel(tableData, 'from')}
              title="评价人"
              dataIndex="from"
              cell={this.renderAddress}
            />
            <Table.Column
              title="学校"
              dataIndex="school"
              cell={this.renderSchool}
            />
            <Table.Column
              filters={this.extractFilterLabel(tableData, 'academy')}
              title="学院"
              dataIndex="academy"
            />
            <Table.Column
              filters={this.extractFilterLabel(tableData, 'teacherName')}
              title="导师姓名"
              dataIndex="teacherName"
            />
            <Table.Column
              title="综合评分"
              dataIndex="scores"
              cell={this.renderScore}
            />

            <Table.Column
              title="证明认识导师"
              dataIndex="proveContent"
              cell={this.renderContent}
            />
            <Table.Column
              title="评价内容"
              dataIndex="content"
              cell={this.renderContent}
            />
            <Table.Column
              title="评价时间"
              dataIndex="time"
              cell={this.renderTime}
            />
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  operation: {
    marginRight: '12px',
    textDecoration: 'none',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
