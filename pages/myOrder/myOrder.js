Page({
    data: {
        statusBarHeight: 20,
        lists: [],
        scrollHeight: 0,
        currentPage: 1,
        pageSize: 15,
        dataHidden: !1
    },
    onLoad: function() {
        var t = this;
        t.getData(t.data.currentPage, t.data.pageSize, function(a) {
            a.data.data.list.length <= 0 ? t.setData({
                dataHidden: !0
            }) : t.setData({
                lists: a.data.data.list
            });
        }), getApp().globalData.util.getShareTitle(), wx.getSystemInfo({
            success: function(a) {
                a.system.indexOf("Android"), t.setData({
                    statusBarHeight: a.statusBarHeight,
                    scrollHeight: a.screenHeight - 50 - a.statusBarHeight
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    getData: function(t, a, e) {
        var i = this;
        getApp().globalData.util.wxRequest("/orderInfo/pageList", "post", {
            currentPage: t,
            pageSize: a
        }, function(t) {
            if (t.data.success) if (t.data.data.list.length > 0) {
                i.setData({
                    dataHidden: !1
                });
                for (var a in t.data.data.list) t.data.data.list[a].createTime = getApp().globalData.util.formatTime(t.data.data.list[a].createTime, !0);
                e(t);
            } else e(t);
        });
    },
    scrollTop: function() {
        var t = this;
        t.getData(t.data.currentPage + 1, t.data.pageSize, function(a) {
            t.setData({
                lists: t.data.lists.concat(a.data.data.list),
                currentPage: t.data.currentPage + 1
            });
        });
    },
    scrollBottom: function() {
        var t = this;
        t.getData(1, 15, function(a) {
            t.setData({
                lists: a.data.data.list,
                currentPage: 1
            });
        });
    },
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