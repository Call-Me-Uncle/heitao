Component({
    properties: {
        textValue: {
            type: Object,
            value: []
        },
        title: {
            type: String,
            value: ""
        },
        confirmText: {
            type: String,
            value: "确认按钮"
        },
        titleColor: {
            type: String,
            value: "#3CC51F"
        },
        bgColor: {
            type: String,
            value: "#fff"
        }
    },
    data: {
        isShow: !1,
        textValue: []
    },
    methods: {
        hideDialog: function() {
            this.setData({
                isShow: !1
            });
        },
        showDialog: function(t) {
            this.setData({
                isShow: !0,
                textValue: JSON.parse(t)
            });
        },
        preventD: function() {},
        _confirmEvent: function() {
            this.triggerEvent("confirmEvent"), this.hideDialog();
        },
        _cancelDialog: function() {
            this.triggerEvent("_cancelDialog"), this.hideDialog();
        },
        dialogNouns: function(t) {
            var e = this;
            t.detail.url ? (console.log("跳转小程序"), wx.navigateToMiniProgram({
                appId: "wxd8c6faa9d711687b",
                path: "/pages/index/index",
                extraData: {},
                envVersion: "release",
                success: function(t) {}
            })) : getApp().globalData.util.wxRequest("/getInfoByKey", "post", {
                key: t.detail.info
            }, function(i) {
                i.data.success && e.setData({
                    textValue: JSON.parse(i.data.data.jsonInfo),
                    title: t.detail.info
                });
            });
        }
    }
});