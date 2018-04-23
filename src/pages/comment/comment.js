const app = getApp();

Page({
  data: {
    hotComments: [], //评论
    comments: []
  },
  onShow: function () {
    const _this = this;
    const global = app.globalData;
    const id = global.id
    if (!id) {
      return;
    }
    wx.request({
      url: 'https://linshuirong.cn/comment/music?id=' + id + '&limit=40',
      success: function (res) {
        _this.setData({
          hotComments: res.data.hotComments,
          comments: res.data.comments
        })
      },
    });
  },
  newComment: function (e) {
    let input = e.detail.value;
    if (!input) {
      return;
    }

    const userInfo = app.globalData.userInfo;

    const arr = Object.assign([], this.data.comments)
    arr.unshift({
      user: {
        nickname: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      },
      content: input
    })

    this.setData({
      comments: arr
    })

    wx.showToast({
      title: '发表成功',
      icon: 'success',
      duration: 2000
    })
  }
})