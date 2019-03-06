function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        title: {
            type: String,
            value: "默认标题"
        },
        content: {
            type: String,
            value: ""
        },
        cancelText: {
            type: String,
            value: "取消按钮"
        },
        centerText: {
            type: String,
            value: ""
        },
        confirmText: {
            type: String,
            value: "确认按钮"
        },
        contentColor: {
            type: String,
            value: "#999999"
        },
        titleColor: {
            type: String,
            value: "#3CC51F"
        },
        headImg: {
            type: String,
            value: ""
        },
        opAreaValue: {
            type: String,
            value: ""
        },
        remakeImg: {
            type: String,
            value: ""
        },
        headImgHidden: {
            type: Boolean,
            value: !0
        },
        opinion: {
            type: Boolean,
            value: !0
        },
        shiFanButton: {
            type: Boolean,
            value: !0
        },
        playBackButton: {
            type: Boolean,
            value: !0
        },
        iconHide: {
            type: Boolean,
            value: !1
        },
        trainType: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        isShow: !1,
        content: "",
        praise: 0,
        collect: 0,
        tread: 0,
        animateHidden: "",
        textValue: [],
        clickDialogTitle: "",
        defaultUrl: getApp().globalData.Url + "/image/web/button.png",
        defaultUrl2: getApp().globalData.Url + "/image/web/button2.png",
        guide: !0,
        guideImg: getApp().globalData.imgUrl + "/image/lead/remarkOn.png"
    },
    methods: {
        hideDialog: function() {
            var t = this;
            "牌局点评" == this.data.title || "训练小结" == this.data.title ? (this.setData({
                animateHidden: "animateHidden"
            }), setTimeout(function() {
                t.setData({
                    isShow: !1,
                    animateHidden: ""
                });
            }, 400)) : t.setData({
                isShow: !1,
                animateHidden: ""
            });
        },
        showDialog: function(t) {
            this.setData({
                isShow: !0,
                textValue: t
            });
        },
        show: function(t) {
            this.setData({
                isShow: !0,
                content: t
            });
        },
        guideShow: function() {
            this.updateState(2), this.setData({
                isShow: !0,
                guide: !0
            });
        },
        animateHidden: function() {
            var t = this;
            this.setData({
                animateHidden: "animateHidden"
            }), setTimeout(function() {
                t.setData({
                    isShow: !1,
                    animateHidden: ""
                });
            }, 400);
        },
        closeHidden: function() {
            var t = this;
            "牌局点评" == this.data.title || "训练小结" == this.data.title ? (this.setData({
                animateHidden: "animateHidden"
            }), setTimeout(function() {
                t.setData({
                    isShow: !1,
                    animateHidden: ""
                }), t.data.headImgHidden && t.judgeGuide(2);
            }, 400)) : t.setData({
                isShow: !1,
                animateHidden: ""
            });
        },
        judgeGuide: function(t) {
            var e = this;
            getApp().globalData.guide || 1 != getApp().globalData.GuideStatus[t] && e.setData({
                guide: !1,
                guideImg: getApp().globalData.imgUrl + "/image/lead/remarkOn.png"
            });
        },
        updateState: function(t) {
            var e = this;
            getApp().globalData.GuideStatus[t] = 1, getApp().globalData.util.wxPracticeRequest("/userInfo/noviceGuide", "post", {
                status: e.newState(getApp().globalData.GuideStatus)
            }, function(t) {
                console.log("状态码更新成功！");
            });
        },
        newState: function(e) {
            var a = "", i = [].concat(t(e));
            i = i.reverse();
            for (var n = 0; n < i.length; n++) 1 == i[n] ? a += "1" : a += "0";
            return parseInt(a, 2);
        },
        _cancelEvent: function() {
            this.triggerEvent("cancelEvent");
        },
        _centerEvent: function() {
            this.triggerEvent("centerEvent");
        },
        _confirmEvent: function() {
            this.triggerEvent("confirmEvent");
        },
        _collect: function() {
            this.triggerEvent("collect");
        },
        _tread: function() {
            this.triggerEvent("tread");
        },
        _praise: function() {
            this.triggerEvent("praise");
        },
        playBack: function() {
            this.triggerEvent("playBack");
        },
        demonstration: function() {
            this.triggerEvent("demonstration");
        },
        clickNouns: function(t) {
            var e = this;
            t.detail.url ? (console.log("跳转小程序"), wx.navigateToMiniProgram({
                appId: "wxd8c6faa9d711687b",
                path: "/pages/index/index",
                extraData: {},
                envVersion: "release",
                success: function(t) {}
            })) : getApp().globalData.util.wxRequest("/getInfoByKey", "post", {
                key: t.detail.info
            }, function(a) {
                console.log(a.data.success), a.data.success && (e.setData({
                    clickDialogTitle: t.detail.info
                }), e.selectComponent("#clickDialog").showDialog(a.data.data.jsonInfo));
            });
        }
    }
});