Component({
    properties: {
        headImageData: {
            type: Object,
            value: {}
        },
        defaultUserInfo: {
            type: Object,
            value: {}
        },
        isRight: {
            type: Boolean,
            value: !0
        },
        dealer_btn: {
            type: Number,
            value: 0
        },
        glodTop: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        defaultHeadImageUrl: getApp().globalData.imgUrl + "/image/headimg/moshengren.png"
    },
    methods: {
        clickImg: function(e) {
            this.remark = this.selectComponent("#" + e.currentTarget.dataset.remark);
            var t = e.currentTarget.dataset.info;
            t && this.remark.show(t);
        }
    }
});