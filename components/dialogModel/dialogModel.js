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
        contentHidden: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        isShow: !1
    },
    methods: {
        hideDialog: function() {
            this.setData({
                isShow: !1
            });
        },
        showDialog: function(t) {
            this.setData({
                isShow: !0
            });
        },
        _cancelEvent: function() {
            this.triggerEvent("cancelEvent");
        },
        _confirmEvent: function() {
            this.triggerEvent("confirmEvent");
        }
    }
});