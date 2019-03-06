Component({
    properties: {
        min: {
            type: Number,
            value: 10
        },
        max: {
            type: Number,
            value: 500
        },
        isSilder: {
            type: Boolean,
            value: !0
        },
        iconLeft: {
            type: String,
            value: "0%"
        },
        sliderProgress: {
            type: Number,
            value: 0
        }
    },
    data: {
        statusBarHeight: 20,
        iconLeft: "0%",
        top: 0,
        percent: 0,
        changeMIn: 10,
        sliderProgress: 0
    },
    onLoad: function() {
        try {
            this.setData({
                statusBarHeight: wx.getStorageSync("statusBarHeight")
            });
        } catch (t) {}
    },
    methods: {
        clickMove: function(t) {
            var e = t.changedTouches[0].clientY - this.data.top, s = this.data.percent;
            e < 0 ? (s += 100 * Math.abs(e) / 375) >= 100 && (s = 100) : (s -= 100 * Math.abs(e) / 375) < 0 && (s = 0), 
            s = s.toFixed(2);
            var r = 0, i = this.properties.max - this.properties.min;
            s <= 25 ? r = parseInt(5 * i / 64 * (s / 25)) + this.properties.min : s > 25 && s <= 50 ? r = parseInt(5 * i / 64) + parseInt(9 * i / 64 * (s - 25) / 25) + this.properties.min : s > 50 && s <= 75 ? r = parseInt(14 * i / 64) + parseInt(17 * i / 64 * (s - 50) / 25) + this.properties.min : s > 75 && s < 100 && (r = parseInt(31 * i / 64) + parseInt(33 * i / 64 * (s - 75) / 25) + this.properties.min), 
            100 == s && (r = this.properties.max), this.setData({
                iconLeft: s + "%",
                changeMIn: r,
                sliderProgress: 7.5 * s
            });
        },
        touchStart: function(t) {
            this.setData({
                top: t.changedTouches[0].clientY
            });
        },
        touchEnd: function(t) {
            var e = parseFloat(this.data.iconLeft), s = 0, r = this.properties.max - this.properties.min, s = 0, r = this.properties.max - this.properties.min;
            e <= 25 ? s = parseInt(5 * r / 64 * (e / 25)) + this.properties.min : e > 25 && e <= 50 ? s = parseInt(5 * r / 64) + parseInt(9 * r / 64 * (e - 25) / 25) + this.properties.min : e > 50 && e <= 75 ? s = parseInt(14 * r / 64) + parseInt(17 * r / 64 * (e - 50) / 25) + this.properties.min : e > 75 && e < 100 && (s = parseInt(31 * r / 64) + parseInt(33 * r / 64 * (e - 75) / 25) + this.properties.min), 
            100 == e && (s = this.properties.max), this.setData({
                top: t.changedTouches[0].clientY,
                percent: e,
                changeMIn: s
            });
        }
    }
});