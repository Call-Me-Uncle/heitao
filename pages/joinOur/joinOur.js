Page({
    data: {
        statusBarHeight: 20,
        img: getApp().globalData.imgUrl + "/image/intro/joinOur.png"
    },
    onLoad: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                a.system.indexOf("Android"), t.setData({
                    statusBarHeight: a.statusBarHeight,
                    scrollHeight: a.screenHeight - a.statusBarHeight
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    back: function() {
        wx.switchTab({
            url: "../mine/mine"
        });
    },
    onShareAppMessage: function(t) {
        return getApp().globalData.util.getShareTitle(), {
            title: getApp().globalData.shareTitle,
            imageUrl: getApp().globalData.shareImg,
            path: getApp().globalData.sharePath
        };
    }
});