Page({
    data: {
        statusBarHeight: 20,
        scrollHeight: 0,
        fullScreen: !1,
        videoSrc: "",
        videoData: [],
        videoDialog: {
            hidden: !0,
            userInfo: wx.getStorageSync("userInfo"),
            imgUrl: getApp().globalData.imgUrl + "/image/feifei/getFreeVideo.png"
        },
        videoShow: !1,
        addFriend: !1,
        share: {
            title: "这么精彩的扑克教学视频，竟然是免费的！",
            imageUrl: ""
        }
    },
    onLoad: function(t) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                t.system.indexOf("Android"), e.setData({
                    statusBarHeight: t.statusBarHeight,
                    scrollHeight: t.windowHeight - 50 - t.statusBarHeight,
                    screenHeight: t.windowHeight,
                    screenWidth: t.windowWidth
                });
            }
        });
    },
    onShow: function() {
        this.getCatalog();
    },
    getCatalog: function() {
        var t = this;
        getApp().globalData.util.wxRequest("/video/catalog", "get", {}, function(e) {
            e.data.success && (t.setData({
                videoData: e.data.data.list
            }), e.data.data.shareInfo && wx.downloadFile({
                url: getApp().globalData.imgUrl + e.data.data.shareInfo.pictureUrl,
                success: function(a) {
                    200 == a.statusCode && t.setData({
                        share: {
                            title: e.data.data.shareInfo.title,
                            imageUrl: a.tempFilePath
                        }
                    });
                }
            }));
        });
    },
    videoDetail: function(t) {
        wx.navigateTo({
            url: "../videoDetail/videoDetail?id=" + t.currentTarget.dataset.id
        });
    },
    videoHidden: function() {
        this.setData({
            "videoDialog.hidden": !0
        });
    },
    play: function(t) {
        var e = this;
        getApp().globalData.util.wxRequest("/video/" + t.currentTarget.dataset.id, "get", {}, function(a) {
            a.data.success ? e.setData({
                videoSrc: a.data.data,
                videoShow: !0,
                addFriend: !1
            }) : 1003 == a.data.code && (1 == t.currentTarget.dataset.type ? (e.setData({
                videoSrc: a.data.msg,
                videoShow: !0,
                addFriend: !0,
                "videoDialog.hidden": !1
            }), wx.createVideoContext("myVideo", this).play()) : e.setData({
                videoSrc: a.data.msg,
                videoShow: !0,
                addFriend: !1
            }));
        });
    },
    videoClose: function() {
        wx.createVideoContext("myVideo", this).pause(), this.setData({
            videoShow: !1
        });
    },
    videoEnd: function() {
        this.setData({
            videoShow: !1
        });
    },
    timeUpdate: function(t) {
        var e = this, a = wx.createVideoContext("myVideo", this);
        t.detail.currentTime > 150 && 1 == e.data.addFriend && (a.pause(), e.setData({
            "videoDialog.hidden": !1
        }));
    },
    onShareAppMessage: function(t) {
        var e = this;
        return {
            title: e.data.share.title,
            imageUrl: e.data.share.imageUrl,
            path: getApp().globalData.sharePath
        };
    }
});