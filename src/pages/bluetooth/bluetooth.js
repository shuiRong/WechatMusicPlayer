const app = getApp();

Page({
  data: {
    mp3: undefined,
    coverImgUrl: undefined,
    title: undefined,
    singer: undefined,
    epname: undefined,
    time: undefined
  },
  onLoad: function () {
    const global = app.globalData;
    const info = global.info;
    const backgroundAudioManager = wx.getBackgroundAudioManager()

    backgroundAudioManager.title = info.name ? info.name : '此时此刻'
    backgroundAudioManager.album = info.album ? info.album : '此时此刻'
    backgroundAudioManager.singer = info.singer ? info.singer : '许巍'
    backgroundAudioManager.coverImgUrl = info.picUrl ? info.picUrl : 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    let _this = this;
    let temp = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放

    console.log(222, global.id)
    if (global.id) {
      wx.request({
        url: 'http://localhost:3000/music/url?id=' + global.id,
        success: function (res) {
          let mp3 = res.data.data[0].url
          _this.setData({
            mp3: mp3,
          });
          backgroundAudioManager.src = mp3 ? mp3 : temp
        },
        fail: function (err) {
          console.log(err)
          backgroundAudioManager.src = temp
        }
      })
    } else {
      backgroundAudioManager.src = temp
    }

  },
  getMp3: function (id) {
    let _this = this;
    wx.request({
      url: 'http://localhost:3000/music/url?id=' + id,
      success: function (res) {
        console.log(res)
        _this.setData({
          mp3: res.data.data.url,
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})