Page({
    data: {
        statusBarHeight: 20,
        scrollHeight: 0,
        active: 1,
        detailData: {},
        videoShow: !1,
        mallShow: !1,
        mallInfo: {},
        submitPay: !0,
        isIos: !0,
        videoDialog: {
            hidden: !0,
            userInfo: wx.getStorageSync("userInfo"),
            imgUrl: getApp().globalData.imgUrl + "/image/feifei/getFreeVideo.png"
        },
        videoVip: "",
        options: {},
        addFriend: !1,
        share: {
            title: "这么精彩的扑克教学视频，竟然是免费的！",
            imageUrl: ""
        }
    },
    onLoad: function(t) {
        var a = this;
        wx.getSystemInfo({
            success: function(e) {
                e.system.indexOf("Android") < 0 ? a.setData({
                    statusBarHeight: e.statusBarHeight,
                    scrollHeight: e.screenHeight - 50 - e.statusBarHeight,
                    options: t
                }) : a.setData({
                    statusBarHeight: e.statusBarHeight,
                    scrollHeight: e.screenHeight - 50 - e.statusBarHeight,
                    isIos: !1,
                    options: t
                });
            }
        });
    },
    onShow: function() {
        this.getData(this.data.options.id);
    },
    back: function() {
        wx.navigateBack();
    },
    clickTable: function(t) {
        1 == t.currentTarget.dataset.active ? this.setData({
            active: 1
        }) : this.setData({
            active: 2
        });
    },
    getData: function(t) {
        var a = this;
        getApp().globalData.util.wxRequest("/video/group/" + t, "get", {}, function(t) {
            console.log(t.data.data), t.data.success && (a.setData({
                detailData: t.data.data
            }), t.data.data.shareInfo && wx.downloadFile({
                url: getApp().globalData.imgUrl + t.data.data.shareInfo.pictureUrl,
                success: function(e) {
                    200 == e.statusCode && (console.log("1111"), a.setData({
                        share: {
                            title: t.data.data.shareInfo.title,
                            imageUrl: e.tempFilePath
                        }
                    }));
                }
            }));
        });
    },
    closeGiftBag: function() {
        this.setData({
            follow: !1
        });
    },
    videoHidden: function() {
        this.setData({
            "videoDialog.hidden": !0
        });
    },
    play: function(t) {
        var a = this;
        getApp().globalData.util.wxRequest("/video/" + t.currentTarget.dataset.id, "get", {}, function(e) {
            e.data.success ? a.setData({
                videoSrc: e.data.data,
                videoShow: !0,
                addFriend: !1
            }) : 1003 == e.data.code && (1 == t.currentTarget.dataset.type ? (a.setData({
                "videoDialog.imgUrl": getApp().globalData.imgUrl + "/image/feifei/getFreeVideo.png",
                videoShow: !0,
                videoSrc: e.data.msg,
                addFriend: !0
            }), wx.createVideoContext("myVideo", this).play()) : 2 == t.currentTarget.dataset.type && (a.setData({
                addFriend: !1
            }), a.noTaoZi()));
        });
    },
    timeUpdate: function(t) {
        var a = this, e = wx.createVideoContext("myVideo", this);
        t.detail.currentTime > 150 && 1 == a.data.addFriend && (e.pause(), a.setData({
            "videoDialog.hidden": !1
        }));
    },
    noTaoZi: function() {
        var t = this;
        t.data.isIos ? t.setData({
            "videoDialog.imgUrl": getApp().globalData.imgUrl + "/image/feifei/getVipVideo.png",
            "videoDialog.hidden": !1
        }) : (t.setData({
            videoVip: getApp().globalData.warnMap.videoVip.android
        }), t.selectComponent("#Introduction").showDialog());
    },
    clickMall: function() {
        this.setData({
            mallShow: !0
        }), this.getMallLists();
    },
    cancelIntroduction: function() {
        this.selectComponent("#Introduction").hideDialog();
    },
    getMallLists: function() {
        var t = this;
        getApp().globalData.util.wxRequest("/product/list", "get", {}, function(a) {
            if (a.data.success) {
                for (var e = 0; e < a.data.data.productList.length; e++) a.data.data.productList[e].detail && (a.data.data.productList[e].detail = a.data.data.productList[e].detail.replace(/#n#/g, "\n"));
                t.setData({
                    mallInfo: a.data.data
                });
            }
        });
    },
    mallPay: function(t) {
        var a = this;
        wx.login({
            success: function(e) {
                getApp().globalData.util.wxRequest("/wxPay/miniAppPre", "post", {
                    productId: t.detail.productId,
                    totalFee: t.detail.price,
                    code: e.code,
                    couponId: t.detail.couponId
                }, function(t) {
                    t.data.success ? a.sign(t.data.data.prepay_id, t.data.data.order_sn) : (a.setData({
                        submitPay: !0
                    }), 3009 == t.data.code && wx.showToast({
                        title: t.data.msg,
                        icon: "none",
                        duration: 2e3
                    }));
                }, function(t) {
                    a.setData({
                        submitPay: !0
                    });
                });
            }
        });
    },
    sign: function(t, a) {
        var e = this;
        getApp().globalData.util.wxRequest("/wxPay/miniAppSign", "post", {
            prePayId: t
        }, function(t) {
            t.data.success ? e.requestPayment(t.data, a) : e.setData({
                submitPay: !0
            });
        }, function(t) {
            e.setData({
                submitPay: !0
            });
        });
    },
    requestPayment: function(t, a) {
        var e = this;
        e.setData({
            submitPay: !0
        }), wx.requestPayment({
            timeStamp: t.data.timeStamp,
            nonceStr: t.data.nonceStr,
            package: t.data.package,
            signType: t.data.signType,
            paySign: t.data.paySign,
            success: function(t) {
                wx.showToast({
                    title: "支付成功",
                    icon: "success",
                    duration: 2e3
                }), setTimeout(function() {
                    e.selectComponent("#Introduction").hideDialog(), e.getMallLists();
                }, 500);
            },
            fail: function(t) {
                getApp().globalData.util.wxRequest("/wxPay/payCancel", "post", {
                    orderSn: a
                }, function(t) {
                    console.log(t);
                }), wx.showToast({
                    title: "交易关闭",
                    image: "../../images/icons/close.png",
                    duration: 1e3
                }), setTimeout(function() {
                    e.getMallLists();
                }, 500);
            }
        });
    },
    mallBack: function() {
        this.setData({
            mallShow: !1
        });
    },
    onShareAppMessage: function(t) {
        var a = this;
        return {
            title: a.data.share.title,
            imageUrl: a.data.share.imageUrl,
            path: getApp().globalData.sharePath
        };
    }
});