import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Rating,
  Feedback
} from '@icedesign/base';
import {Base64} from 'js-base64';
import NebUtils from '../../../../util/NebUtils.js'
import SchoolDataBase from '../../../../util/schools.js'
import $ from 'jquery';

const {Row, Col} = Grid;
const Toast = Feedback.toast;

const dataSource = [
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'},
  {label: '4', value: '4'},
  {label: '5', value: '5'},
];

export default class CreateActivityForm extends Component {
  static displayName = 'CreateActivityForm';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        school: '',
        academy: '',
        teacherName: '',
        scoreAcademic: 5,
        scoreFunding: 5,
        scoreRelationship: 5,
        scoreFuture: 5,
        scoreSum: 5,
        content: '',
        proveContent: '',
      },
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  scrollTop() {
    $("html,body").animate({scrollTop: 0}, 500);
  }

  submit = () => {
    this.formRef.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return;
      }
      if (!NebUtils.checkInstalledPlugin()) {
        Toast.error('还未安装Chrome扩展，请点击页面上方的下载按钮');
      }
      this.scrollTop();
      const contract = {
        function: 'createEvaluation',
        args: `["${values.school.trim()}", "${values.academy.trim()}", "${values.teacherName.trim()}", "${values.scoreAcademic}", "${values.scoreFunding}", "${values.scoreRelationship}", "${values.scoreFuture}", "${values.scoreSum}",  "${Base64.encode(values.content)}", "${Base64.encode(values.proveContent)}"]`,
      };
      NebUtils.nebPayCall(contract.function, contract.args, true, (txHash) => {
        Toast.success("已提交交易，交易成功后即创建导师评价成功，重新搜索可见！")
      });
    });
  };

  render() {
    return (
      <div className="create-activity-form" style={{margin: '20px 12%'}}>
        <IceContainer title="创建研究生导师评价" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="4" style={styles.formLabel}>
                  学校全称：
                </Col>
                <Col s="18" l="20">
                  <IceFormBinder
                    name="school"
                    required
                    message="必填"
                  >
                    <Input style={{width: '100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="school"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="4" style={styles.formLabel}>
                  学院全称：
                </Col>
                <Col s="18" l="20">
                  <IceFormBinder
                    name="academy"
                    required
                    message="必填"
                  >
                    <Input style={{width: '100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="academy"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="4" style={styles.formLabel}>
                  教师姓名：
                </Col>
                <Col s="18" l="20">
                  <IceFormBinder
                    name="teacherName"
                    required
                    message="必填"
                  >
                    <Input style={{width: '100%'}}/>
                  </IceFormBinder>
                  <IceFormError name="teacherName"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="4" style={styles.formLabel}>
                  学术水平评分：
                </Col>
                <Col s="18" l="20">
                  <IceFormBinder
                    name="scoreAcademic"
                    required
                    message="必填"
                  >
                    <Select dataSource={dataSource}/>
                  </IceFormBinder>
                  <IceFormError name="scoreAcademic"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="4" style={styles.formLabel}>
                  科研经费评分：
                </Col>
                <Col s="18" l="20">
                  <IceFormBinder
                    name="scoreFunding"
                    required
                    message="必填"
                  >
                    <Select dataSource={dataSource}/>
                  </IceFormBinder>
                  <IceFormError name="scoreFunding"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="4" style={styles.formLabel}>
                  师生关系评分：
                </Col>
                <Col s="18" l="20">
                  <IceFormBinder
                    name="scoreRelationship"
                    required
                    message="必填"
                  >
                    <Select dataSource={dataSource}/>
                  </IceFormBinder>
                  <IceFormError name="scoreRelationship"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="4" style={styles.formLabel}>
                  学生前途评分：
                </Col>
                <Col s="18" l="20">
                  <IceFormBinder
                    name="scoreFuture"
                    required
                    message="必填"
                  >
                    <Select dataSource={dataSource}/>
                  </IceFormBinder>
                  <IceFormError name="scoreFuture"/>
                </Col>
              </Row>

              <Row style={styles.formItem}>
                <Col xxs="6" s="4" l="4" style={styles.formLabel}>
                  导师综合评分：
                </Col>
                <Col s="18" l="20">
                  <IceFormBinder
                    name="scoreSum"
                    required
                    message="必填"
                  >
                    <Select dataSource={dataSource}/>
                  </IceFormBinder>
                  <IceFormError name="scoreSum"/>
                </Col>
              </Row>

              <Row>
                <Col xxs="6" s="4" l="4" style={styles.formLabel}>
                  证明认识导师：
                </Col>
                <Col s="18" l="20">
                  <IceFormBinder name="proveContent">
                    <Input multiple style={{width: '100%'}} rows={5}/>
                  </IceFormBinder>
                </Col>
              </Row>

              <Row>
                <Col xxs="6" s="4" l="4" style={styles.formLabel}>
                  评价导师正文：
                </Col>
                <Col s="18" l="20">
                  <IceFormBinder name="content">
                    <Input multiple style={{width: '100%'}} rows={5}/>
                  </IceFormBinder>
                </Col>
              </Row>

              <Row style={styles.btns}>
                <Col xxs="6" s="4" l="4" style={styles.formLabel}>
                  {' '}
                </Col>
                <Col s="18" l="20">
                  <Button type="primary" onClick={this.submit}>
                    立即评价
                  </Button>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
};
