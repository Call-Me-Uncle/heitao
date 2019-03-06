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
            value: "弹窗内容"
        },
        cancelText: {
            type: String,
            value: "取消按钮"
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
        bgColor: {
            type: String,
            value: "#fff"
        },
        couponImgUrl: {
            type: String,
            value: ""
        },
        contentHidden: {
            type: Boolean,
            value: !0
        },
        richText: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        isShow: !1,
        iconHidden1: !1,
        iconHidden2: !1,
        iconHidden3: !1,
        textValue: []
    },
    methods: {
        hideDialog: function() {
            this.setData({
                isShow: !1
            });
        },
        showDialog: function() {
            this.setData({
                isShow: !0
            });
        },
        showTextValue: function(t) {
            this.setData({
                isShow: !0,
                textValue: JSON.parse(t)
            });
        },
        _cancelEvent: function() {
            this.triggerEvent("cancelEvent");
        },
        _cancelDialog: function() {
            this.triggerEvent("cancelDialog");
        },
        _confirmEvent: function() {
            this.triggerEvent("confirmEvent");
        },
        _clickItem: function(t) {
            var e = t.currentTarget.dataset.index;
            1 == e ? this.setData({
                iconHidden1: !0
            }) : 2 == e ? this.setData({
                iconHidden2: !0
            }) : 3 == e && this.setData({
                iconHidden3: !0
            });
            var n = {
                index: t.currentTarget.dataset.index
            };
            this.triggerEvent("clickItem", n);
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
            }, function(n) {
                console.log(n.data.success), n.data.success && (e.setData({
                    clickDialogTitle: t.detail.info
                }), e.selectComponent("#clickDialog").showDialog(n.data.data.jsonInfo));
            });
        }
    }
});