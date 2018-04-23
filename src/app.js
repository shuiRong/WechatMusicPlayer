//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    id: 452986458, // 全局音乐id
    info: {
      "id": 452986458,
      "title": "红昭愿",
      "singer": [{
        "name": "音阙诗听",
      }],
      "album": "红昭愿",
      "coverImgUrl": "http://p1.music.126.net/8ltR3o9R8uJ9_5Cc71cDhA==/109951162951242154.jpg"
    }, //歌曲信息
    playList: [], // 音乐播放列表 对象数组 用来上一首下一首
    likedList: [{
      "id": 526464293,
      "coverImgUrl": "http://p1.music.126.net/84FJjDgb51TmRqixaUpshg==/109951163094476391.jpg",
      "title": "空空如也 ",
      "singer": [{
        "id": 9255,
        "name": "任然",
        "tns": [],
        "alias": []
      }],
      "album": "空空如也"
    }], // 我喜欢的歌曲列表 对象数组 属性和playList一样
  }
})