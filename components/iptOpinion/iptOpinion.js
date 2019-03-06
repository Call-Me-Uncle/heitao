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
        }
    },
    data: {
        isShow: !1,
        AreaValue: ""
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
        AreaIpt: function(t) {
            this.setData({
                AreaValue: t.detail.value
            });
        },
        _cancelEvent: function() {
            this.triggerEvent("cancelEvent");
        },
        _hideDialog: function() {
            this.triggerEvent("hideDialog");
        },
        _confirmEvent: function() {
            var t = {
                AreaValue: this.data.AreaValue
            };
            this.triggerEvent("confirmEvent", t);
        }
    }
});