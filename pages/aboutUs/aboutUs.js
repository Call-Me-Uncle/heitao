Page({
    data: {
        statusBarHeight: 20,
        img: getApp().globalData.imgUrl + "/image/intro/aboutUs.png",
        scrollHeight: 0
    },
    onLoad: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    statusBarHeight: a.statusBarHeight,
                    scrollHeight: a.screenHeight - a.statusBarHeight - 50
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