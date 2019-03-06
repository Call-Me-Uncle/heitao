Page({
    data: {
        statusBarHeight: 20,
        img: getApp().globalData.imgUrl + "/image/intro/cost.png"
    },
    onLoad: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                a.system.indexOf("Android") < 0 ? t.setData({
                    statusBarHeight: a.statusBarHeight,
                    scrollHeight: a.screenHeight - 100 - a.statusBarHeight
                }) : t.setData({
                    statusBarHeight: a.statusBarHeight,
                    scrollHeight: a.screenHeight - 105 - a.statusBarHeight
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