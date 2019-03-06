Component({
    properties: {
        mallInfo: {
            type: Object,
            value: {}
        },
        mallShow: {
            type: Boolean,
            value: !1
        },
        submitPay: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        statusBarHeight: 20,
        scrollHeight: 0,
        userInfo: {},
        contactImg: getApp().globalData.imgUrl + "/image/feifei/contact.png",
        mallListShow: !0,
        order_sn: 0,
        prepay_id: 0,
        defaultIndex: null,
        price: 0,
        productId: 0,
        couponId: -1,
        ballBottom: 20,
        ballRight: 20,
        screenHeight: 0,
        screenWidth: 0
    },
    ready: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    statusBarHeight: e.statusBarHeight,
                    scrollHeight: e.screenHeight - 50 - e.statusBarHeight,
                    screenHeight: e.windowHeight,
                    screenWidth: e.windowWidth
                });
            }
        }), getApp().globalData.util.wxRequest("/userInfo/getCurrentUser", "get", {}, function(e) {
            e.data.success && t.setData({
                userInfo: e.data.data
            });
        });
    },
    methods: {
        clickList: function() {
            this.setData({
                mallListShow: !0
            });
        },
        clickInfo: function() {
            this.setData({
                mallListShow: !1
            });
        },
        clickItem: function(t) {
            var e = this, a = t.currentTarget.dataset.price, i = t.currentTarget.dataset.index, n = t.currentTarget.dataset.id, s = e.data.mallInfo.couponList;
            s.length > 0 ? e.hasCoupon(a, s, i, n) : this.setData({
                defaultIndex: t.currentTarget.dataset.index,
                price: a,
                productId: t.currentTarget.dataset.id,
                couponId: -1
            }), 1 == e.data.submitPay && (e.setData({
                submitPay: !1
            }), this.triggerEvent("clickItem", {
                price: e.data.price,
                productId: e.data.productId,
                couponId: e.data.couponId
            }));
        },
        mallBack: function() {
            this.triggerEvent("mallBack");
        },
        hasCoupon: function(t, e, a, i) {
            for (var n = this, s = -1, o = t, c = 0; c < e.length; c++) t >= e[c].normMoney && (o = t - e[c].couponNumber, 
            s = e[c].couponId);
            n.setData({
                defaultIndex: a,
                price: o,
                productId: i,
                couponId: s
            });
        },
        ballMoveEvent: function(t) {
            var e = t.touches[0], a = e.pageX, i = e.pageY;
            a <= 25 && (a = 25), a >= this.data.screenWidth - 25 && (a = this.data.screenWidth - 25), 
            this.data.screenHeight - i <= 25 && (i = this.data.screenHeight - 25), i <= 25 && (i = 25);
            var n = this.data.screenWidth - a - 25, s = this.data.screenHeight - i - 25;
            this.setData({
                ballBottom: s,
                ballRight: n
            });
        },
        ball: function(t) {
            console.log(t);
        }
    }
});