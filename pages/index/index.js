function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}
import res from './data';
Page({
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        statusBarHeight: 20,
        content: "您的分数未达到该等级的要求，请先进行低级别的练习！",
        cancelText: "",
        confirmText: "",
        isIos: !1,
        id: 0,
        dHidden: !0,
        contentHidden: !0,
        bgColor: "#fff",
        evaluation: !1,
        defaultEvId: 4,
        scrollHeight: 0,
        authorization: !0,
        options: {},
        continueTest: 0,
        shareData: {
            title: "",
            imageUrl: ""
        },
        giftBag: !0,
        bagImg: {
            info: "",
            hidden: !0,
            img: getApp().globalData.imgUrl + "/image/feifei/gain1.png"
        },
        postFormTimes: 0,
        userInfo: "",
        coupon: {
            hidden: !1,
            imgUrl: ""
        },
        giveCoin: {
            hidden: !0,
            info: ""
        },
        startTest: 0,
        startTrain: 0,
        userEwmType: -1,
        contactImg: getApp().globalData.imgUrl + "/image/feifei/contact.png",
        receiveImg: getApp().globalData.imgUrl + "/image/feifei/receive.png",
        tipsInfo: {
            show: !1,
            tipsText: "",
            tipsImg: "",
            tipsEwm: getApp().globalData.imgUrl + "/image/themeTips/tipsCode.png"
        },
        mainButtonList: [],
        countCodeImage: !1
    },
    onLoad: function(t) {
        console.log(t);
        var a = this;
        "undefined" != decodeURIComponent(t.scene) ? (getApp().globalData.sceneType = decodeURIComponent(t.scene), 
        a.setData({
            userEwmType: decodeURIComponent(t.scene)
        })) : "undefined" != t.userId && null != t.userId && "null" != t.userId && a.setData({
            userEwmType: "userId_" + t.userId
        }), a.setData({
            options: t
        }), wx.getSystemInfo({
            success: function(t) {
                t.system.indexOf("Android") < 0 ? a.setData({
                    statusBarHeight: t.statusBarHeight,
                    scrollHeight: t.screenHeight - 50,
                    isIos: !0
                }) : a.setData({
                    statusBarHeight: t.statusBarHeight,
                    scrollHeight: t.screenHeight - 55,
                    isIos: !1
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        this.setData({
            statusBarHeight: wx.getStorageSync("statusBarHeight")
        }), getApp().globalData.loginState || wx.login({
            success: function(a) {
                var e = a.code;
                
                e ? t.getUserInfo(e) : console.log("获取用户登录态失败！");
            },
            fail: function() {}
        });
    },
    onHide: function() {
        this.tipsPageClose();
    },
    entryType: function(t) {
        var a = this;
        debugger
        getApp().globalData.util.wxRequest("/countCodeImgeNum", "post", {
            type: t
        }, function(t) {
            t.data.success && a.setData({
                countCodeImage: !0
            });
        });
    },
    getUserInfo: function(t) {
        var a = this;
        t = {};
        t.data = res;
        if (t.data.success) {
            getApp().globalData.token = t.data.data.token, getApp().globalData.loginState = !0, 
            getApp().globalData.totalSpend = t.data.data.userInfo.totalSpend, getApp().globalData.warnMap = t.data.data.warnMap, 
            wx.setStorageSync("userInfo", t.data.data.userInfo), a.setData({
                userInfo: t.data.data.userInfo,
                result: t,
                mainButtonList: t.data.data.mainButtonList
            });
            for (var e in t.data.data.trainTheme) {
              console.log(e,'maoxiana');
              // 开始训练和测试
              "startTrain" == e ? a.setData({
                  startTrain: t.data.data.trainTheme[e],
              }) : "startTest" == e && a.setData({
                  startTest: t.data.data.trainTheme[e],
              });
            } 
            // 活动
            a.giveCoin(t);
            
            var o = t.data.data.continueTest;
            // 如果需要继续进行测试。设置右下角展示的礼包和分享。shareEWM包含是否展示进行测试的判断
            if (o && a.setData({
                continueTest: o
            }), getApp().globalData.util.getShareTitle(), a.newState(t), a.shareEWM(o), t.data.data.loginRemind) {
                var n = JSON.parse(t.data.data.loginRemind), i = "", s = "";
                for (var e in n) "tipsImg" == n[e].type ? i = n[e].text : s += n[e].text;
                "" != i && a.setData({
                    tipsInfo: {
                        show: !0,
                        tipsText: s,
                        tipsImg: i,
                        tipsEwm: getApp().globalData.imgUrl + "/image/themeTips/tipsCode.png"
                    }
                });
            }
        }
        // wx.getUserInfo({
        //     success: function(e) {
        //         getApp().globalData.util.wxRequest("/miniAppLogin", "post", {
        //             encryptedData: e.encryptedData,
        //             iv: e.iv,
        //             code: t,
        //             isIos: a.data.isIos,
        //             scene: a.data.userEwmType
        //         }, function(t) {
        //             if (t.data.success) {
        //                 getApp().globalData.token = t.data.data.token, getApp().globalData.loginState = !0, 
        //                 getApp().globalData.totalSpend = t.data.data.userInfo.totalSpend, getApp().globalData.warnMap = t.data.data.warnMap, 
        //                 wx.setStorageSync("userInfo", t.data.data.userInfo), a.setData({
        //                     userInfo: t.data.data.userInfo,
        //                     result: t,
        //                     mainButtonList: t.data.data.mainButtonList
        //                 });
        //                 for (var e in t.data.data.trainTheme) "startTrain" == e ? a.setData({
        //                     startTrain: t.data.data.trainTheme[e]
        //                 }) : "startTest" == e && a.setData({
        //                     startTest: t.data.data.trainTheme[e]
        //                 });
        //                 a.giveCoin(t);
        //                 var o = t.data.data.continueTest;
        //                 if (o && a.setData({
        //                     continueTest: o
        //                 }), getApp().globalData.util.getShareTitle(), a.newState(t), a.shareEWM(o), t.data.data.loginRemind) {
        //                     var n = JSON.parse(t.data.data.loginRemind), i = "", s = "";
        //                     for (var e in n) "tipsImg" == n[e].type ? i = n[e].text : s += n[e].text;
        //                     "" != i && a.setData({
        //                         tipsInfo: {
        //                             show: !0,
        //                             tipsText: s,
        //                             tipsImg: i,
        //                             tipsEwm: getApp().globalData.imgUrl + "/image/themeTips/tipsCode.png"
        //                         }
        //                     });
        //                 }
        //             } else wx.showModal({
        //                 title: "登录失败",
        //                 showCancel: !1,
        //                 confirmText: "重新登录",
        //                 success: function(t) {
        //                     wx.login({
        //                         success: function(t) {
        //                             var e = t.code;
        //                             e ? a.getUserInfo(e) : console.log("获取用户登录态失败！");
        //                         },
        //                         fail: function() {}
        //                     });
        //                 }
        //             });
        //         });
        //     },
        //     fail: function() {
        //         console.log("用户未授权"), a.setData({
        //             authorization: !1
        //         });
        //     }
        // });
    },
    formSubmit: function(t) {
        var a = this;
        getApp().globalData.formId.length < 15 && (getApp().globalData.formId.push(t.detail.formId), 
        15 == getApp().globalData.formId.length && a.postFormId());
    },
    postFormId: function() {
        var t = this;
        t.setData({
            postFormTimes: t.data.postFormTimes + 1
        }), wx.request({
            url: getApp().globalData.Url + "/userInfo/formId",
            method: "post",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                token: getApp().globalData.token
            },
            data: {
                formId: getApp().globalData.formId
            },
            success: function(a) {
                a.data.success || t.data.postFormTimes < 5 && t.postFormId();
            },
            fail: function(a) {
                t.data.postFormTimes < 5 && t.postFormId();
            }
        });
    },
    /**
     * 一些活动， 跟主逻辑无关
     */
    giveCoin: function(t) {
        var a = this;
        /**
         * 判断返回数据中是否有givecoin字段，有的话，设置givecoin(具体什么含义待细看)
         * 如果没有的话，调用isCoupon （coupon: 优惠券） (待看代码了解逻辑)
         */
        t.data.data.giveCoin ? (a.setData({
            giveCoin: {
                hidden: !1,
                info: t.data.data.giveCoin
            }
        }), getApp().globalData.user = !1) : a.isCoupon(t);
    },
    newCourtesySubmit: function() {
        var t = this;
        t.setData({
            giveCoin: {
                hidden: !0,
                info: ""
            }
        }), t.isCoupon(t.data.result);
    },
    /**
     * 获取活动优惠券
     * 打请求后返回 {"msg":"活动结束","success":false}
     */
    isCoupon: function(t) {
        var a = this;
        if (1 == t.data.data.canGetCoupon && 0 == a.data.isIos) {
            var e = "";
            getApp().globalData.util.wxRequest("/coupon/giveStartCoupon", "get", {}, function(t) {
                t.data.success && (1 == t.data.couponType ? (e = getApp().globalData.imgUrl + "/image/coupon/coupon1.png", 
                1 == a.data.isIos && (e = getApp().globalData.imgUrl + "/image/coupon/coupon2.png"), 
                a.setData({
                    coupon: {
                        hidden: !0,
                        imgUrl: e
                    }
                })) : 2 == t.data.couponType && (e = getApp().globalData.imgUrl + "/image/coupon/coupon3.png", 
                1 == a.data.isIos && (e = getApp().globalData.imgUrl + "/image/coupon/coupon4.png"), 
                a.setData({
                    coupon: {
                        hidden: !0,
                        imgUrl: e
                    }
                })));
            });
        }
    },
    couponClose: function() {
        this.setData({
            "coupon.hidden": !1
        });
    },
    errorImg: function() {
        this.setData({
            "coupon.hidden": !1
        });
    },
    goBuy: function() {
        var t = this;
        1 != t.data.isIos && (t.setData({
            "coupon.hidden": !1
        }), wx.navigateTo({
            url: "../mall/mall"
        }));
    },
    codeBinary: function(t, a) {
        for (var e = [], o = 0; o < t; o++) e.push(0);
        a = a.toString(2);
        for (var n = [], o = 0; o < a.length; o++) n.push(a[o]);
        n = n.reverse();
        for (o = 0; o < n.length; o++) 1 == n[o] && (e[o] = 1);
        return e;
    },
    /**
     * 是否进行水平测试
     * @param  {[type]} t [description]
     * @return {[type]}   [description]
     */
    continueTest: function(t) {
        debugger
        t && (this.setData({
            contentHidden: !0,
            dHidden: !1,
            bgColor: "#EFEFF4",
            title: "",
            content: "系统检测到您的综合水平测试未完成，是否继续？（如选择“否”，系统将默认您为新手玩家）",
            confirmText: "是",
            cancelText: "否"
        }), this.selectComponent("#dialog").showDialog());
    },
    /**
     * 水平测试点击确定
     */
    confirmEvent: function() {
        var t = this;
        debugger
        "否" == this.selectComponent("#dialog").data.cancelText ? wx.navigateTo({
            url: "../practice/practice?id=" + t.data.continueTest + "&gameCard=" + !1
        }) : this.data.evaluation && this.evaluation(), this.selectComponent("#dialog").hideDialog();
    },
    /**
     * 水平测试点击取消。无操作
     * @return {[type]} [description]
     */
    cancelEvent: function() {
        this.selectComponent("#dialog").hideDialog();
    },
    shareEWM: function(t) {
        var a = this;
        debugger
        1007 == getApp().globalData.scene || 1008 == getApp().globalData.scene || 1044 == getApp().globalData.scene || 1047 == getApp().globalData.scene || 1048 == getApp().globalData.scene || 1049 == getApp().globalData.scene ? a.data.options.trainId ? getApp().globalData.util.wxPracticeRequest("/trainHh/show", "post", {
            encryptData: a.data.options.trainId
        }, function(t) {
            t.data.success ? wx.showModal({
                content: "是否查看分享的牌局",
                showCancel: !0,
                confirmText: "是",
                cancelText: "否",
                success: function(t) {
                    t.confirm ? wx.navigateTo({
                        url: "../practice/practice?id=" + a.data.options.trainId + "&gameCard=" + !0
                    }) : t.cancel && (getApp().globalData.scene = 1001);
                }
            }) : wx.showModal({
                content: "该分享牌局已经下架，不能观看",
                showCancel: !1,
                confirmText: "确定"
            });
        }, function() {
            wx.showModal({
                content: "该分享牌局已经下架，不能观看",
                showCancel: !1,
                confirmText: "确定"
            });
        }) : getApp().globalData.scene = 1001 : a.continueTest(t), "" != getApp().globalData.sceneType && 0 == a.data.countCodeImage && a.entryType(getApp().globalData.sceneType);
    },
    /**
     * 设置信息。供页面展示，右下角大礼包
     */
    newState: function(t) {
        var a = this;
        
        getApp().globalData.GuideStatus = a.codeBinary(t.data.data.userInfo.noviceGuideNum, t.data.data.userInfo.noviceGuideStatus), 
        Math.pow(2, t.data.data.userInfo.noviceGuideNum) == t.data.data.userInfo.noviceGuideStatus ? getApp().globalData.guide = !0 : getApp().globalData.guide = !1, 
        1 != getApp().globalData.GuideStatus[30] ? a.setData({
            giftBag: !1,
            receiveImg: getApp().globalData.imgUrl + "/image/feifei/receive.png",
            bagImg: {
                info: "",
                hidden: !0,
                img: getApp().globalData.imgUrl + "/image/feifei/gain1.png"
            }
        }) : wx.getStorageSync("userInfo").isWxFriend <= 0 && a.setData({
            giftBag: !1,
            receiveImg: getApp().globalData.imgUrl + "/image/feifei/add_service.png",
            bagImg: {
                info: "",
                hidden: !0,
                img: getApp().globalData.imgUrl + "/image/feifei/gain3.png"
            }
        });
    },
    bindGetUserInfo: function(t) {
        var a = this;
        t.detail.userInfo && wx.login({
            success: function(t) {
                var e = t.code;
                e ? (a.getUserInfo(e), a.setData({
                    authorization: !0
                })) : console.log("获取用户登录态失败！" + r.errMsg);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    themeItem: function(t) {
        var a = this, e = t.currentTarget.dataset.lock;
        a.setData({
            id: t.currentTarget.dataset.id
        }), a.setData({
            contentHidden: !0,
            dHidden: !0,
            bgColor: "#fff"
        }), 1 == e ? wx.showToast({
            title: "您的分数未达到该等级要求,请先进行低级别练习！",
            icon: "none",
            duration: 1500
        }) : wx.navigateTo({
            url: "../practice/practice?id=" + a.data.id + "&gameCard=" + !1,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    train: function(a) {
        var e = this;
        if ("important" == a.currentTarget.dataset.action) {
            var o = "mainButtonList[" + a.currentTarget.dataset.index + "].arrayValue[3]";
            e.setData(t({}, o, "unimportant"));
        }
        if ("vip" == a.currentTarget.dataset.keyinfo && (1 != wx.getStorageSync("userInfo").isMember || 1 == wx.getStorageSync("userInfo").isMember && wx.getStorageSync("userInfo").memberEndTime < new Date().getTime())) getApp().globalData.util.isVIP(e.data.isIos, "只有VIP会员才能进入此训练", !0); else if ("video" == a.currentTarget.dataset.keyinfo) setTimeout(function() {
            wx.switchTab({
                url: "../video/video"
            });
        }, 300); else setTimeout(function() {
            wx.navigateTo({
                url: "../practice/practice?id=" + a.currentTarget.dataset.id + "&gameCard=" + !1
            });
        }, 300);
    },
    clickGiftBag: function() {
        this.data.bagImg ? this.setData({
            "bagImg.hidden": !1
        }) : this.setData({
            "bagImg.hidden": !0
        });
    },
    closeGiftBag: function() {
        this.setData({
            "bagImg.hidden": !0
        });
    },
    tipsPageClose: function() {
        1 == this.data.tipsInfo.show && this.setData({
            "tipsInfo.show": !1
        });
    },
    /**
     * evaluation：评测
     */
    evaluation: function() {
      debugger
        this.setData({
            contentHidden: !0,
            dHidden: !0,
            bgColor: "#fff"
        }), getApp().globalData.scene = 1001, wx.navigateTo({
            url: "../practice/practice?id=" + this.data.defaultEvId + "&gameCard=" + !1
        });
    },
    onShareAppMessage: function() {
        return getApp().globalData.util.getShareTitle(), console.log(getApp().globalData.shareTitle, getApp().globalData.shareImg, getApp().globalData.sharePath), 
        {
            title: getApp().globalData.shareTitle,
            imageUrl: getApp().globalData.shareImg,
            path: getApp().globalData.sharePath
        };
    }
});