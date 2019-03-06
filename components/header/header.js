Component({
    properties: {
        statusBarHeight: {
            type: String,
            value: "40"
        },
        statusBarBG: {
            type: String,
            value: "#000000"
        },
        title: {
            type: String,
            value: ""
        },
        statusBarTitleColor: {
            type: String,
            value: "#fff"
        },
        statusBarTitleBG: {
            type: String,
            value: "#303030"
        },
        statusBarTitleHidden: {
            type: Boolean,
            value: !1
        },
        imgHidden: {
            type: Boolean,
            value: !0
        },
        left: {
            type: String,
            value: ""
        },
        right: {
            type: String,
            value: ""
        }
    },
    data: {},
    methods: {
        onLoad: function() {
            this.setData({
                statusBarHeight: wx.getStorageSync("statusBarHeight")
            });
        },
        _back: function() {
            this.triggerEvent("back");
        }
    }
});