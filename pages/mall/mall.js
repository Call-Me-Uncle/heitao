Page({
    data: {
        mallInfo: {},
        submitPay: !0
    },
    onLoad: function() {
        this.getMallLists();
    },
    onReady: function() {},
    onShow: function() {},
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
                }), wx.navigateBack({
                    payMall: !0
                }), setTimeout(function() {
                    e.getMallLists();
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
        wx.navigateBack();
    },
    onShareAppMessage: function(t) {
        return getApp().globalData.util.getShareTitle(), {
            title: getApp().globalData.shareTitle,
            imageUrl: getApp().globalData.shareImg,
            path: getApp().globalData.sharePath
        };
    }
});