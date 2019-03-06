Page({
    data: {
        statusBarHeight: 20,
        scrollHeight: 0,
        currentPage: 1,
        pageSize: 15,
        name: "近七天练习历史为空，赶快去训练场训练吧",
        noData: !1,
        isFirstPage: !1,
        isLastPage: !1,
        DownInfo: !0,
        lists: [],
        buttonType: "history",
        isPerfect: "all",
        animate: ""
    },
    onLoad: function() {
        var t = this;
        this.scrollBottom(), wx.getSystemInfo({
            success: function(a) {
                a.system.indexOf("Android"), t.setData({
                    statusBarHeight: a.statusBarHeight,
                    scrollHeight: a.screenHeight - 50 - a.statusBarHeight
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.scrollBottom(), this.setData({
            isFirstPage: !1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getDataHistory: function(t, a, e) {
        var s = this, i = {
            currentPage: t,
            pageSize: a
        };
        i = "all" == s.data.isPerfect ? {
            currentPage: t,
            pageSize: a
        } : {
            currentPage: t,
            pageSize: a,
            isPerfect: s.data.isPerfect
        }, getApp().globalData.util.wxRequest("/trainHh/payHistoryList", "post", i, function(i) {
            i.data.success ? e(i) : wx.showModal({
                title: "服务器响应失败",
                showCancel: !1,
                confirmText: "重新请求",
                success: function(i) {
                    s.getDataHistory(t, a, e);
                }
            });
        });
    },
    getDataShare: function(t, a, e) {
        var s = this;
        getApp().globalData.util.wxRequest("/trainHh/sharePageList", "post", {
            currentPage: t,
            pageSize: a
        }, function(i) {
            i.data.success ? e(i) : wx.showModal({
                title: "服务器响应失败",
                showCancel: !1,
                confirmText: "重新请求",
                success: function(i) {
                    s.getDataShare(t, a, e);
                }
            });
        });
    },
    clickShare: function() {
        var t = this;
        t.setData({
            currentPage: 1,
            pageSize: 15,
            name: "你在牌局点评界面中，点击了“分享讨论”的牌局会出现在这里哦(＾▽＾)",
            noData: !1,
            isFirstPage: !1,
            isLastPage: !1,
            DownInfo: !0,
            lists: [],
            buttonType: "share",
            isPerfect: "all",
            animate: ""
        }), t.scrollBottom();
    },
    clickHistory: function() {
        var t = this;
        t.setData({
            currentPage: 1,
            pageSize: 15,
            name: "近七天练习历史为空，赶快去训练场训练吧",
            noData: !1,
            isFirstPage: !1,
            isLastPage: !1,
            DownInfo: !0,
            lists: [],
            buttonType: "history",
            isPerfect: "all",
            animate: "historyAnimate1"
        }), t.scrollBottom();
    },
    clickAll: function() {
        var t = this;
        t.setData({
            currentPage: 1,
            pageSize: 15,
            name: "近七天练习历史为空，赶快去训练场训练吧",
            noData: !1,
            isFirstPage: !1,
            isLastPage: !1,
            DownInfo: !0,
            lists: [],
            buttonType: "history",
            isPerfect: "all",
            animate: "historyAnimate2"
        }), t.scrollBottom();
    },
    clickPerfect: function() {
        var t = this;
        t.setData({
            currentPage: 1,
            pageSize: 15,
            name: "近七天练习历史没有完美的，赶快去训练场训练吧",
            noData: !1,
            isFirstPage: !1,
            isLastPage: !1,
            DownInfo: !0,
            lists: [],
            buttonType: "history",
            isPerfect: !0,
            animate: "historyAnimate2"
        }), t.scrollBottom();
    },
    clickNoPerfect: function() {
        var t = this;
        t.setData({
            currentPage: 1,
            pageSize: 15,
            name: "近七天练习历史为空，赶快去训练场训练吧",
            noData: !1,
            isFirstPage: !1,
            isLastPage: !1,
            DownInfo: !0,
            lists: [],
            buttonType: "history",
            isPerfect: !1,
            animate: "historyAnimate2"
        }), t.scrollBottom();
    },
    scrollTop: function() {
        var t = this;
        t.data.isLastPage ? t.setData({
            DownInfo: !1
        }) : "history" == t.data.buttonType ? t.getDataHistory(t.data.currentPage, t.data.pageSize, function(a) {
            a.data.success && (t.scrollJudge(a), t.setData({
                noData: !1
            }), console.log(t.data.lists, a.data.data.list), t.data.lists = t.data.lists.concat(a.data.data.list), 
            t.setData({
                lists: t.data.lists
            }));
        }) : t.getDataShare(t.data.currentPage, t.data.pageSize, function(a) {
            a.data.success && (t.scrollJudge(a), t.setData({
                noData: !1
            }), t.data.lists = t.data.lists.concat(a.data.data.list), t.setData({
                lists: t.data.lists
            }));
        });
    },
    scrollJudge: function(t) {
        var a = this;
        t.data.data.isLastPage ? a.setData({
            isLastPage: !0
        }) : a.setData({
            isLastPage: !1,
            DownInfo: !0
        }), t.data.data.isFirstPage ? a.setData({
            isFirstPage: !0
        }) : a.setData({
            isFirstPage: !1
        }), 0 != t.data.data.nextPage && a.setData({
            currentPage: t.data.data.nextPage
        });
    },
    scrollBottom: function() {
        var t = this;
        t.data.isFirstPage || (t.setData({
            currentPage: 1,
            pageSize: 15
        }), "history" == t.data.buttonType ? t.getDataHistory(t.data.currentPage, t.data.pageSize, function(a) {
            a.data.success && (t.scrollJudge(a), 0 == a.data.data.list.length ? t.setData({
                noData: !0
            }) : (t.setData({
                noData: !1
            }), t.setData({
                lists: a.data.data.list
            })));
        }) : t.getDataShare(t.data.currentPage, t.data.pageSize, function(a) {
            a.data.success && (t.scrollJudge(a), 0 == a.data.data.list.length ? t.setData({
                noData: !0
            }) : (t.setData({
                noData: !1
            }), t.setData({
                lists: a.data.data.list
            })));
        }));
    },
    back: function() {
        wx.switchTab({
            url: "../mine/mine"
        });
    },
    playAgain: function(t) {
        "history" == this.data.buttonType ? wx.navigateTo({
            url: "../practice/practice?id=" + t.currentTarget.dataset.id + "&gameCard=" + !0 + "&history=" + !0
        }) : wx.navigateTo({
            url: "../practice/practice?id=" + t.currentTarget.dataset.id + "&gameCard=" + !0
        });
    },
    itemClick: function(t) {
        t.target.dataset.item && console.log(t.target.dataset.item);
    },
    onShareAppMessage: function(t) {
        return getApp().globalData.util.getShareTitle(), {
            title: getApp().globalData.shareTitle,
            imageUrl: getApp().globalData.shareImg,
            path: getApp().globalData.sharePath
        };
    }
});