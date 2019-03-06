Page({
    data: {
        themeList: [],
        classPackageList: [],
        stamp: "",
        statusBarHeight: 20,
        id: 0,
        defaultEvId: 4,
        scrollHeight: 0,
        rotate: "",
        giftBag: !0,
        bagImg: {
            info: "",
            hidden: !0,
            img: getApp().globalData.imgUrl + "/image/feifei/gain1.png"
        },
        postFormTimes: 0,
        contactImg: getApp().globalData.imgUrl + "/image/feifei/contact.png",
        receiveImg: getApp().globalData.imgUrl + "/image/feifei/receive.png",
        isIOS: !1
    },
    onLoad: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                a.system.indexOf("Android") < 0 ? t.setData({
                    statusBarHeight: a.statusBarHeight,
                    scrollHeight: a.screenHeight - 100 - a.statusBarHeight,
                    isIOS: !0
                }) : t.setData({
                    statusBarHeight: a.statusBarHeight,
                    scrollHeight: a.screenHeight - 105 - a.statusBarHeight
                });
            }
        }), this.upDateThemeList();
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        this.setData({
            themeList: wx.getStorageSync("themeList"),
            statusBarHeight: wx.getStorageSync("statusBarHeight")
        }), 1 != getApp().globalData.GuideStatus[30] ? t.setData({
            giftBag: !1,
            receiveImg: getApp().globalData.imgUrl + "/image/feifei/receive.png",
            bagImg: {
                info: "",
                hidden: !0,
                img: getApp().globalData.imgUrl + "/image/feifei/gain1.png"
            }
        }) : wx.getStorageSync("userInfo").isWxFriend <= 0 && t.setData({
            giftBag: !1,
            receiveImg: getApp().globalData.imgUrl + "/image/feifei/add_service.png",
            bagImg: {
                info: "",
                hidden: !0,
                img: getApp().globalData.imgUrl + "/image/feifei/gain3.png"
            }
        });
    },
    upDateThemeList: function() {
        var t = this;
        getApp().globalData.util.wxRequest("/indexThemeAndClassPackage", "get", {}, function(a) {
            var e = a.data.data.classPackageList, i = a.data.data.themeList;
            i.map(function(a) {
                2 == a.trainType && (getApp().globalData.defaultEvId = a.id, t.setData({
                    defaultEvId: a.id
                }));
            }), wx.setStorageSync("classPackageList", e), wx.setStorageSync("themeList", i), 
            e.rotate = "", t.setData({
                classPackageList: e,
                themeList: i
            }), t.defaultOpen();
        });
    },
    formSubmit: function(t) {
        var a = this;
        getApp().globalData.formId.length < 15 && (getApp().globalData.formId.push(t.detail.formId), 
        15 == getApp().globalData.formId.length && a.postFormId());
    },
    postFormId: function() {
        var t = this;
        t.setData({
            postFormTimes: t.data.postFormTimes + 1
        }), wx.request({
            url: getApp().globalData.Url + "/userInfo/formId",
            method: "post",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                token: getApp().globalData.token
            },
            data: {
                formId: getApp().globalData.formId
            },
            success: function(a) {
                a.data.success || t.data.postFormTimes < 5 && t.postFormId();
            },
            fail: function(a) {
                t.data.postFormTimes < 5 && t.postFormId();
            }
        });
    },
    hidden: function(t) {
        var a = this, e = t.currentTarget.dataset.package;
        0 == t.currentTarget.dataset.lock && 0 == t.currentTarget.dataset.plan ? 2 == t.currentTarget.dataset.status && (1 != wx.getStorageSync("userInfo").isMember || 1 == wx.getStorageSync("userInfo").isMember && wx.getStorageSync("userInfo").memberEndTime < new Date().getTime()) ? getApp().globalData.util.isVIP(a.data.isIOS, "只有VIP会员才能进入此训练", !0) : a.open(e) : 1 == t.currentTarget.dataset.lock ? wx.showToast({
            title: "您的分数未达到该等级要求,请先进行低级别练习！",
            icon: "none",
            duration: 1500
        }) : 1 == t.currentTarget.dataset.plan && wx.showToast({
            title: "该课程即将上线，敬请期待！",
            icon: "none",
            duration: 1500
        });
    },
    open: function(t) {
        var a = this;
        a.data.classPackageList.map(function(e, i) {
            e.id == t ? "rotate" == e.rotate ? (e.rotate = "", a.setData({
                stamp: null,
                classPackageList: a.data.classPackageList
            })) : (e.rotate = "rotate", a.setData({
                stamp: t,
                classPackageList: a.data.classPackageList
            })) : e.rotate = "";
        });
    },
    defaultOpen: function() {
        var t = {
            currentTarget: {
                dataset: {
                    lock: 0,
                    package: 3,
                    plan: 0,
                    status: 1
                }
            }
        };
        this.hidden(t);
    },
    themeItem: function(t) {
        var a = this, e = t.currentTarget.dataset.lock;
        a.setData({
            id: t.currentTarget.dataset.id
        }), getApp().globalData.scene = 1001, 1 == e ? wx.showToast({
            title: "您的分数未达到该等级要求,请先进行低级别练习！",
            icon: "none",
            duration: 1500
        }) : wx.navigateTo({
            url: "../practice/practice?id=" + t.currentTarget.dataset.id + "&gameCard=" + !1 + "&path=catalog",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    clickGiftBag: function() {
        this.data.bagImg ? this.setData({
            "bagImg.hidden": !1
        }) : this.setData({
            "bagImg.hidden": !0
        });
    },
    closeGiftBag: function() {
        this.setData({
            "bagImg.hidden": !0
        });
    },
    cancelEvent: function() {
        this.selectComponent("#dialog").hideDialog();
    },
    onShareAppMessage: function(t) {
        return getApp().globalData.util.getShareTitle(), {
            title: getApp().globalData.shareTitle,
            imageUrl: getApp().globalData.shareImg,
            path: getApp().globalData.sharePath
        };
    }
});