Component({
    properties: {
        textValue: {
            type: Array,
            value: []
        }
    },
    data: {},
    methods: {
        clickNouns: function(t) {
            this.triggerEvent("clickNouns", {
                info: t.currentTarget.dataset.info,
                url: t.currentTarget.dataset.url
            });
        },
        copy: function(t) {
            wx.setClipboardData({
                data: t.target.dataset.info,
                success: function(t) {
                    wx.showToast({
                        title: "复制微信号成功！",
                        icon: "success",
                        duration: 2e3
                    });
                }
            });
        }
    }
});