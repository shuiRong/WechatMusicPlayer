Page({  
  data: {  
    c_index: 0,//当前  
    s3_width: 0,  
    t_width: 250,//上方每个tab的大小  
    scroll_left: 0,//上方滚动的位置  
    t_margin_left: 0,//上方的margin-left  
    tab_tite_data: [  
      { "name": "1", "color": "orange", }  
      , { "name": "2", "color": "blue", }  
      , { "name": "3", "color": "green", }  
      , { "name": "4", "color": "yellow", }  
      , { "name": "5", "color": "black", }  
      , { "name": "6", "color": "pink", }  
    ],  
  },  
  onShow: function () {  
    this.getwidth();  
  },  
  //滑  
  get_index: function (e) {  
    var crash_current = e.detail.current;  
    var s = 0;  
    if (crash_current != 0 && crash_current != 1) {  
      s = parseInt(crash_current - 1) * this.data.s3_width;  
    }  
    this.setData({  
      c_index: e.detail.current,  
      scroll_left: s  
    });  
  },  
  //点  
  changeview: function (e) {  
    var crash_current = e.currentTarget.dataset.current;  
    var s = 0;  
    if (crash_current != 0 && crash_current != 1) {  
      s = parseInt(crash_current - 1) * this.data.s3_width;  
    }  
    this.setData({  
      c_index: e.currentTarget.dataset.current,  
      scroll_left: s  
    });  
  },  
  getwidth: function () {  
    var that = this;  
    wx.getSystemInfo({  
      success: function (res) {  
        that.setData(that.data.s3_width = res.windowWidth / 3);  
      },  
    })  
  }  
})  