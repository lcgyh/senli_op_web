import {
  Avatar,
  Card,
  Col,
  Divider,
  Icon,
  Input,
  Row,
  Tag,
  Button,
  DatePicker,
  Select
} from "antd";
import React, { PureComponent } from "react";
import { GridContent } from "@ant-design/pro-layout";
import Link from "umi/link";
import { connect } from "dva";
import Projects from "../../../components/Projects";
import Applications from "../../../components/Applications";
import Articles from "../../../components/Articles";
import styles from "./styles.less";

const { RangePicker } = DatePicker;
const { Option } = Select;
const operationTabList = [
  {
    key: "articles",
    tab: (
      <span>
        发布的公告{" "}
        <span
          style={{
            fontSize: 14
          }}
        >
          (8)
        </span>
      </span>
    )
  },
  {
    key: "applications",
    tab: (
      <span>
        收藏的公告{" "}
        <span
          style={{
            fontSize: 14
          }}
        >
          (8)
        </span>
      </span>
    )
  }
  // {
  //   key: 'projects',
  //   tab: (
  //     <span>
  //       项目{' '}
  //       <span
  //         style={{
  //           fontSize: 14,
  //         }}
  //       >
  //         (8)
  //       </span>
  //     </span>
  //   ),
  // },
];

@connect(({ loading, accountCenter }) => ({
  currentUser: {},
  currentUserLoading: loading.effects["accountCenter/fetchCurrent"]
}))
class Center extends PureComponent {
  // static getDerivedStateFromProps(
  //   props: accountCenterProps,
  //   state: accountCenterState,
  // ) {
  //   const { match, location } = props;
  //   const { tabKey } = state;
  //   const path = match && match.path;
  //   const urlTabKey = location.pathname.replace(`${path}/`, '');
  //   if (urlTabKey && urlTabKey !== '/' && tabKey !== urlTabKey) {
  //     return {
  //       tabKey: urlTabKey,
  //     };
  //   }
  //   return null;
  // }
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: "",
    tabKey: "articles"
  };
  input = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    //请求公告信息列表

    //请求事项列表

    // dispatch({
    //   type: 'accountCenter/fetchCurrent',
    // });
    // dispatch({
    //   type: 'accountCenter/fetch',
    // });
  }

  onTabChange = key => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key
    });
  };
  showInput = () => {
    this.setState(
      {
        inputVisible: true
      },
      () => this.input && this.input.focus()
    );
  };
  saveInputRef = input => {
    this.input = input;
  };
  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };
  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;

    if (
      inputValue &&
      newTags.filter(tag => tag.label === inputValue).length === 0
    ) {
      newTags = [
        ...newTags,
        {
          key: `new-${newTags.length}`,
          label: inputValue
        }
      ];
    }

    this.setState({
      newTags,
      inputVisible: false,
      inputValue: ""
    });
  };
  renderChildrenByTabKey = tabKey => {
    if (tabKey === "projects") {
      return <Projects />;
    }

    if (tabKey === "applications") {
      return <Applications />;
    }

    if (tabKey === "articles") {
      return <Articles />;
    }

    return null;
  };

  extraCreate = () => {
    return (
      <div className={styles.extra_con}>
        <div className={styles.extra_con_r}>
          <RangePicker className={styles.extra_con_r_data} />
          <Select style={{ width: 120 }} allowClear>
            <Option value="1">未开始</Option>
            <Option value="2">进行中</Option>
            <Option value="3">已撤销</Option>
            <Option value="4">已删除</Option>
            <Option value="5">已结束</Option>
          </Select>
        </div>
      </div>
    );
  };
  titleCreate = () => {
    return (
      <div className={styles.extra_con}>
        <div className={styles.extra_con_l}>
          {/* <Button type="primary" className={styles.extra_con_l_btn}>
            创建代办
          </Button> */}
          <Button type="primary">发布公告</Button>
        </div>
      </div>
    );
  };



  render() {
    const { newTags, inputVisible, inputValue, tabKey } = this.state;
    const { currentUser, currentUserLoading } = this.props;
    const dataLoading =
      currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card
              bordered={false}
              style={{
                marginBottom: 24
              }}
              loading={dataLoading}
            >
              {!dataLoading ? (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatar} />
                    <div className={styles.name}>{currentUser.name}</div>
                    <div>{currentUser.signature}</div>
                  </div>
                  <div className={styles.detail}>
                    <p>
                      <i className={styles.title} />
                      {currentUser.title}
                    </p>
                    <p>
                      <i className={styles.group} />
                      {currentUser.group}
                    </p>
                    <p>
                      <i className={styles.address} />
                      {currentUser.geographic.province.label}
                      {currentUser.geographic.city.label}
                    </p>
                  </div>
                  <Divider dashed />
                  <div className={styles.tags}>
                    <div className={styles.tagsTitle}>标签</div>
                    {currentUser.tags.concat(newTags).map(item => (
                      <Tag key={item.key}>{item.label}</Tag>
                    ))}
                    {inputVisible && (
                      <Input
                        ref={ref => this.saveInputRef(ref)}
                        type="text"
                        size="small"
                        style={{
                          width: 78
                        }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                      />
                    )}
                    {!inputVisible && (
                      <Tag
                        onClick={this.showInput}
                        style={{
                          background: "#fff",
                          borderStyle: "dashed"
                        }}
                      >
                        <Icon type="plus" />
                      </Tag>
                    )}
                  </div>
                  <Divider
                    style={{
                      marginTop: 16
                    }}
                    dashed
                  />
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>团队</div>
                    <Row gutter={36}>
                      {currentUser.notice &&
                        currentUser.notice.map(item => (
                          <Col key={item.id} lg={24} xl={12}>
                            <Link to={item.href}>
                              <Avatar size="small" src={item.logo} />
                              {item.member}
                            </Link>
                          </Col>
                        ))}
                    </Row>
                  </div>
                </div>
              ) : null}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
              extra={this.extraCreate()}
              title={this.titleCreate()}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default Center;
