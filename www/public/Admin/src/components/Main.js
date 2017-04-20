require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
//獲取圖片相關的json數據
let imageDatas = require('../data/imageDatas.json');
//利用自執行函數，將圖片信息轉成圖片URL路徑信息
imageDatas = (function genImageURL(imageDatasArr) {
  for (let i = 0, j = imageDatasArr.length; i < j; i++) {
    let singleImageData = imageDatasArr[i];

    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);
/* 獲取區間內的一個隨機值 */
function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}
/**
 * 獲取0～30度之間的一個任意正負值
 * @return number
 */
function get30DegRandom() {
  return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30)
}
let ImgFigure = React.createClass({
    /**
     * 圖片和小圓點的點擊事件
     * @param   e  鼠標事件
     * @return {[type]}   [description]
     */
    handleClick: function(e) {
      if (this.props.arrange.isCenter) { //如果圖片是居中的就執行翻轉動作
        this.props.inverse(); //執行綁定的閉包函數
      } else { //否則讓當前點幾圖片居中
        this.props.center();
      }

      //清除鼠標默認事件
      e.stopPropagation();
      e.preventDefault();
    },
    render: function() {
      let styleObj = {};
      //如果props屬性中指定了這張圖片的位置，則使用之
      if (this.props.arrange.pos) {
        styleObj = this.props.arrange.pos;
      }
      //如果圖片的旋轉角度有值並且不爲0,添加旋轉角度
      if (this.props.arrange.rotate) {
        ['-moz-', '-ms-', '-webkit-', ''].forEach(function(value) {
          styleObj[value + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
        }.bind(this))
      }
      if (this.props.arrange.isCenter) { //給居中圖片添加z-index值
        styleObj.zIndex = 11;
      }
      let imgFigureClassName = 'img-figure';
      imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
      return (
        <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
    <img src={this.props.data.imageURL} alt={this.props.data.title}/>
          <figcaption>
            <h2 className="img-title">{this.props.data.title}</h2>
            <div className="img-back" onClick={this.handleClick}>
              <p>
                {this.props.data.desc}
              </p>
            </div>
          </figcaption>
        </figure>
      )
    }
  })
  // let yeomanImage = require('../images/yeoman.png');
  //控制組件(小圓鈕)
let ControllerUnit = React.createClass({
    render: function() {
      return (
        <span className="controller-unit" onClick={this.handleClick}></span>
      )
    }
  })
  //主控制,總管家(總舞臺)
let AppComponent = React.createClass({
  Constant: { //設置常量用於存儲圖片的位置
    centerPos: {
      left: 0,
      right: 0
    },
    hPosRange: { //水平方向的取值範圍
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: {
      x: [0, 0],
      topY: [0, 0]
    }
  },
  /**
   * 翻轉圖片
   * @param  number index 輸入當前被執行inverse操作的圖片對應的圖片信息數組的index值
   * @return {Function}   這是一個閉包函數，其內return一個真正待被執行的函數
   */
  inverse: function(index) {
    return function() {
      //獲取所有的數據
      let imgsArrangeArr = this.state.imgsArrangeArr;
      //獲取當前圖片的正反值。並取反
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({ //重匯視圖
        imgsArrangeArr: imgsArrangeArr
      })
    }.bind(this);
  },
  /**
   * 自定義封裝函數，用於重新隨機布局所有圖片
   * @param  number centerIndex 需要重新排布的圖片
   * @return            
   */
  rearrange: function(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,
      imgsArrangeTopArr = [], //存儲上側區域圖片
      topImgNum = Math.ceil(Math.random() * 2), //取一個或者不取，因爲上側區域可以放置一張圖片或者不放。放多了影響效果
      topImgSpliceIndex = 0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1); //從所有狀態圖片位置中獲取一張圖片位置
    //首先居中centerIndex的圖片,居中的centerIndex的圖片不需要旋轉
    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    }

    //取出要布局上側的圖片的狀態信息
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
    //布局位於上側的圖片，使用forEach循環有個好處。如果不是數組就不會進到這個循環裏
    imgsArrangeTopArr.forEach(function(value, index) {
      imgsArrangeTopArr[index] = {
        pos: {
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }
    });
    //布局左右兩側的圖片
    for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLORX = null;
      //前半部分布局左邊，右半部分布局右邊
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }
      imgsArrangeArr[i] = {
        pos: {
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }
    }
    //取出上側區域的圖片位置，並填充進數組
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }
    //取出中心區域的圖片位置，並填充進數組
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

    //重新賦值setState,這樣react就會重新渲染頁面
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });
  },
  /**
   * 閉包函數，利用rearrange函數，居中對應index的圖片
   * @param number index 需要被居中的圖片對應的圖片信息數組的index值 
   * @return {Function} 
   */
  center: function(index) {
    return function() {
      this.rearrange(index);
    }.bind(this);
  },
  //react的初始化state值(用於初始舞臺的圖片位置)，當這個值發生變化後。react會重構頁面
  getInitialState: function() {
    return {
      imgsArrangeArr: [
        // {
        //   pos: {
        //     left: '0',
        //     top: '0'
        //   },
        //   rotate: 0,    //旋轉角度
        //   isInverse:false,   //圖片正反面，false正面
        //   isCenter:false,    //圖片是否居中，false不居中
        // }
      ]
    }
  },

  //組件加載後的回調函數。爲毎張圖片計算其位置範圍
  componentDidMount: function() {
    //首先拿到舞臺的大小(獲取真實的DOM節點)
    let stateDOM = ReactDOM.findDOMNode(this.refs.state),
      stateW = stateDOM.scrollWidth,
      stateH = stateDOM.scrollHeight,
      halfStateW = Math.ceil(stateW / 2),
      halfStateH = Math.ceil(stateH / 2);
    //拿到一個imageFigure的大小
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);
    //計算中心點的位置
    this.Constant.centerPos = {
        left: halfStateW - halfImgW,
        top: halfStateH - halfImgH
      }
      //計算左側，右側區域圖片排布位置的取值範圍
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStateW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStateW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stateW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stateH - halfImgH;
    //計算上側區域圖片排布位置的取值範圍
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStateH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStateW - imgW;
    this.Constant.vPosRange.x[1] = halfStateW;
    //調用自定義封裝的函數
    this.rearrange(0);
  },
  render() {
    let controllerUnits = [],
      imgFigures = [];
    imageDatas.forEach(function(value, index) {
      if (!this.state.imgsArrangeArr[index]) { //如果當前數組未定義，就初始化
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }
      imgFigures.push(<ImgFigure data={value} ref={'imgFigure'+index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />);
    }.bind(this));
    return (
      <section className="state" ref="state">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
})

AppComponent.defaultProps = {};

export default AppComponent;