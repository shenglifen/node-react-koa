### 前端：create-react-app antd axios react
### 后端：node koa sequelize mysql

#### 作为一个前端小新手，在尝试了一段时间的react前端工作后，就想尝试用node编写web服务，假装自己很厉害。在看了一段时间的node教程+express教程+koa教程等，就开始准备自己写一个小demo。

### 前端效果图（react+ antd + create-react-app）
![](https://user-gold-cdn.xitu.io/2018/7/17/164a711eb7b73b9b?w=1314&h=216&f=png&s=6885)

添加编辑

![](https://user-gold-cdn.xitu.io/2018/7/17/164a71e957241be8?w=1312&h=419&f=png&s=13881)

删除
![](https://user-gold-cdn.xitu.io/2018/7/17/164a71df76a0b586)
一个简单的用户列表页面，顶部有查询，添加用户按钮，列表中有删除，编辑用户按钮，底部有分页。

### 数据库中用户表设计


![](https://user-gold-cdn.xitu.io/2018/7/17/164a75e25e39a82d?w=705&h=320&f=png&s=22843)


### （一）前端搭建
##### 1.用facebook官方开发的create-react-app 脚手架搭建一个react前端框架。
#### (1)全局安装 create-react-app
````
npm install -g create-react-app
````
#### (2)创建项目
````
create-react-app node-react-koa
cd node-react-koa && mkdir server //node服务都放在该文件下
npm run eject //可省略，只为了看配置 config
npm start
````

#### 自此项目目录如下图
![](https://user-gold-cdn.xitu.io/2018/7/17/164a7213776d9319?w=221&h=228&f=png&s=8122)

#### (3) 搭建前端页面
##### 1.安装antd ,开箱即用的高质量 React 组件。[antd design ](https://ant.design/docs/react/introduce-cn)
````
npm install antd --save
````
##### 2.安装[axios](https://www.kancloud.cn/yunye/axios/234845) 一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中

````
npm install axios --save
````
##### 因为是一个小demo，因此我直接在 src/App.js 中直接画页面。
##### src/App.js
```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Table, Pagination, Input, Row, Button, Modal, Form } from 'antd';
import 'antd/dist/antd.css'
const { Search } = Input;
const FormItem = Form.Item;
const { confirm } = Modal;
class App extends Component {
  constructor(props) {
    super(props);
  }
  columns = [{
    dataIndex: "username", title: "用户",
  }, {
    dataIndex: "age", title: "年龄",
  }, {
    dataIndex: "address", title: "地址"
  }, {
    dataIndex: "action", title: "操作", width: 200, render: (text, row) => {
      return <div>
        <Button onClick={() => this.modal('edit', row)} >编辑</Button>
        <Button style={{ marginLeft: 10 }} type="danger" onClick={() => this.remove(row)} >删除</Button>
      </div>
    }
  }];
  state = {
    dataSource: [{ username: "slf", age: "18", address: "杭州", id: 1 }],
    current: 1,
    size: 10,
    total: 1,
    visible: false,
    modalType: "add"
  }
  componentDidMount() {
    this.sizeChange(this.state.current,this.state.size);
  }
  //分页
  sizeChange = (current, size) => {
  //todo
  }
  //提交
  handleOk = () => {
  //todo
  }
  //添加编辑用户
  modal = (type, row) => {
    this.setState({
      visible: true,
      modalType: type
    }, () => {
      this.props.form.resetFields();
      if (type === 'add') return;
      this.props.form.setFieldsValue({
        username: row.username,
        age: row.age,
        address: row.address
      })
    })
  }
  remove = (row) => {
    confirm({
      title: '是否要删除该用户?',
      okText: '是',
      okType: '否',
      cancelText: 'No',
      onOk() {
        //todo
      },
      onCancel() {
        //todo
      },
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div className="App">
        <Row>
          <Search style={{ width: 300 }} />
          <Button type="primary" style={{ marginLeft: 20 }} onClick={() => this.modal('add')} >添加用户</Button>
        </Row>
        <Row style={{ paddingTop: 20 }}>
          <Table dataSource={this.state.dataSource} rowKey={row => row.id} bordered columns={this.columns} pagination={false} />
        </Row>
        <Row style={{ paddingTop: 20 }}>
          <Pagination
            showTotal={(total) => `共 ${total} 条`}
            current={this.state.current} total={this.state.total} pageSize={this.state.size}
            onChange={this.sizeChange} />
        </Row>
        <Modal
          title={this.state.modalType === 'add' ? "添加用户" : "编辑用户"}
          onOk={this.handleOk}
          onCancel={() => this.setState({ visible: false })}
          visible={this.state.visible}
        >
          <Form>
            <FormItem label="用户"  {...formItemLayout}>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input placeholder="Username" />
              )}
            </FormItem>
            <FormItem label="年龄"  {...formItemLayout}>
              {getFieldDecorator('age', {
                rules: [{ required: true, message: 'Please input your age!' }],
              })(
                <Input placeholder="age" />
              )}
            </FormItem>
            <FormItem label="地址"  {...formItemLayout}>
               {getFieldDecorator('address', {
                rules: [{ required: true, message: 'Please input your address!' }],
              })(
                <Input placeholder="address" />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div >
    );
  }
}
export default Form.create()(App);
```
#####  上面代码中的todo都是要与后端服务联调的地方 (后面贴了完善版的前端)

### （二）后端搭建
#### 在后端的搭建中我用了[koa](https://koa.bootcss.com/) 和 [sequelize](http://docs.sequelizejs.com/)
#### 数据库 mysql
#### koa -- 基于 Node.js 平台的下一代 web 开发框架
#### Sequelize -- 是JS端的hibernate，完成server端到数据库的CRUD等等操作。

#### 1.安装依赖
````
npm install koa koa-body koa-cors koa-router sequelize mysql2 --save
````
##### [koa-body](https://www.npmjs.com/package/koa-body) 因为Web应用离不开处理表单(例如用户的添加编辑表单)。本质上，表单就是 POST 方法发送到服务器的键值对。koa-body模块可以用来从 POST 请求的数据体里面提取键值对。
##### [koa-cors](https://www.npmjs.com/package/koa-cors) 解决跨域问题

##### [koa-router](https://www.npmjs.com/package/koa-router) url处理器映射

#### 2.准备工作
在server目录下面新建以下内容：

![](https://user-gold-cdn.xitu.io/2018/7/17/164a744dff57dcb3?w=225&h=350&f=png&s=12913)

##### **/server/app.js** 为运行文件 运行方式 ```` node server/app.js````
##### **/server/routers** 前端访问api路径
##### **/server/model** 数据层： index.js 数据库连接 user.js 用户表


#### 3.新建koa服务
/server/app.js

````
const Koa = require('koa');
const cors = require('koa-cors');
const router = require('./routers/index')
// 创建一个Koa对象表示web app本身:
const app = new Koa();
app.use(cors());//解决跨域问题
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    console.log(ctx.request.path + ':' + ctx.request.method);
    await next();
});
app.use(router.routes());
app.listen(3005);
console.log('app started at port 3005...');
````

#### 4.连接数据库
/server/model/index.js
##### **operatorsAliases一定要写true，否则后续使用sql会用问题，例如使用￥like模糊查询会出现Invalid value问题**
````
const Sequelize = require('sequelize');
const sequelize = new Sequelize('表名', '用户名', '密码', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: true,
    pool: {
        max: 5, min: 0, acquire: 30000, idle: 10000
    },
    define: {
        timestamps: false,
    },
})
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
module.exports = sequelize;
````

#### 5.用户表
根据表设计

![](https://user-gold-cdn.xitu.io/2018/7/17/164a76053e682f99?w=705&h=320&f=png&s=22843)

/server/model/user.js

[sequelize](https://itbilu.com/nodejs/npm/V1PExztfb.html) 点击可看使用方式
````
/server/model/user.js

const Sequelize = require('sequelize')
const sequelize = require('./index')
const User = sequelize.define('userinfos', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
    username: { type: Sequelize.STRING },
    age:{type:Sequelize.INTEGER},
    address: { type: Sequelize.STRING },
    isdelete: { type: Sequelize.INTEGER, allowNull: true }//软删除 0为未删除，1为删除
});
module.exports = User;
````
### 下面重点来了，本文重点，写server！！！！！
因为项目小，我就写在了routers目录内。
````
/routers/index.js
````
#### 1.引入要用的[koa-body](https://www.npmjs.com/package/koa-body), [koa-router](https://www.npmjs.com/package/koa-router) ,数据表（model/user.js）
````
const koaBody = require('koa-body');
const router = require('koa-router')();
const User = require('../model/user');
````
#### 2.第一个api接口：获取所有的用户列表
````
router.get('/users', async (ctx, next) => {
    const user = await User.findAll({
        where: { isdelete: 0 },
    })
    ctx.body = user;
});
````
运行
````
node server/app.js
````
postman 测试

![](https://user-gold-cdn.xitu.io/2018/7/17/164a76c5835c88d7?w=1201&h=508&f=png&s=38395)

成功！

#### 下面开始正式的增删改查。
1.增加用户
先回到src/App.js，完善添加提交方法
````
handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, value) => {
            if (err) return;
            let data = {
                username: value.username, age: value.age, address: value.address
            };
            if (this.state.modalType === 'add') {
                axios.post("http://127.0.0.1:3005/user", data)
                    .then(msg => {
                        this.sizeChange(this.state.current, this.state.size);
                        this.setState({visible: false});
                        message.success('success!')
                    })
            } else {
                axios.put("http://127.0.0.1:3005/user/" + this.state.editRow.id, data)
                    .then(data => {
                        this.sizeChange(this.state.current, this.state.size);
                        this.setState({visible: false});
                        message.success('success!')
                    })
            }
        })
    }
````
2.添加api
server/routers/index.js
````
router.post('/user', koaBody(), async (ctx) => {
    const user = await User.build(ctx.request.body).save();
    ctx.body = user;
})
````


3.同理编辑用户
server/routers/index.js
````
router.put('/user/:id', koaBody(), async (ctx) => {
    const body = ctx.request.body;
    const user = await User.findById(ctx.params.id);
    await user.update({...body})
    ctx.body = user;
})
````

4.删除用户
server/router/index.js
````
router.delete('/user/:id', async (ctx) => {
    const user = await User.findById(ctx.params.id).then((user) => user);
    user.isdelete = 1;
    await user.save();
    ctx.body = { success: true }
})
````

5.分页查询
server/router/index.js

````
//{"limit":10,"offset":0,"search":"slf"}
router.post('/user-search', koaBody(), async (ctx) => {
    const body = ctx.request.body;
    const user = await User.findAndCount({
        where: {
            isdelete: 0, username: {
                $like: `%${body.search}%`
            }
        },
        limit: body.limit,
        offset: body.offset
    });
    ctx.body = user;
});
````

最后
````
module.exports = router;
````

完善版前端
````
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Table, Pagination, Input, Row, Button, Modal, Form, message} from 'antd';
import 'antd/dist/antd.css'

const {Search} = Input;
const FormItem = Form.Item;
const {confirm} = Modal;

class App extends Component {
    constructor(props) {
        super(props);
    }

    columns = [{
        dataIndex: "username", title: "用户",
    }, {
        dataIndex: "age", title: "年龄",
    }, {
        dataIndex: "address", title: "地址"
    }, {
        dataIndex: "action", title: "操作", width: 200, render: (text, row) => {
            return <div>
                <Button onClick={() => this.modal('edit', row)}>编辑</Button>
                <Button style={{marginLeft: 10}} type="danger" onClick={() => this.remove(row)}>删除</Button>
            </div>
        }
    }];
    state = {
        dataSource: [],
        current: 1,
        size: 10,
        total: 0,
        visible: false,
        modalType: "add",
        search: "",
        editRow: {}
    }

    componentDidMount() {
        this.sizeChange(this.state.current, this.state.size);
    }

    //分页
    sizeChange = (current, size) => {
        let data = {
            search: 'slf',
            limit: size,
            offset: (parseInt(current) - 1) * size
        }
        axios.post("http://localhost:3005/user-search", data).then(data => {
            this.setState({
                dataSource: data.data.rows,
                total: data.data.count,
                current, size
            })
        })
    };
    //提交
    handleOk = () => {
        this.props.form.validateFieldsAndScroll((err, value) => {
            if (err) return;
            let data = {
                username: value.username, age: value.age, address: value.address
            };
            if (this.state.modalType === 'add') {
                axios.post("http://127.0.0.1:3005/user", data)
                    .then(msg => {
                        this.sizeChange(this.state.current, this.state.size);
                        this.setState({visible: false});
                        message.success('success!')
                    })
            } else {
                axios.put("http://127.0.0.1:3005/user/" + this.state.editRow.id, data)
                    .then(data => {
                        this.sizeChange(this.state.current, this.state.size);
                        this.setState({visible: false});
                        message.success('success!')
                    })
            }
        })
    }
    //添加编辑用户
    modal = (type, row) => {
        this.setState({
            visible: true,
            modalType: type
        }, () => {
            this.props.form.resetFields();
            if (type === 'add') return;
            this.props.form.setFieldsValue({
                username: row.username,
                age: row.age,
                address: row.address
            })
            this.setState({editRow: row})
        })
    }
    remove = (row) => {
        let _this = this;
        confirm({
            title: '是否要删除该用户?',
            okText: '是',
            okType: '否',
            cancelText: 'No',
            onOk() {
                axios.delete("http://127.0.0.1:3005/user/"+row.id)
                    .then(data=>{
                        _this.sizeChange(_this.state.current, _this.state.size);
                        message.success('success!')
                    })
            }
        });
    };
    search = (name) => {
        this.setState({
            search: name
        }, () => {
            this.sizeChange(1, 10)
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        return (
            <div className="App">
                <Row>
                    <Search style={{width: 300}} onChange={this.search}/>
                    <Button type="primary" style={{marginLeft: 20}} onClick={() => this.modal('add')}>添加用户</Button>
                </Row>
                <Row style={{paddingTop: 20}}>
                    <Table dataSource={this.state.dataSource} rowKey={row => row.id} bordered columns={this.columns}
                           pagination={false}/>
                </Row>
                <Row style={{paddingTop: 20}}>
                    <Pagination
                        showTotal={(total) => `共 ${total} 条`}
                        current={this.state.current} total={this.state.total} pageSize={this.state.size}
                        onChange={this.sizeChange}/>
                </Row>
                <Modal
                    title={this.state.modalType === 'add' ? "添加用户" : "编辑用户"}
                    onOk={this.handleOk}
                    onCancel={() => this.setState({visible: false})}
                    visible={this.state.visible}
                >
                    <Form>
                        <FormItem label="用户"  {...formItemLayout}>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input placeholder="username"/>
                            )}
                        </FormItem>
                        <FormItem label="年龄"  {...formItemLayout}>
                            {getFieldDecorator('age', {
                                rules: [{required: true, message: 'Please input your age!'}],
                            })(
                                <Input placeholder="age"/>
                            )}
                        </FormItem>
                        <FormItem label="地址"  {...formItemLayout}>
                            {getFieldDecorator('address', {
                                rules: [{required: true, message: 'Please input your address!'}],
                            })(
                                <Input placeholder="address"/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(App);

````
