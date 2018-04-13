//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    likedList: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow: function () {
    const likedList = app.globalData.likedList;
    this.setData({
      likedList: likedList
    })
  },
  toPlay: function (e) {
    let global = app.globalData;
    let id = e.currentTarget.dataset.id;
    let playList = global.playList;
    let likedList = global.likedList;

    // 如果当前歌曲存在于列表中，数据直接用
    let tempSong = likedList.find(item => item.id === id);
    global.info = tempSong

    // 播放列表中不存在的话，添加进去
    if (!playList.find(item => item.id === id)) {
      playList.push(song);
    }
    // 更新全局变量 id
    global.id = id;

    wx.switchTab({
      url: '/pages/play/play',
      success: function (res) {
      },
      fail: function (err) {
      }
    })
  }
})