var e = require("./utils/util.js");

App({
    onLaunch: function(e) {
        wx.getSystemInfo({
            success: function(e) {
                if (e) try {
                    wx.setStorageSync("statusBarHeight", e.statusBarHeight);
                } catch (e) {}
            }
        }), wx.setKeepScreenOn({
            keepScreenOn: !0
        }), wx.setStorageSync("giftBag", !0);
        var a = wx.createInnerAudioContext();
        a.autoplay = !1, a.src = this.globalData.imgUrl + "/voice/button.mp3";
        var t = wx.createInnerAudioContext();
        t.autoplay = !1, t.src = this.globalData.imgUrl + "/voice/deal_card.mp3";
        var o = wx.createInnerAudioContext();
        o.autoplay = !1, o.src = this.globalData.imgUrl + "/voice/hero_action.mp3";
        var i = wx.createInnerAudioContext();
        i.autoplay = !1, i.src = this.globalData.imgUrl + "/voice/raise.mp3";
        var c = wx.createInnerAudioContext();
        c.autoplay = !1, c.src = this.globalData.imgUrl + "/voice/call.mp3";
        var r = wx.createInnerAudioContext();
        r.autoplay = !1, r.src = this.globalData.imgUrl + "/voice/check.mp3";
        var l = wx.createInnerAudioContext();
        l.autoplay = !1, l.src = this.globalData.imgUrl + "/voice/fold.mp3";
        var n = wx.createInnerAudioContext();
        n.autoplay = !1, n.src = this.globalData.imgUrl + "/voice/gather_chip.mp3";
        var s = wx.createInnerAudioContext();
        s.autoplay = !1, s.src = this.globalData.imgUrl + "/voice/broad_card.mp3";
        var g = wx.createInnerAudioContext();
        g.autoplay = !1, g.src = this.globalData.imgUrl + "/voice/win.mp3";
        var u = wx.createInnerAudioContext();
        u.autoplay = !1, u.src = this.globalData.imgUrl + "/voice/lose.mp3";
        var v = wx.createInnerAudioContext();
        v.autoplay = !1, v.src = this.globalData.imgUrl + "/voice/good_score.mp3";
        var h = wx.createInnerAudioContext();
        h.autoplay = !1, h.src = this.globalData.imgUrl + "/voice/god.mp3", this.globalData.voiceButton = a, 
        this.globalData.voiceDealCard = t, this.globalData.voiceHeroAction = o, this.globalData.voiceRaise = i, 
        this.globalData.voiceCall = c, this.globalData.voiceCheck = r, this.globalData.voiceFold = l, 
        this.globalData.voiceGatherChip = n, this.globalData.voiceBroadCard = s, this.globalData.voiceWin = g, 
        this.globalData.voiceLose = u, this.globalData.voiceGoodScore = v, this.globalData.voiceGod = h;
    },
    onShow: function(e) {
        this.globalData.scene = e.scene, this.upDataApp(), console.log("场景值", e.scene);
    },
    onHide: function() {
        this.globalData.loginState = !1, this.globalData.sceneType = "", wx.removeStorage({
            key: "serverUserImg",
            success: function(e) {}
        }), wx.removeStorage({
            key: "serverEwm1",
            success: function(e) {}
        }), wx.removeStorage({
            key: "serverEwm2",
            success: function(e) {}
        }), wx.removeStorage({
            key: "serverSeal",
            success: function(e) {}
        });
    },
    upDataApp: function() {
        if (wx.canIUse("getUpdateManager")) {
            var e = wx.getUpdateManager();
            e.onCheckForUpdate(function(a) {
                a.hasUpdate && (e.onUpdateReady(function() {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启应用？",
                        success: function(a) {
                            a.confirm && e.applyUpdate();
                        }
                    });
                }), e.onUpdateFailed(function() {
                    wx.showModal({
                        title: "已经有新版本了哟~",
                        content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
                    });
                }));
            });
        } else wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    globalData: {
        userInfo: null,
        imgUrl: "https://www.heitaodashi.cn",
        Url: "https://www.heitaodashi.com:8101",
        token: "",
        util: e,
        voiceDealCard: "",
        voiceButton: "",
        voiceHeroAction: "",
        voiceRaise: "",
        voiceCall: "",
        voiceCheck: "",
        voiceFold: "",
        voiceGatherChip: "",
        voiceBroadCard: "",
        voiceWin: "",
        voiceLose: "",
        voiceGoodScore: "",
        voiceGod: "",
        scene: 1001,
        user: !0,
        defaultEvId: 4,
        cancelScene: !0,
        shareTitle: "黑桃大师-扑克个性化培训AI,10倍速提升你的水平",
        shareImg: "",
        sharePath: "/pages/index/index?otherPage=1&userId=" + wx.getStorageSync("userInfo").id,
        loginState: !1,
        guide: !0,
        GuideStatus: "",
        RequestCount: 0,
        sceneType: "",
        formId: [],
        warnMap: {},
        totalSpend: 0
    }
});