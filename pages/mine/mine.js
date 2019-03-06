Page({
    data: {
        headImg: wx.getStorageSync("userInfo").avatarUrl,
        userName: wx.getStorageSync("userInfo").userName,
        coin: wx.getStorageSync("userInfo").coin,
        isMember: 0,
        statusBarHeight: 40,
        scrollHeight: 0,
        itemLists: [ {
            name: "训练历史",
            icon: "history",
            bindName: "clickHistory"
        }, {
            name: "我的订单",
            icon: "order",
            bindName: "clickMyOrder"
        }, {
            name: "AI牌局点评标准",
            icon: "comment",
            bindName: "clickAboutAi"
        }, {
            name: "关于黑桃大师",
            icon: "our",
            bindName: "clickAboutUs"
        } ],
        memberEndTimeDisPlay: "",
        userInfo: wx.getStorageSync("userInfo"),
        contactImg: getApp().globalData.imgUrl + "/image/feifei/contact.png"
    },
    onLoad: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                a.system.indexOf("Android") < 0 ? t.setData({
                    statusBarHeight: a.statusBarHeight,
                    scrollHeight: a.windowHeight - 50 - a.statusBarHeight
                }) : (t.data.itemLists.unshift({
                    name: "我的商城",
                    icon: "mall",
                    bindName: "clickMall"
                }), t.setData({
                    itemLists: t.data.itemLists,
                    statusBarHeight: a.statusBarHeight,
                    scrollHeight: a.windowHeight - 50 - a.statusBarHeight
                }));
            }
        });
    },
    onShow: function() {
        this.getCurrentUser();
    },
    getCurrentUser: function() {
        var t = this;
        getApp().globalData.util.wxRequest("/userInfo/getCurrentUser", "get", {}, function(a) {
            if (a.data.success) a.data.data.memberEndTimeDisPlay || (a.data.data.memberEndTimeDisPlay = ""), 
            t.setData({
                headImg: a.data.data.avatarUrl,
                userName: a.data.data.userName,
                userInfo: a.data.data,
                coin: a.data.data.coin,
                statusBarHeight: wx.getStorageSync("statusBarHeight"),
                isMember: a.data.data.isMember,
                memberEndTimeDisPlay: a.data.data.memberEndTimeDisPlay
            }); else {
                var e = wx.getStorageSync("userInfo");
                this.setData({
                    headImg: e.avatarUrl,
                    userName: e.userName,
                    coin: e.coin,
                    isMember: e.isMember,
                    statusBarHeight: wx.getStorageSync("statusBarHeight")
                });
            }
        }, function() {
            var t = wx.getStorageSync("userInfo");
            this.setData({
                headImg: t.avatarUrl,
                userName: t.userName,
                coin: t.coin,
                isMember: t.isMember,
                statusBarHeight: wx.getStorageSync("statusBarHeight")
            });
        });
    },
    clickIs: function() {
        wx.request({
            url: getApp().globalData.Url + "/clearTrainHh",
            method: "DELETE",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                token: getApp().globalData.token
            },
            data: {},
            success: function(t) {},
            fail: function() {
                console.log("系统错误");
            }
        });
    },
    clickMall: function() {
        wx.navigateTo({
            url: "../mall/mall"
        });
    },
    clickMyOrder: function() {
        wx.navigateTo({
            url: "../myOrder/myOrder"
        });
    },
    clickMyCoupon: function() {
        wx.navigateTo({
            url: "../myCoupon/myCoupon"
        });
    },
    clickCost: function() {
        wx.navigateTo({
            url: "../cost/cost"
        });
    },
    clickHistory: function() {
        wx.navigateTo({
            url: "../history/history"
        });
    },
    clickAboutUs: function() {
        wx.navigateTo({
            url: "../aboutUs/aboutUs"
        });
    },
    clickJoinOur: function() {
        wx.navigateTo({
            url: "../joinOur/joinOur"
        });
    },
    clickAboutAi: function() {
        wx.navigateTo({
            url: "../aboutAI/aboutAI"
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