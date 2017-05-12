import React, {
  Component
} from 'react';
import {
  Helmet
} from "react-helmet"; //定義head頭部
import logo from './logo.svg';
import {
  Navbar,
  Jumbotron,
  Button
} from 'react-bootstrap'; //引入bootstrap組件
import './App.css';

let __OG_TITLE__ = "我的站";

function head() {
  return (
    <div className="application">
      <Helmet>
          <title>百度翻译123</title>
    {/*      <meta name="keywords" content="翻译,在线翻译,百度翻译,词典,英语,"/>
          <meta name="description" content="百度翻译提供即时免费的多语种文本翻译和网页翻译服务，支持中、英、日、韩、泰、法、西、德等28种热门语言互译，覆盖756个翻译方向。"/>
     */} </Helmet>
    </div>
  )

}
class App extends Component {

  render() {
    return ( < div className = "App" > {
        head()
      } < div className = "App-header" > 123456 < img src = {
        logo
      }
      className = "App-logo"
      alt = "logo" / >
      <Button
        bsStyle="success"
        bsSize="large"
        href="http://react-bootstrap.github.io/components.html"
        target="_blank">
        View React Bootstrap Docs
      </Button> < Navbar inverse fixedTop >
      <Navbar.Header>
              <Navbar.Brand>
                <a href="/">React App</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header> < /Navbar> < small > You are running this application in <b>{process.env.NODE_ENV}</b >
      mode. < /small> < form > < input type = "hidden"
      defaultValue = {
        process.env.REACT_APP_SECRET_CODE
      }
      /> < /form > < h2 > Welcome to React < /h2> < /div > < p className = "App-intro" >
      To get started, edit < code > src / App.js < /code> and save to reload. < /p > < /div>
    );
  }
}

export default App;