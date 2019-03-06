var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}, a = {
    highCard: 10,
    onePair: 11,
    twoPairs: 12,
    treeOfAKind: 13,
    straight: 14,
    flush: 15,
    fullHouse: 16,
    fourOfAKind: 17,
    straightFlush: 18,
    royarFlush: 19
}, e = function(t, a, e, r, n) {
    var o = this;
    wx.request({
        url: getApp().globalData.Url + t,
        method: a,
        header: {
            "content-type": "application/x-www-form-urlencoded",
            token: getApp().globalData.token
        },
        data: e,
        success: function(i) {
            2004 == i.data.code || 2003 == i.data.code ? wx.showModal({
                title: "登录失效",
                showCancel: !1,
                confirmText: "重新登录",
                success: function(i) {
                    i.confirm && o.Login(function() {
                        o.wxPracticeRequest(t, a, e, r, n);
                    });
                }
            }) : r(i);
        },
        fail: function(t) {
            wx.showToast({
                title: "网络请求失败",
                image: "../../images/icons/close.png",
                duration: 2e3
            }), n(t);
        }
    });
};

module.exports = {
    formatTime: function(a, e) {
        var r = new Date(a).getFullYear(), n = new Date(a).getMonth() + 1, o = new Date(a).getDate(), i = new Date(a).getHours(), s = new Date(a).getMinutes(), u = new Date(a).getSeconds();
        return e ? [ r, n, o ].map(t).join("-") + " " + [ i, s, u ].map(t).join(":") : [ r, n, o ].map(t).join("-");
    },
    getCardMaxValue: function(t) {
        for (var a = 0, e = 0; e < 3; e++) for (var r = e + 1; r < 4; r++) for (var n = r + 1; n < 5; n++) for (var o = n + 1; o < 6; o++) for (var i = o + 1; i < 7; i++) {
            var s = [ t[e], t[r], t[n], t[o], t[i] ], u = this.getCardValue(s);
            a < u && (a = u);
        }
        return a;
    },
    getCardValue: function(t) {
        var e = 0, r = [], n = [], o = [];
        for (var i in t) r.push(t[i][0]), o.push(t[i][1]);
        for (var i in r) {
            var s = this.getNumber(r[i]);
            n.push(s);
        }
        n.sort(function(t, a) {
            return a - t;
        });
        var u = this.isStraight(n);
        e = e > u ? e : u;
        var c = this.isFlush(n, o);
        if (e = e > c ? e : c, u && c) return e = 10 == n[0] && 11 == n[1] && 12 == n[2] && 13 == n[3] && 14 == n[4] ? Number(a.royarFlush + this.getStringNumber(n)) : Number(a.straightFlush + this.getStringNumber(n));
        var l = this.isOthers(n);
        return e = e > l ? e : l;
    },
    getNumber: function(t) {
        var a;
        switch (t) {
          case "T":
            a = 10;
            break;

          case "J":
            a = 11;
            break;

          case "Q":
            a = 12;
            break;

          case "K":
            a = 13;
            break;

          case "A":
            a = 14;
            break;

          default:
            a = Number(t);
        }
        return a;
    },
    isStraight: function(t) {
        var e = 0;
        if (14 == t[0] && 5 == t[1] && 4 == t[2] && 3 == t[3] && 2 == t[4]) return e = 140105040302;
        for (var r = 0; r < t.length - 1; r++) if (t[r] - 1 != t[r + 1]) return e;
        var n = a.straight + this.getStringNumber(t);
        return e = Number(n);
    },
    cardTypes: a,
    getStringNumber: function(t) {
        var a = "";
        for (var e in t) a += this.addZero(t[e]);
        return a;
    },
    isFlush: function(t, e) {
        var r = 0, n = e[0];
        for (var o in e) if (n != e[o]) return r;
        var i = a.flush + this.getStringNumber(t);
        return r = Number(i);
    },
    isOthers: function(t) {
        for (var e = 0, r = 0, n = 0; n < t.length; n++) for (d = n + 1; d < t.length; d++) t[n] == t[d] && r++;
        switch (r) {
          case 6:
            var o = t[0], i = t[2], s = t[4];
            t = [ h = i, h, h, h, g = o == i ? s : o ], l = this.getStringNumber(t), e = Number(a.fourOfAKind + l);
            break;

          case 4:
            var o = t[0], i = t[2], s = t[4];
            t = [ h = i, h, h, g = o == i ? s : o, g ], l = this.getStringNumber(t), e = Number(a.fullHouse + l);
            break;

          case 3:
            for (var u = [], n = 0; n < t.length; n++) for (d = n + 1; d < t.length; d++) if (t[n] == t[d]) {
                h = t[n];
                break;
            }
            for (var n in t) h != t[n] && u.push(t[n]);
            u.sort(function(t, a) {
                return a - t;
            });
            var c = [ h, h, h ].concat(u), l = this.getStringNumber(c);
            e = Number(a.treeOfAKind + l);
            break;

          case 2:
            for (var g, f = [], n = 0; n < t.length; n++) for (d = n + 1; d < t.length; d++) t[n] == t[d] && -1 == f.indexOf(t[n]) && f.push(t[n]);
            f.sort(function(t, a) {
                return a - t;
            });
            for (var n in t) if (-1 == f.indexOf(t[n])) {
                g = t[n];
                break;
            }
            var c = [ f[0], f[0], f[1], f[1], g ], l = this.getStringNumber(c);
            e = Number(a.twoPairs + l);
            break;

          case 1:
            for (var h, u = [], n = 0; n < t.length; n++) for (var d = n + 1; d < t.length; d++) if (t[n] == t[d]) {
                h = t[n];
                break;
            }
            for (var n in t) t[n] != h && u.push(t[n]);
            u.sort(function(t, a) {
                return a - t;
            });
            var c = [ h, h ].concat(u), l = this.getStringNumber(c);
            e = Number(a.onePair + l);
            break;

          case 0:
            t.sort(function(t, a) {
                return a - t;
            }), l = this.getStringNumber(t), e = Number(a.highCard + l);
        }
        return e;
    },
    addZero: function(t) {
        return t < 10 ? "0" + t : String(t);
    },
    wxPracticeRequest: e,
    wxRequest: function(t, a, e, r, n) {
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var o = this;
        wx.request({
            url: getApp().globalData.Url + t,
            method: a,
            header: {
                "content-type": "application/x-www-form-urlencoded",
                token: getApp().globalData.token
            },
            data: e,
            success: function(i) {
                wx.hideLoading(), 2004 == i.data.code || 2003 == i.data.code ? (console.log("未登录"), 
                wx.showModal({
                    title: "登录失效",
                    showCancel: !1,
                    confirmText: "重新登录",
                    success: function(i) {
                        i.confirm && o.Login(function() {
                            o.wxRequest(t, a, e, r, n);
                        });
                    }
                })) : r(i);
            },
            fail: function(t) {
                wx.hideLoading(), wx.showToast({
                    title: "请求失败",
                    image: "../../images/icons/close.png",
                    duration: 2e3
                }), n(t);
            }
        });
    },
    Login: function(t) {
        wx.login({
            success: function(a) {
                var e = a.code;
                e ? wx.getUserInfo({
                    success: function(a) {
                      debugger
                        getApp().globalData.util.wxRequest("/miniAppLogin", "post", {
                            encryptedData: a.encryptedData,
                            iv: a.iv,
                            code: e
                        }, function(a) {
                            a.data.success && (getApp().globalData.token = a.data.data.token, getApp().globalData.loginState = !0, 
                            getApp().globalData.totalSpend = a.data.data.userInfo.totalSpend, getApp().globalData.warnMap = a.data.data.warnMap, 
                            wx.setStorageSync("userInfo", a.data.data.userInfo), t(a));
                        });
                    },
                    fail: function() {}
                }) : console.log("获取用户登录态失败！");
            },
            fail: function() {}
        });
    },
    isVIP: function(t, a, e, r) {
        e ? t ? wx.showToast({
            title: getApp().globalData.warnMap.vip.ios ? getApp().globalData.warnMap.vip.ios : a + ",联系客服或前往公众号获取会员",
            icon: "none",
            duration: 3e3
        }) : wx.showModal({
            title: "提示信息",
            content: getApp().globalData.warnMap.vip.android ? getApp().globalData.warnMap.vip.android : a,
            showCancel: !0,
            cancelText: "取消",
            confirmText: "购买会员",
            success: function(t) {
                t.confirm && wx.navigateTo({
                    url: "../mall/mall"
                });
            }
        }) : t ? wx.showModal({
            title: "提示信息",
            content: a,
            showCancel: !1,
            cancelText: "",
            confirmText: "退出",
            success: function(t) {
                t.confirm && ("catalog" == r ? wx.switchTab({
                    url: "../catalog/catalog"
                }) : wx.switchTab({
                    url: "../index/index"
                }));
            }
        }) : wx.showModal({
            title: "提示信息",
            content: a,
            showCancel: !0,
            cancelText: "退出",
            confirmText: "购买会员",
            success: function(t) {
                t.confirm ? wx.navigateTo({
                    url: "../mall/mall"
                }) : "catalog" == r ? wx.switchTab({
                    url: "../catalog/catalog"
                }) : wx.switchTab({
                    url: "../index/index"
                });
            }
        });
    },
    getShareTitle: function() {
        e("/shareInfo", "get", {}, function(t) {
            t.data.success && wx.downloadFile({
                url: getApp().globalData.imgUrl + t.data.data.pictureUrl,
                success: function(a) {
                    200 == a.statusCode && (getApp().globalData.shareTitle = t.data.data.title, getApp().globalData.shareImg = a.tempFilePath);
                }
            });
        });
    }
};