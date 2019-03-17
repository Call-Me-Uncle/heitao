import getDefaultData from './defaultData';

function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

function a(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = 0, o = 0, n = 0;

Page({
    data: getDefaultData(getApp()),
    /**
     * t {
     * themeId, gameCard
     * }
     * (1)
     */
    onLoad: function(t) {
        this.setData({
            options: t
        });
    },
    /**
     * 初始化成功后根据参数获取牌局
     */
    onReady: function() {
        this.remark = this.selectComponent("#remark"), this.isSlider = this.selectComponent("#isSlider"), 
        this.dialogModel = this.selectComponent("#dialogModel");
        var t = this;
        // t.getGAme("/getNextHh", {})
        "true" == t.data.options.gameCard ? t.data.options.id ? (t.setData({
            remarkConfirm: {
                text: ""
            }
        }), t.getGAme("/trainHh/show", {
            encryptData: t.data.options.id
        })) : t.getGAme("/getNextHh", {
            themeId: t.data.options.KnowledgeId
        }) : 0 == t.data.options.id ? t.getGAme("/getNextHh", {}) : t.getGAme("/getNextHh", {
            themeId: t.data.options.id
        });
    },
    /**
     * [description]
     * (2)
     */
    onShow: function() {
        i = 0;
        var t = this;
    },
    onHide: function() {
        i = 0, o = 0, n = 0;
    },
    onUnload: function() {
        clearTimeout(this.data.Timer.time1), clearTimeout(this.data.Timer.time2), clearTimeout(this.data.Timer.time3), 
        clearTimeout(this.data.Timer.time4), getApp().globalData.voiceDealCard.stop(), this.setData({
            stop: !0
        }), this.signOut();
    },
    showModalInfo: function(t, a, e, i, o) {
        var n = this;
        wx.showModal({
            title: t,
            showCancel: a,
            cancelText: e,
            confirmText: i,
            success: function(t) {
                t.cancel ? n.signOut() : t.confirm && o(t);
            }
        });
    },
    /**
     * @param  {[type]} t /trainHh/show , /getNextHh 其他待查看
     * @param  {[type]} a {}  { encryptData, themeId }
     * encryptData: t.data.options.id  ; themeId: t.data.options.id
     * @return {[type]}   [description]
     */
    getGAme: function(t, a) {
        var e = this, i = setTimeout(function() {
            wx.showLoading({
                title: "牌局请求中",
                mask: !0
            });
        }, 300);
        // debugger
        getApp().globalData.util.wxPracticeRequest(t, "post", a, function(t) {
          // debugger
            if (clearTimeout(i), wx.hideLoading(), t.data.success) {
                o = 0, n = 0;
                var a = t.data.data;
                if (e.data.options.id = a.theme.id, e.data.options.title = a.theme.cnName, e.data.options.content = a.theme.jsonInfo, 
                e.setData({
                    "options.share": !1,
                    options: e.data.options,
                    cnName: a.theme.cnName,
                    KnowledgeId: a.theme.trainType
                }), 2 == a.theme.trainType ? e.setData({
                    cancelText: "高手示范",
                    trainType: !0
                }) : e.setData({
                    cancelText: "重玩本手",
                    trainType: !1
                }), null != a.alive && 0 == a.alive && e.setData({
                    cancelText: ""
                }), e.setData({
                    robotList: a.robotList,
                    trainHhId: a.trainHhId,
                    shareTrainHhId: a.encryptData,
                    currentHhNum: a.currentHhNum,
                    totalHhNum: a.totalHhNum,
                    shiFanButton: !0,
                    shiFanData: !1,
                    playBackButton: !0,
                    playBackData: !1,
                    remarkConfirm: {
                        text: "下一手",
                        value: "",
                        title: "牌局点评",
                        discuss: "分享讨论"
                    }
                }), a.currentHhNum) if (1 == a.currentHhNum) {
                    var s = JSON.parse(a.theme.jsonInfo), r = "", d = "";
                    for (var l in s) "tipsImg" == s[l].type ? r = s[l].text : d += s[l].text;
                    if ("" != r) e.setData({
                        tipsInfo: {
                            show: !0,
                            tipsText: d,
                            tipsImg: r,
                            result: t.data.data.nextHh,
                            tipsEwm: getApp().globalData.imgUrl + "/image/themeTips/tipsCode.png"
                        }
                    }); else {
                        var c = e.data.Introduction;
                        c.title = e.data.options.title, c.result = t, e.setData({
                            Introduction: c
                        }), e.selectComponent("#Introduction").showTextValue(e.data.options.content);
                    }
                } else e.gameCard(a.nextHh); else e.gameCard(a.nextHh);
            } else o = 0, n = 0, null == t.data.code || 1008 != t.data.code && 1009 != t.data.code ? 1003 == t.data.code ? getApp().globalData.util.isVIP(e.data.isIos, t.data.msg, !1, e.data.options.path) : 1004 == t.data.code ? e.showModalInfo(t.data.msg, !0, "返回", "重开一局", function() {
                e.getGAme("/getNextHh", {
                    themeId: e.data.options.id
                }, e.data.options);
            }) : e.showModalInfo("服务器请求失败", !0, "返回", "重开一局", function() {
                e.getGAme("/getNextHh", {
                    themeId: e.data.options.id
                }, e.data.options);
            }) : e.showModalInfo("服务器开小差了", !0, "返回", "重开一局", function() {
                e.getGAme("/getNextHh", {
                    themeId: e.data.options.id
                }, e.data.options);
            });
        }, function() {
            o = 0, n = 0, wx.hideLoading(), e.showModalInfo("网络不好，请求失败", !0, "返回", "重新请求", function() {
                e.getGAme(t, a);
            });
        });
    },
    gameCard: function(t) {
        var a = this, e = t.seats;
        // debugger
        a.defaultSeat(e), a.setData({
            seats: e,
            degree_str: t.degree_str,
            small_blind_amount: t.small_blind_amount,
            ante: t.ante,
            straddle: t.straddle,
            dealer_btn: t.dealer_btn,
            pre_pot: 0,
            broad_cards: t.broad_cards,
            validActions: t.valid_actions,
            shareTitle: t.share_title,
            amount: 0,
            actionIndex: -1,
            pot: 0,
            annotation: !0,
            maxAmount: 0,
            iconLeft: 0,
            sliderProgress: 0,
            step: 1e3,
            haveRaise: !1,
            preStreet: "preflop",
            victory: "",
            heroFold: !1,
            addHidden: !0,
            order_sn: "",
            streetIndex: 0,
            raiseBtn: [ {
                multiple: "1/3",
                title: "底池",
                raiseNumber: 0,
                molecule: 2,
                bgColor: !0,
                denominator: 6
            }, {
                multiple: "1/2",
                title: "底池",
                raiseNumber: 0,
                molecule: 3,
                bgColor: !0,
                denominator: 6
            }, {
                multiple: "2/3",
                title: "底池",
                raiseNumber: 0,
                molecule: 4,
                bgColor: !0,
                denominator: 6
            }, {
                multiple: "1X",
                title: "底池",
                raiseNumber: 0,
                molecule: 6,
                bgColor: !0,
                denominator: 6
            }, {
                multiple: "allin",
                title: "",
                raiseNumber: 0,
                molecule: 9,
                bgColor: !0,
                denominator: 6
            } ],
            showPuke: [],
            myCard: [],
            opAreaValue: "",
            hideRemark: !1,
            perfectShow: !0,
            perfectAction: "",
            Introduction: {
                title: "",
                contentHidden: !0,
                bgColor: "#fff",
                result: "",
                richText: !1,
                content: "",
                cancelText: "",
                confirmText: "开始训练"
            },
            disabledRemark: !1,
            bet: 0,
            allinState: !1,
            heroBubble: !0,
            heroActionInfo: !1,
            heroActionLists: [],
            heroActionIndex: 0,
            playAction: {
                hidden: !1,
                info: "",
                color: ""
            },
            summary: !1,
            actionItem: "",
            tips: {
                hidden: !0,
                info: "播放牌局提示信息",
                type: ""
            },
            guide: {
                show: !0,
                state: "",
                info: "",
                className: ""
            },
            imgScroll: {
                imgScroll: !0,
                imgSrc: ""
            },
            couponImgUrl: "",
            tipsInfo: {
                show: !1,
                tipsText: "",
                tipsImg: "",
                result: "",
                tipsEwm: getApp().globalData.imgUrl + "/image/themeTips/tipsCode.png"
            },
            shouldBuyVip: !1,
            firstTrainButton: !1
        }), a.addHidden(t.valid_actions), 1 == a.data.shiFanData ? (a.setData({
            tips: {
                hidden: !1,
                info: "高手示范播放中",
                type: "shiFan"
            }
        }), a.gameSplit(e, t.action_histories)) : 1 == a.data.playBackData ? (a.setData({
            tips: {
                hidden: !1,
                info: "评价回放播放中",
                type: "playBack"
            }
        }), a.gameSplit(e, t.action_histories)) : (a.setData({
            perfect: !1,
            tips: {
                hidden: !0,
                info: "",
                type: ""
            },
            stepTime: {
                fold: 250,
                action: 750,
                allinTime: 1e3,
                showTime: 750,
                dealTime: 2e3
            }
        }), a.judgingHistorical(e, t));
    },
    defaultSeat: function(t) {
        var a = this;
        this.selectComponent("#remark").setData({
            collect: 0,
            praise: 0,
            tread: 0
        });
        for (var e = 0; e < t.length; e++) {
            t[e].paidCount = 0, t[e].percent = 0, t[e].actionLists, t[e].actionLists = {}, t[e].CardsHidden = !1;
            for (var i = 0; i < a.data.robotList.length; i++) t[e].name == a.data.robotList[i].name && a.data.robotList[i].headImage && (t[e].headImage = getApp().globalData.imgUrl + a.data.robotList[i].headImage, 
            t[e].detailImage = a.data.robotList[i].detailImage);
        }
    },
    judgingHistorical: function(t, a) {
        var e = this;
        if (a.valid_actions) for (var i = 0; i < a.valid_actions.length; i++) "raise" == a.valid_actions[i].action && e.setData({
            minRaise: a.valid_actions[i].amount.min,
            maxRaise: a.valid_actions[i].amount.max
        });
        if (a.continueTrain) {
            var o = "正在恢复上次未完成牌局";
            "true" == e.data.options.gameCard && (e.data.options.history ? (o = "历史牌局播放中", e.setData({
                "options.gameCard": !1,
                "options.share": !0
            })) : (o = "分享牌局播放中", e.setData({
                "options.gameCard": !1,
                "options.share": !0
            }))), e.setData({
                tips: {
                    hidden: !1,
                    info: o
                }
            }), e.setData({
                dealSeats: t
            }), e.doStreet(a.action_histories);
        } else {
            var n = a.action_histories.preflop, s = "系统发牌中";
            for (var r in n) {
                var d = "CALL" == n[r].action || "RAISE" == n[r].action || "FOLD" == n[r].action;
                if (3 == n[r].uuid && d) {
                    s = "残局播放中";
                    break;
                }
            }
            "残局播放中" == s || a.action_histories.flop ? (e.setData({
                tips: {
                    hidden: !1,
                    info: "残局播放中"
                }
            }), e.gameSplit(t, a.action_histories)) : (e.setData({
                dealSeats: t
            }), e.doStreet(a.action_histories));
        }
    },
    gameSplit: function(t, e) {
        var i = [], o = [], n = this, s = this.data.defaultStreet;
        for (var r in s) {
            var d = s[r];
            if (e[d]) if (0 == e[d].length) {
                var l;
                i.push((l = {}, a(l, d, []), a(l, "street", []), a(l, "streetName", d), l));
            } else for (var c = 0; c < e[d].length; c++) if (o.push(e[d][c]), e[d][c].act_discrib) {
                if (0 != c) {
                    if ("playBack" == n.data.tips.type) {
                        var u, p = n.deepClone(e[d][c]), h = n.deepClone(e[d][c]);
                        o.pop(), p.act_discrib = "", o.push(p), i.push((u = {}, a(u, d, o), a(u, "street", o), 
                        a(u, "streetName", d), u)), o = [], h.paid = 0, o.push(h);
                    } else {
                        var m;
                        o.pop(), i.push((m = {}, a(m, d, o), a(m, "street", o), a(m, "streetName", d), m)), 
                        (o = []).push(e[d][c]);
                    }
                    if (c == e[d].length - 1) {
                        var g;
                        i.push((g = {}, a(g, d, o), a(g, "street", o), a(g, "streetName", d), g)), o = [];
                    }
                } else if ("playBack" == n.data.tips.type || "shiFan" == n.data.tips.type) {
                    var f, p = n.deepClone(e[d][c]), h = n.deepClone(e[d][c]);
                    o.pop(), p.act_discrib = "", o.push(p), i.push((f = {}, a(f, d, o), a(f, "street", o), 
                    a(f, "streetName", d), f)), o = [], h.paid = 0, o.push(h);
                }
            } else if (c == e[d].length - 1) {
                var D;
                i.push((D = {}, a(D, d, o), a(D, "street", o), a(D, "streetName", d), D)), o = [];
            }
        }
        this.setData({
            heroActionInfo: !0,
            heroActionLists: i
        }), n.setData({
            dealSeats: t
        }), this.doStreet(i[0]);
    },
    deepClone: function(t) {
        var a = this;
        if ("object" != (void 0 === t ? "undefined" : e(t))) return t;
        var i = {};
        for (var o in t) i[o] = a.deepClone(t[o]);
        return i;
    },
    deal: function(t) {
        var a = this, e = a.data.dealSeats;
        if (!a.data.stop) {
            getApp().globalData.voiceDealCard.play();
            for (var i = 0; i < e.length; i++) !function(t) {
                a.data.Timer.time1 = setTimeout(function() {
                    a.data.stop || (e[t].backHiddenF = !0, e[t].backClassF = "annotation" + t, a.setData({
                        seats: e
                    }));
                }, 80 * t);
            }(i);
            for (var o = 0; o < e.length; o++) !function(t) {
                a.data.Timer.time2 = setTimeout(function() {
                    a.data.stop || (e[t].backHiddenS = !0, e[t].backClassS = "annotation" + t, a.setData({
                        seats: e
                    }));
                }, 80 * (e.length + t));
            }(o);
            a.data.Timer.time3 = setTimeout(function() {
                a.data.stop || a.setData({
                    myCard: e[3].hole_card
                });
            }, 80 * e.length), a.setData({
                Timer: a.data.Timer
            });
        }
    },
    cancelIntroduction: function() {
        "" == this.selectComponent("#Introduction").data.confirmText ? this.selectComponent("#Introduction").hideDialog() : (this.selectComponent("#Introduction").hideDialog(), 
        this.gameCard(this.data.Introduction.result.data.data.nextHh));
    },
    confirmIntroduction: function() {
        var t = this;
        debugger
        "开始训练" == this.selectComponent("#Introduction").data.confirmText ? (this.selectComponent("#Introduction").hideDialog(), 
        this.gameCard(this.data.Introduction.result.data.data.nextHh)) : "前往商城" == this.selectComponent("#Introduction").data.confirmText && t.clickMall();
    },
    action: function(t, a, e, o, n, s) {
        var r = this;
        // debugger
        console.log("准备提交请求"), getApp().globalData.util.wxPracticeRequest("/getAiAction", "post", {
            trainHhId: t,
            action: a,
            amount: e,
            actionStreet: o,
            actionIndex: n,
            timestamp: new Date().valueOf()
        }, function(t) {
            if (clearTimeout(s), i = 0, console.log(i, "初始化"), t.data.success) {
                if (t.data.data.timestamp != r.data.timestamp) {
                    if (t.data.data.valid_actions ? r.addHidden(t.data.data.valid_actions) : r.setData({
                        addHidden: !1
                    }), t.data.data.valid_actions) {
                        for (var e = 0; e < t.data.data.valid_actions.length; e++) "raise" == t.data.data.valid_actions[e].action && r.setData({
                            minRaise: t.data.data.valid_actions[e].amount.min,
                            maxRaise: t.data.data.valid_actions[e].amount.max
                        });
                        r.setData({
                            validActions: t.data.data.valid_actions
                        });
                    }
                    r.setData({
                        actionIndex: r.data.actionIndex + 1,
                        annotation: !0,
                        streetIndex: 0,
                        iconLeft: 0,
                        sliderProgress: 0,
                        actionState: a,
                        shareTitle: t.data.data.share_title,
                        timestamp: t.data.data.timestamp
                    }), "FOLD" == a ? r.victory(r.data.seats) : r.doStreet(t.data.data);
                }
            } else null == t.data.code || 1008 != t.data.code && 1009 != t.data.code ? r.showModalInfo("服务器请求失败", !0, "返回", "重开一局", function() {
                r.getGAme("/getNextHh", {
                    themeId: r.data.options.id
                }, r.data.options);
            }) : r.showModalInfo("服务器开小差了", !0, "返回", "重开一局", function() {
                r.getGAme("/getNextHh", {
                    themeId: r.data.options.id
                }, r.data.options);
            });
        }, function() {
            clearTimeout(s), i = 0, console.log(i, "初始化"), r.showModalInfo("网络不好，请求失败", !0, "返回", "重新请求", function() {
                r.action(r.data.trainHhId, a, e, r.data.street, r.data.actionIndex);
            });
        });
    },
    isHeel: function(t, a) {
        console.log("来到isHeel");
        var e = this;
        e.setData({
            gameStates: [ "preflop", "flop", "turn", "river", "showdown" ],
            allAction: "",
            hideSilder: !0,
            preStreet: e.data.street
        });
        var i = 0, o = t.currentTarget.dataset.action, n = !0;
        if ("CALL" == o) 0 == (i = e.data.maxAmount) ? (e.data.seats[3].actionLists.chipAction = "", 
        getApp().globalData.voiceCheck.play()) : (e.data.seats[3].actionLists.chipAction = "chipAction", 
        getApp().globalData.voiceCall.play()); else if ("RAISE" == o) if (e.data.seats[3].actionLists.chipAction = "chipAction", 
        t.currentTarget.dataset.click) {
            getApp().globalData.voiceRaise.play();
            for (var s = t.currentTarget.dataset.number, r = 0; r < e.data.raiseBtn.length; r++) s == r ? i = e.data.raiseBtn[r].hellNumber : 4 == s && (i = e.data.seats[3].initial_stack);
        } else n = !1; else "FREE" == o ? (o = "RAISE", e.data.seats[3].actionLists.chipAction = "chipAction", 
        getApp().globalData.voiceRaise.play(), i = e.isSlider.properties.changeMIn) : "FOLD" == o && (e.data.seats[3].actionLists.chipAction = "", 
        o = "FOLD", i = e.data.seats[3].paidCount, 0 == e.data.amount ? n = !1 : (getApp().globalData.voiceFold.play(), 
        n = !0, e.setData({
            heroFold: !0,
            annotation: !0
        })));
        var d = "";
        n && (e.setData({
            annotation: !0
        }), "" == d ? (e.heroData(o, i), d = new Date().valueOf(), console.log("提交牌局1", new Date().valueOf(), e.data.trainHhId, o, i, e.data.street, e.data.actionIndex), 
        e.action(e.data.trainHhId, o, i, e.data.street, e.data.actionIndex)) : new Date().valueOf() - d > 200 && (e.heroData(o, i), 
        console.log("提交牌局2", new Date().valueOf(), e.data.trainHhId, o, i, e.data.street, e.data.actionIndex), 
        e.action(e.data.trainHhId, o, i, e.data.street, e.data.actionIndex)));
    },
    heel: function(t) {
        if (console.log(i, "提交"), 0 == i) {
            i = 1;
            var a = setTimeout(function() {
                i = 0, console.log("已经清除定时器");
            }, 5e3);
            this.isHeel(t, a);
        }
    },
    heroData: function(t, a) {
        var e = this;
        e.setData({
            heroActionInfo: !1
        });
        var i = e.data.seats[3];
        i.initial_stack = i.initial_stack - a + i.paidCount;
        var o = e.data.pot + a - i.paidCount;
        i.paidCount = a, i.actionLists.action = t, e.transformBubble(i.actionLists, "true"), 
        e.setData({
            pot: o,
            seats: e.data.seats
        });
    },
    annotation: function() {
        this.isSlider.setData({
            changeMIn: this.isSlider.data.min
        }), this.setData({
            hideSilder: !1
        });
    },
    addHidden: function(t) {
        var a = this, e = [];
        if (t) for (var i = 0; i < t.length; i++) e.push(t[i].action);
        e.indexOf("raise") >= 0 ? a.setData({
            addHidden: !0
        }) : a.setData({
            addHidden: !1
        });
    },
    panelControl: function() {
        this.judgeGuide(1, " ", "clickHeadImg"), this.setData({
            annotation: !1,
            "seats[3].actionLists.chipAction": "",
            tips: {
                hidden: !0,
                info: "高手示范播放中"
            }
        }), 0 == this.data.amount ? this.setData({
            foldImg: !1
        }) : this.setData({
            foldImg: !0
        });
    },
    doStreet: function(t) {
        var a = this;
        if (a.data.defaultStreet[a.data.streetIndex] in t) {
            var e = a.data.defaultStreet[a.data.streetIndex];
            a.setData({
                street: e
            }), "showdown" == e ? a.victory(a.data.seats) : e in t ? 0 == t[e].length ? "showdown" in t ? a.endStreet(t) : (a.startNewStreet(), 
            setTimeout(function() {
                a.reckonRaise(a.data.raiseBtn), getApp().globalData.voiceHeroAction.play(), a.panelControl();
            }, 750)) : (a.data.preStreet != a.data.street && a.startNewStreet(), a.data.heroActionLists[a.data.heroActionIndex + 1] || a.setData({
                heroActionLists: []
            }), a.anteHandle(t[e], t)) : "showdown" in t && console.log("GAME OVER3!");
        } else a.data.streetIndex <= 5 && (a.setData({
            streetIndex: a.data.streetIndex + 1
        }), a.doStreet(t));
    },
    startNewStreet: function() {
        var t = this;
        t.showPuke(t.data.defaultStreet[t.data.streetIndex]), t.defaultBubble(), t.setData({
            actionIndex: -1,
            amount: 0,
            pre_pot: t.data.pot,
            maxAmount: 0,
            annotation: !0,
            bet: 0
        });
    },
    endStreet: function(t) {
        var a = this;
        a.data.defaultStreet[a.data.streetIndex + 1] in t ? (a.setData({
            streetIndex: a.data.streetIndex + 1,
            preStreet: a.data.street
        }), 0 == a.data.seats[3].initial_stack ? (a.showDownPuke(a.data.seats), a.setData({
            allinState: !0
        }), a.showPuke(a.data.defaultStreet[a.data.streetIndex])) : (a.startNewStreet(), 
        setTimeout(function() {
            a.doStreet(t);
        }, a.data.showPukeTime))) : "showdown" in t ? a.victory(a.data.seats) : (a.reckonRaise(a.data.raiseBtn), 
        getApp().globalData.voiceHeroAction.play(), a.setData({
            amount: a.data.maxAmount - a.data.seats[3].paidCount
        }), a.panelControl());
    },
    anteHandle: function(t, a) {
        var e = 0, i = this;
        for (var o in t) "ANTE" == t[o].action && (e = 1 * o + 1, i.transformBubble(t[o], "false"), 
        i.computingChip(i.data.seats, t[o]));
        if (e > 0) var n = setTimeout(function() {
            for (var o in i.data.seats) "ANTE" == i.data.seats[o].actionLists.action && (i.data.seats[o].actionLists.bubble = !0, 
            i.data.seats[o].actionLists.AddHidden = !1, i.data.seats[o].paidCount = 0);
            i.setData({
                actionIndex: i.data.actionIndex + e
            }), i.playStreetActions(t.slice(e), a), clearTimeout(n);
        }, 1e3); else i.playStreetActions(t, a);
    },
    playStreetActions: function(t, a) {
        for (var e = this, i = 0, o = !1, n = -1, s = 0; s < t.length; s++) !function(s) {
            o = e.is_cont_fold_or_blind(t[s]), s > 0 && "preflop" == e.data.street && ("BIGBLIND" == t[s - 1].action && "STRADDLE" != t[s].action ? (i += e.data.stepTime.dealTime, 
            n = s - 1) : "BIGBLIND" == t[s - 1].action && "STRADDLE" == t[s].action ? (i = i, 
            n = s) : "STRADDLE" == t[s - 1].action && (i += e.data.stepTime.dealTime, n = s - 1), 
            "SMALLBLIND" == t[s - 1].action && "BIGBLIND" == t[s].action && 2 == t.length && (i = i, 
            n = 1)), o ? "SMALLBLIND" == t[s].action || "BIGBLIND" == t[s].action || "STRADDLE" == t[s].action ? i += 100 : i += e.data.stepTime.fold : i += e.data.stepTime.action, 
            e.data.Timer.time4 = setTimeout(function() {
                e.data.stop || (n == s && setTimeout(function() {
                    e.deal();
                }, 500), e.playOneAction(t[s], a, t, s));
            }, i);
        }(s);
        e.setData({
            Timer: e.data.Timer
        });
    },
    playOneAction: function(t, a, e, i) {
        var o = this;
        o.data.maxAmount < t.amount && o.setData({
            maxAmount: t.amount
        }), o.transformBubble(t, "false"), o.vioce(t), o.computingChip(o.data.seats, t), 
        o.setData({
            actionIndex: o.data.actionIndex + 1
        }), o.lastStages(e, i, a), t.chipAction = "";
    },
    lastStages: function(t, a, e) {
        var i = this;
        if (a == t.length - 1) if (i.data.heroActionInfo) if (i.data.heroActionIndex == i.data.heroActionLists.length - 1) i.data.seats[t[a].uuid].actionLists.border = !1, 
        i.setData({
            seats: i.data.seats,
            heroActionInfo: !1
        }), setTimeout(function() {
            i.endStreet(e);
        }, i.data.showPukeTime); else if (i.data.heroActionLists[i.data.heroActionIndex + 1]) if (0 == i.data.heroActionLists[i.data.heroActionIndex + 1].street.length) i.data.seats[t[a].uuid].actionLists.border = !1, 
        i.setData({
            seats: i.data.seats
        }), setTimeout(function() {
            i.endStreet(i.data.heroActionLists[i.data.heroActionIndex + 1]);
        }, i.data.showPukeTime); else if (i.data.heroActionLists[i.data.heroActionIndex + 1].street[0].act_discrib) {
            var o = 400;
            (o = i.data.heroActionLists[i.data.heroActionIndex + 1].street[0].act_discrib.length <= 30 ? 400 : 35 * Math.ceil(i.data.heroActionLists[i.data.heroActionIndex + 1].street[0].act_discrib.length - 30) + 400) > 650 && (o = 650), 
            i.data.heroActionLists[i.data.heroActionIndex - 1] && i.data.heroActionLists[i.data.heroActionIndex - 1].streetName != i.data.heroActionLists[i.data.heroActionIndex + 1].streetName && (i.showPuke(i.data.heroActionLists[i.data.heroActionIndex + 1].streetName), 
            i.setData({
                preStreet: i.data.street
            }));
            var n = "";
            n = 1 == i.data.heroActionLists[i.data.heroActionIndex + 1].street[0].discrib_type ? "playColor" : "", 
            "playBack" == i.data.tips.type ? setTimeout(function() {
                i.setData({
                    playAction: {
                        hidden: !0,
                        info: i.data.heroActionLists[i.data.heroActionIndex + 1].street[0].act_discrib,
                        color: n,
                        playActionWidth: o
                    }
                });
            }, 2e3) : setTimeout(function() {
                i.setData({
                    playAction: {
                        hidden: !0,
                        info: i.data.heroActionLists[i.data.heroActionIndex + 1].street[0].act_discrib,
                        color: n,
                        playActionWidth: o
                    }
                });
            }, 500);
        } else this.data.playAction.hidden = !1, this.setData({
            heroActionIndex: this.data.heroActionIndex + 1,
            playAction: this.data.playAction,
            showPukeTime: 0
        }), setTimeout(function() {
            i.doStreet(i.data.heroActionLists[i.data.heroActionIndex]);
        }, i.data.showPukeTime); else setTimeout(function() {
            i.data.seats[t[a].uuid].actionLists.border = !1, i.setData({
                seats: i.data.seats
            }), i.endStreet(e);
        }, 200); else setTimeout(function() {
            i.data.seats[t[a].uuid].actionLists.border = !1, i.setData({
                seats: i.data.seats
            }), i.endStreet(e);
        }, 200);
    },
    playActionClick: function() {
        var t = this;
        this.data.playAction.hidden = !1, this.setData({
            heroActionIndex: this.data.heroActionIndex + 1,
            playAction: this.data.playAction,
            showPukeTime: 0
        }), setTimeout(function() {
            t.doStreet(t.data.heroActionLists[t.data.heroActionIndex]);
        }, 0);
    },
    is_cont_fold_or_blind: function(t) {
        var a = t.action;
        return "CALL" == a || "RAISE" == a ? (this.data.last_action_is_fold = !1, !1) : "SMALLBLIND" == a || "BIGBLIND" == a || "STRADDLE" == a ? (this.data.last_action_is_fold = !0, 
        !0) : !!this.data.last_action_is_fold || (this.data.last_action_is_fold = !0, !1);
    },
    vioce: function(t) {
        "弃牌" == t.actions ? (getApp().globalData.voiceFold.stop(), getApp().globalData.voiceFold.play()) : "下注" == t.actions || "加注" == t.actions || t.actions.indexOf("bet") > 0 ? (getApp().globalData.voiceRaise.stop(), 
        getApp().globalData.voiceRaise.play()) : "跟注" == t.actions ? (getApp().globalData.voiceCall.stop(), 
        getApp().globalData.voiceCall.play()) : "看牌" == t.actions && (getApp().globalData.voiceCheck.stop(), 
        getApp().globalData.voiceCheck.play());
    },
    transformBubble: function(t, a) {
        var e = this;
        "FOLD" == t.action ? (t.actions = "弃牌", t.bubbleBg = "#777", t.bubble = !0, t.imgOver = !0) : "CALL" == t.action ? (t.imgOver = !1, 
        "true" == a ? 0 == e.data.seats[3].paidCount ? (t.actions = "看牌", t.bubbleBg = "#4ab63c", 
        t.bubble = !1) : (t.chipAction = "chipAction", t.actions = "跟注", t.bubbleBg = "#a1376e", 
        t.bubble = !0) : 0 == t.paid ? (t.actions = "看牌", t.bubbleBg = "#4ab63c", t.bubble = !1) : (t.chipAction = "chipAction", 
        t.actions = "跟注", t.bubbleBg = "#a1376e", t.bubble = !0)) : "RAISE" == t.action ? (t.imgOver = !1, 
        t.chipAction = "chipAction", this.setData({
            haveRaise: !0,
            bet: e.data.bet + 1
        }), 1 == e.data.bet ? (t.actions = "下注", t.bubbleBg = "#a20d15", t.bubble = !0) : (e.data.bet >= 3 ? t.actions = e.data.bet + "bet" : t.actions = "加注", 
        t.bubbleBg = "#a20d15", t.bubble = !0)) : "SMALLBLIND" == t.action ? (t.chipAction = "chipAction", 
        t.imgOver = !1, t.actions = "小盲", t.bubbleBg = "#a20d15", t.bubble = !0) : "BIGBLIND" == t.action ? (t.chipAction = "chipAction", 
        t.imgOver = !1, t.actions = "大盲", t.bubbleBg = "#a20d15", t.bubble = !0, this.setData({
            bet: e.data.bet + 1
        })) : "STRADDLE" == t.action ? (this.setData({
            haveRaise: !0
        }), t.imgOver = !1, t.actions = "强抓", t.bubbleBg = "#a20d15", t.bubble = !0) : "ANTE" == t.action && (t.imgOver = !1, 
        t.actions = "ante", t.bubbleBg = "#5a27a2", t.bubble = !0), "true" == a && (t.bubble = !1);
    },
    defaultBubble: function() {
        for (var t = this, a = 0; a < t.data.seats.length; a++) t.data.seats[a].potChipAction = "", 
        t.data.seats[a].paidCount = 0, "FOLD" != t.data.seats[a].actionLists.action && (t.data.seats[a].actionLists.bubble = !0);
        t.setData({
            seats: t.data.seats
        });
    },
    reckonRaise: function(t) {
        var a = this, e = a.data.seats[3].paidCount;
        if ("preflop" != a.data.street || a.data.haveRaise) for (var i = 0; i < t.length; i++) t[i].raiseNumber = parseInt((a.data.pot + a.data.maxAmount - e) * t[i].molecule / t[i].denominator) + a.data.maxAmount, 
        t[i].hellNumber = parseInt((a.data.pot + a.data.maxAmount - e) * t[i].molecule / t[i].denominator) + a.data.maxAmount, 
        t[i].title = "底池", t[0].multiple = "1/3", t[1].multiple = "1/2", t[2].multiple = "2/3", 
        t[i].hellNumber = Math.min(a.data.maxRaise, t[i].hellNumber), i == t.length - 1 && (t[i].raiseNumber = a.data.maxRaise, 
        t[i].hellNumber = a.data.maxRaise, t[i].title = ""), t[i].raiseNumber < a.data.minRaise && i != t.length - 1 ? t[i].bgColor = !1 : t[i].bgColor = !0; else for (var o = 0; o < t.length; o++) o < 3 ? (t[o].raiseNumber = 2 * a.data.small_blind_amount * (1 * o + 2), 
        t[o].hellNumber = 2 * a.data.small_blind_amount * (1 * o + 2), t[o].title = "大盲", 
        t[o].multiple = "X" + (1 * o + 2)) : 3 == o ? (t[o].raiseNumber = parseInt((a.data.pot + a.data.maxAmount - e) * t[o].molecule / t[o].denominator) + a.data.maxAmount, 
        t[o].hellNumber = parseInt((a.data.pot + a.data.maxAmount - e) * t[o].molecule / t[o].denominator) + a.data.maxAmount) : 4 == o && (t[o].raiseNumber = a.data.maxRaise, 
        t[o].hellNumber = a.data.maxRaise);
        a.setData({
            raiseBtn: t
        });
    },
    showPuke: function(t) {
        var a = this, e = 0, i = a.data.showPuke.length, o = 0;
        a.setData({
            showPukeTime: 0,
            seats: a.data.seats
        }), "flop" == t ? o = 3 : "turn" == t ? o = 4 : "river" == t && (o = 5), a.data.allinState && (o = 5, 
        a.showAllin(), 5 == i && setTimeout(function() {
            a.victory(a.data.seats);
        }, 1e3));
        for (var n = i; n < o; n++) !function(t) {
            a.data.allinState ? e += t <= 2 ? 333 : a.data.stepTime.allinTime : (3 != o || a.data.tips.hidden ? (a.data.stepTime.showTime = 500, 
            a.setData({
                stepTime: a.data.stepTime
            })) : (a.data.stepTime.showTime = 100, a.setData({
                stepTime: a.data.stepTime
            })), e += a.data.stepTime.showTime), setTimeout(function() {
                getApp().globalData.voiceBroadCard.stop(), getApp().globalData.voiceBroadCard.play(), 
                a.data.showPuke.push("../../images/puke/" + a.data.broad_cards[t] + ".png"), a.setData({
                    showPuke: a.data.showPuke
                }), a.data.allinState && (t > 2 && a.showAllin(), 4 == t && a.victory(a.data.seats));
            }, e);
        }(n);
        a.setData({
            showPukeTime: e
        });
    },
    showAllin: function() {
        var t = this, a = (this.data.seats, []), e = [], i = [], o = [], n = [], s = [];
        t.defaultCardsList(a, e, i, o), t.shuffleC(i, n), t.winProbability(a, e, n, s, o);
    },
    defaultCardsList: function(t, a, e, i) {
        for (var o = this, n = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K" ], s = [ "c", "d", "h", "s" ], r = 0; r < n.length; r++) for (var d = 0; d < s.length; d++) t.push(n[r] + s[d]), 
        e.push(n[r] + s[d]);
        for (var l = 0; l < o.data.showPuke.length; l++) o.arrRemove(e, o.data.showPuke[l].split("../../images/puke/")[1].split(".png")[0]), 
        o.arrRemove(t, o.data.showPuke[l].split("../../images/puke/")[1].split(".png")[0]), 
        i.push(o.data.showPuke[l].split("../../images/puke/")[1].split(".png")[0]);
        for (var c = 0; c < o.data.seats.length; c++) o.arrRemove(e, o.data.seats[c].hole_card[0]), 
        o.arrRemove(e, o.data.seats[c].hole_card[1]);
        for (var u = 0; u < o.data.seats.length; u++) "FOLD" != o.data.seats[u].actionLists.action && (o.arrRemove(t, o.data.seats[u].hole_card[0]), 
        o.arrRemove(t, o.data.seats[u].hole_card[1]));
    },
    shuffleA: function(t, a, e, i) {
        var o = this;
        i.splice(0, i.length);
        for (var n = 0; n < 5 - o.data.showPuke.length; n++) {
            0 == t.length && (t = t.concat(a), a = []);
            var s = t.length, r = (Math.random() * (s - 1)).toFixed(0);
            a.push(t[r]), i.push(t[r]), o.arrRemove(t, t[r]);
        }
    },
    shuffleC: function(t, a) {
        for (var e = this, i = 0; i < 5 - e.data.showPuke.length; i++) {
            var o = t.length, n = (Math.random() * (o - 1)).toFixed(0);
            a.push(t[n]), e.arrRemove(t, t[n]);
        }
    },
    winProbability: function(t, a, e, i, o) {
        for (var n = this, s = n.data.seats, r = 0; r < 9; r++) s[r].percent = 0;
        var d = 500;
        d = 4 == o.length ? t.length : 500;
        for (var l = 0; l < d; l++) {
            n.shuffleA(t, a, e, i);
            for (var c = [], u = 0; u < s.length; u++) if ("FOLD" != s[u].actionLists.action && "empty" != s[u].state) {
                var p = [];
                p.push(s[u].hole_card.concat(i.concat(o))), p.push(s[u].uuid), c.push(p);
            }
            for (var h = [], m = 0; m < c.length; m++) h.push(getApp().globalData.util.getCardMaxValue(c[m][0]));
            for (var g = Math.max.apply(this, h), f = [], D = 0; D < h.length; D++) h[D] == g && (f.push(D), 
            h.splice(D, 1, 0));
            for (var b = 0; b < f.length; b++) n.data.seats[c[f[b]][1]].percent += 1 / f.length;
        }
        for (var v = 0; v < s.length; v++) "FOLD" != s[v].actionLists.action && "empty" != s[v].state && (s[v].actionLists.actions = (s[v].percent / d * 100).toFixed(0) + "%", 
        s[v].actionLists.bubbleBg = "#a1376e", s[v].actionLists.bubble = !1, 3 == s[v].uuid && n.setData({
            heroBubble: !1
        }));
        n.setData({
            seats: s,
            broad_cards: o.concat(e)
        });
    },
    arrRemove: function(t, a) {
        var e = t.indexOf(a);
        return e >= 0 && t.splice(e, 1), t;
    },
    showDownPuke: function(t) {
        var a = this;
        if ("FOLD" != a.data.seats[3].actionLists.action) for (var e = 0; e < t.length; e++) "FOLD" != t[e].actionLists.action && (t[e].CardsHidden = !0, 
        t[e].backHiddenF = !1, t[e].backHiddenS = !1);
        a.setData({
            seats: t
        });
    },
    victory: function(t) {
        var a = this, e = [], i = 0, o = 0, n = 0;
        if ("FOLD" != a.data.seats[3].actionLists.action) for (var s = 0; s < t.length; s++) t[s].paidCount > 0 && (t[s].potChipAction = "potChipAction" + s), 
        "FOLD" != t[s].actionLists.action && "empty" != t[s].state && (e = t[s].hole_card.concat(a.data.broad_cards), 
        n = getApp().globalData.util.getCardMaxValue(e), 3 == s && (i = n), o <= n && (o = n), 
        t[s].CardsHidden = !0, t[s].backHiddenF = !1, t[s].backHiddenS = !1);
        console.log(i, o), i == o && 0 != i ? (getApp().globalData.voiceWin.play(), a.setData({
            perfectShow: !1,
            victory: "win"
        })) : (getApp().globalData.voiceLose.play(), a.setData({
            perfectShow: !1,
            victory: "lose"
        })), a.setData({
            seats: t,
            tips: {
                hidden: !0,
                info: "正在恢复上次未完成牌局"
            }
        }), a.data.shiFanData || (a.data.playBackData ? setTimeout(function() {
            a.continueReview();
        }, 1e3) : a.getReview());
    },
    continueReview: function() {
        var t = this;
        t.data.perfect ? t.setData({
            victory: "perfect",
            perfectShow: !1
        }) : (t.remarkOn(), t.setData({
            perfectShow: !0
        })), t.setData({
            disabledRemark: !0,
            shiFanData: !1,
            tips: {
                hidden: !0,
                info: ""
            }
        });
    },
    computingChip: function(t, a) {
        for (var e = this, i = 0; i < t.length; i++) if (t[e.data.lastActionSeat].actionLists.border = !1, 
        t[i].uuid == a.uuid) {
            t[i].actionLists = a, t[i].actionLists.border = !0, t[i].initial_stack = t[i].initial_stack - t[i].actionLists.paid, 
            t[i].actionLists.bubble = !1, t[i].actionLists.amount ? t[i].paidCount = t[i].actionLists.amount : t[i].paidCount = t[i].actionLists.paid + t[i].paidCount;
            var o = e.data.pot + t[i].actionLists.paid;
            return e.setData({
                seats: t,
                pot: o,
                lastActionSeat: i
            }), void (t[i].actionLists.border = !1);
        }
    },
    // 非重点
    menuHidden: function() {
        var t = this;
        t.setData({
            "menuHidden.animate": "menuAnimate2"
        }), setTimeout(function() {
            t.setData({
                "menuHidden.hidden": !1
            });
        }, 100);
    },
    // 非重点
    menuContent: function() {
        var t = this;
        t.setData({
            "menuHidden.animate": "menuAnimate1"
        }), setTimeout(function() {
            t.setData({
                "menuHidden.hidden": !0
            });
        }, 100);
    },
    // 非重点
    signOut: function() {
        "catalog" == this.data.options.path ? wx.switchTab({
            url: "../catalog/catalog"
        }) : wx.switchTab({
            url: "../index/index"
        });
    },
    
    book: function() {
        this.dialog.showDialog();
    },
    bookConfirmEvent: function() {
        this.dialog.hideDialog();
    },
    getReview: function() {
        var t = this, a = setTimeout(function() {
            t.setData({
                loadingButton: !1
            });
        }, 300), e = new Date().valueOf();
        t.data.options.share || t.setData({
            "options.share": !1
        }), console.log("准备获取点评", t.data.trainHhId, t.data.options.share), getApp().globalData.util.wxPracticeRequest("/getHhReview", "post", {
            trainHhId: t.data.trainHhId,
            trainHhShare: t.data.options.share
        }, function(i) {
            console.log("获取点评成功", i), clearTimeout(a);
            var o = 1100 - (new Date().valueOf() - e);
            o < 0 && (o = 0), setTimeout(function() {
                t.setData({
                    victory: "",
                    perfectShow: !0,
                    loadingButton: !0
                }), t.HandleReview(i);
            }, o);
        }, function(a) {
            console.log("获取点评失败", a), t.setData({
                victory: "",
                perfectShow: !0,
                loadingButton: !0
            }), t.showModalInfo("网络不好，请求失败！", !0, "返回", "重新获取", function() {
                t.getReview();
            });
        });
    },
    HandleReview: function(t) {
        var a = this;
        t.data.success ? (1007 != getApp().globalData.scene && 1008 != getApp().globalData.scene && 1044 != getApp().globalData.scene && 1047 != getApp().globalData.scene && 1048 != getApp().globalData.scene && 1049 != getApp().globalData.scene || (a.data.remarkConfirm.text = "", 
        a.setData({
            remarkConfirm: a.data.remarkConfirm
        })), a.setData({
            remarkDetail: t.data.data.hhReview,
            disabledRemark: !0,
            shareTitle: t.data.data.shareTitle
        }), t.data.data.payCoin && wx.showToast({
            title: t.data.data.payCoin,
            icon: "none",
            duration: 2e3
        }), t.data.data.playBackHh && (a.setData({
            playBackButton: !1
        }), wx.setStorageSync("playBackHh", t.data.data.playBackHh)), t.data.data.shifanHh && (a.setData({
            shiFanButton: !1
        }), wx.setStorageSync("shifanHh", t.data.data.shifanHh)), t.data.data.firstTrainButton && a.setData({
            firstTrainButton: !0
        }), t.data.data.themeList && wx.setStorageSync("themeList", t.data.data.themeList), 
        t.data.data.userInfo && wx.setStorageSync("userInfo", t.data.data.userInfo), t.data.data.trainResultReview && a.selectComponent("#summary").setData({
            summary: t.data.data.trainResultReview
        }), a.perfectJudge(t)) : null != t.data.code && 3001 == t.data.code ? a.noTaoZi() : null == t.data.code || 1008 != t.data.code && 1009 != t.data.code ? a.showModalInfo("服务器请求失败！", !0, "返回", "重新获取", function() {
            a.getReview();
        }) : a.showModalInfo("服务器开小差了！", !0, "返回", "重新获取", function() {
            a.getReview();
        });
    },
    noTaoZi: function() {},
    isCoupon: function() {},
    perfectJudge: function(t) {
        var a = this;
        if (t.data.data.perfect) {
            if (a.setData({
                perfect: !0
            }), getApp().globalData.voiceGoodScore.play(), 1007 == getApp().globalData.scene || 1008 == getApp().globalData.scene || 1044 == getApp().globalData.scene || 1047 == getApp().globalData.scene || 1048 == getApp().globalData.scene || 1049 == getApp().globalData.scene) {
                var e = a.data.remarkConfirm;
                getApp().globalData.user ? e.text = "开始训练" : e.text = "开始测评", a.setData({
                    remarkConfirm: e
                });
            } else a.reviewData(t);
            a.setData({
                perfectShow: !1,
                victory: "perfect"
            });
        } else {
            if (a.setData({
                perfect: !1
            }), 1007 == getApp().globalData.scene || 1008 == getApp().globalData.scene || 1044 == getApp().globalData.scene || 1047 == getApp().globalData.scene || 1048 == getApp().globalData.scene || 1049 == getApp().globalData.scene) {
                var i = a.data.remarkConfirm;
                getApp().globalData.user ? i.text = "开始训练" : i.text = "开始测评", i.adviceTheme = t.data.data.adviceTheme, 
                i.value = t.data.data.totalReview, a.setData({
                    remarkConfirm: i
                });
            } else a.reviewData(t);
            a.remarkOn();
        }
    },
    reviewData: function(t) {
        var a = this;
        if (t.data.data.totalReview) {
            var e = a.data.remarkConfirm;
            e.text = "查看小结", e.adviceTheme = t.data.data.adviceTheme, e.value = t.data.data.totalReview, 
            e.image = getApp().globalData.imgUrl + t.data.data.sessionImage, t.data.data.shouldBuyVip && a.setData({
                shouldBuyVip: !0
            }), t.data.data.score && (e.score = t.data.data.score), a.setData({
                remarkConfirm: e
            });
        } else if (t.data.data.trainResultReview) {
            var i = a.data.remarkConfirm;
            i.score = t.data.data.trainResultReview.firstPage.score, i.text = "查看小结", a.setData({
                shareTitle: t.data.data.trainResultReview.shareTitle,
                remarkConfirm: i
            });
        }
    },
    perfectShow: function(t) {
        getApp().globalData.voiceGod.stop(), this.setData({
            perfectShow: !0,
            hideRemark: !0,
            shiFanData: !1,
            heroActionInfo: !1
        }), getApp().globalData.scene = 1001;
        debugger
        var a = this, e = t.currentTarget.dataset.name;
        "下一手" == e || "查看小结" == e || "开始训练" == e || "开始测评" == e ? (a.data.options.gameCard = "false", 
        this.setData({
            options: a.data.options
        }), this.nextGame()) : "master" == e ? this.demonstration() : "replay" == e && this.rePlay();
    },
    perfectAction: function() {
        var t = this;
        this.setData({
            perfectAction: "perfectAction"
        }), setTimeout(function() {
            t.setData({
                perfectAction: "",
                perfectShow: !0
            });
        }, 500);
    },
    remarkOn: function() {
        var t = this;
        if (o = 0, "perfect" == this.data.victory && "训练小结" != this.data.remarkConfirm.title) t.setData({
            perfectShow: !1
        }), t.updateState(2); else if (this.remark.showDialog(this.data.remarkDetail), t.judgeGuide(5, "", "shiFan"), 
        !getApp().globalData.guide) {
            var a = getApp().globalData.GuideStatus;
            if (1 == a[5]) {
                var e = !1;
                for (var i in this.data.remarkDetail) 1 == this.data.remarkDetail[i].is_click && (e = !0);
                1 == e && t.judgeGuide(3, "", "clickKeyWord"), 1 == a[3] && t.judgeGuide(6, "", "shareDiscuss");
            }
        }
    },
    rePlay: function() {
        if (0 == n) {
            n = 1, getApp().globalData.voiceGod.stop();
            var t = this;
            t.remark.animateHidden(), t.data.options.gameCard = "false", this.setData({
                shiFanData: !1,
                heroActionInfo: !1,
                options: t.data.options
            }), "重新训练" == t.data.cancelText ? t.getGAme("/getNextHh", {
                themeId: t.data.options.id
            }, t.data.options) : "购买会员" == t.data.cancelText ? wx.navigateTo({
                url: "../mall/mall"
            }) : "高手示范" == t.data.cancelText ? t.demonstration() : 1007 == getApp().globalData.scene || 1008 == getApp().globalData.scene || 1044 == getApp().globalData.scene ? (getApp().globalData.scene = 1001, 
            t.getGAme("/getAgainHh", {
                themeId: t.data.options.id,
                trainHhId: t.data.trainHhId,
                isShare: !0
            }, t.data.options)) : (console.log("重玩本手", t.data.options.id, t.data.trainHhId, t.data.options), 
            t.getGAme("/getAgainHh", {
                themeId: t.data.options.id,
                trainHhId: t.data.trainHhId
            }, t.data.options));
        }
    },
    playBack: function() {
        getApp().globalData.voiceGod.stop();
        var t = this;
        t.data.playBackButton || (t.countReview(2), this.remark.hideDialog(), t.setData({
            playBackData: !0,
            showPukeTime: 0,
            shiFanData: !1,
            stepTime: {
                fold: 250,
                action: 750,
                allinTime: 1e3,
                showTime: 750,
                dealTime: 2e3
            }
        }), t.gameCard(wx.getStorageSync("playBackHh")));
    },
    demonstration: function() {
        n = 0, getApp().globalData.voiceGod.stop();
        var t = this;
        getApp().globalData.totalSpend > 0 && t.judgeGuide(4, "", "handHigh"), t.data.shiFanButton || t.countReview(1);
    },
    discuss: function() {},
    countReview: function(t) {},
    nextGame: function() {
        var t = this;
        debugger
        if (0 == o) if (o = 1, this.setData({
            shiFanData: !1
        }), getApp().globalData.voiceGod.stop(), getApp().globalData.scene = 1001, console.log(this.data.remarkConfirm.text), 
        "查看小结" == this.data.remarkConfirm.text) if (t.data.remarkConfirm.score && (1 == t.data.trainType && t.data.remarkConfirm.score >= 95 ? getApp().globalData.voiceGod.play() : 100 == t.data.remarkConfirm.score && getApp().globalData.voiceGod.play()), 
        1 == t.data.trainType) t.setData({
            disabledRemark: !1
        }), t.remark.hideDialog(), t.summary(); else {
            var a = this.data.remarkConfirm;
            a.title = "训练小结", a.text = "退出", a.discuss = "";
            var e = "重新训练";
            t.data.shouldBuyVip && (e = t.data.isIos ? "" : "购买会员"), 1 == t.data.firstTrainButton && (a.text = "看看有哪些训练", 
            e = ""), this.setData({
                remarkConfirm: a,
                hideRemark: !0,
                cancelText: e
            }), this.setData({
                remarkDetail: this.data.remarkConfirm.value
            }), this.remarkOn(this.data.remarkDetail);
        } else "退出" == this.data.remarkConfirm.text ? t.signOut() : "看看有哪些训练" == this.data.remarkConfirm.text ? (t.setData({
            "options.path": "catalog"
        }), t.signOut()) : "" != this.data.remarkConfirm.text && "下一手" != this.data.remarkConfirm.text ? "开始测评" == this.data.remarkConfirm.text ? (t.remark.animateHidden(), 
        this.getGAme("/getNextHh", {
            themeId: getApp().globalData.defaultEvId
        }, this.data.options)) : "开始训练" == this.data.remarkConfirm.text ? (t.remark.animateHidden(), 
        this.getGAme("/getNextHh", {
            trainHhId: t.data.trainHhId
        }, this.data.options)) : (t.remark.animateHidden(), this.getGAme("/getNextHh", {
            themeId: this.data.remarkConfirm.adviceTheme.id
        }, this.data.options)) : (t.remark.animateHidden(), this.getGAme("/getNextHh", {
            themeId: this.data.options.id
        }, this.data.options));
    },
    summary: function() {
        this.setData({
            summary: !0
        }), o = 0, this.serverDownloadFile(wx.getStorageSync("userInfo").avatarUrl, "serverUserImg", "userImg"), 
        this.serverDownloadFile(getApp().globalData.imgUrl + "/image/share/ewm1.jpg", "serverEwm1", "ewm1"), 
        this.serverDownloadFile(getApp().globalData.imgUrl + "/image/share/ewm2.jpg", "serverEwm2", "ewm2"), 
        this.serverDownloadFile(getApp().globalData.imgUrl + "/image/config/seal.png", "serverSeal", "seal"), 
        this.selectComponent("#summary").showDialog(), this.selectComponent("#summary").abilityCanvas();
    },
    serverDownloadFile: function(t, a, e) {
        var i = this;
        try {
            var o = wx.getStorageSync(a);
            o ? (i.data.serverImg[e] = o, i.setData({
                serverImg: i.data.serverImg
            })) : wx.getImageInfo({
                src: t,
                success: function(t) {
                    wx.setStorageSync(a, t.path), i.data.serverImg[e] = t.path, i.setData({
                        serverImg: i.data.serverImg
                    });
                }
            });
        } catch (o) {
            wx.getImageInfo({
                src: t,
                success: function(t) {
                    wx.setStorageSync(a, t.path), i.data.serverImg[e] = t.path, i.setData({
                        serverImg: i.data.serverImg
                    });
                }
            });
        }
    },
    hideSilder: function() {
        this.setData({
            hideSilder: !0
        });
    },
    opinionSubmit: function(t) {},
    collect: function() {},
    praise: function() {},
    tread: function() {},
    evaluate: function() {
        this.setData({
            imgScroll: {
                imgScroll: !1,
                imgSrc: getApp().globalData.imgUrl + "/image/intro/AIReviewIntro.png"
            }
        });
    },
    priceLevel: function() {
        this.setData({
            imgScroll: {
                imgScroll: !1,
                imgSrc: getApp().globalData.imgUrl + "/image/product/priceLevel.png"
            }
        });
    },
    help: function() {
        this.setData({
            imgScroll: {
                imgScroll: !1,
                imgSrc: getApp().globalData.imgUrl + "/image/product/help.png"
            }
        });
    },
    customerService: function() {
        this.setData({
            imgScroll: {
                imgScroll: !1,
                imgSrc: getApp().globalData.imgUrl + "/image/intro/customerService.png"
            }
        });
    },
    summaryClose: function() {
        this.setData({
            "options.path": "catalog"
        }), this.signOut();
    },
    closeImgScroll: function() {
        this.setData({
            imgScroll: {
                imgScroll: !0,
                imgSrc: ""
            }
        });
    },
    closeGiftBag: function() {
        this.setData({
            follow: !1
        });
    },
    judgeGuide: function(t, a, e) {
        var i = this;
        getApp().globalData.guide || 1 != getApp().globalData.GuideStatus[t] && i.setData({
            guide: {
                show: !1,
                step: t,
                info: a,
                className: "guide" + t,
                bindName: e,
                imgUrl: getApp().globalData.imgUrl + "/image/lead/" + e + ".png"
            }
        });
    },
    newState: function(a) {
        var e = "", i = [].concat(t(a));
        i = i.reverse();
        for (var o = 0; o < i.length; o++) 1 == i[o] ? e += "1" : e += "0";
        return parseInt(e, 2);
    },
    updateState: function(t) {
        var a = this;
        a.setData({
            "guide.show": !0,
            info: "",
            bindName: ""
        }), getApp().globalData.guide || 1 != getApp().globalData.GuideStatus[t] && (getApp().globalData.GuideStatus[t] = 1, 
        getApp().globalData.util.wxPracticeRequest("/userInfo/noviceGuide", "post", {
            status: a.newState(getApp().globalData.GuideStatus)
        }, function(t) {
            console.log("状态码更新成功！", getApp().globalData.GuideStatus);
        }));
    },
    clickHeadImg: function(t) {
        var a = this, e = t.currentTarget.dataset.info;
        getApp().globalData.guide || 1 != getApp().globalData.GuideStatus[1] && (a.selectComponent("#remarkHead").show(e), 
        a.setData({
            guide: {
                show: !0,
                step: 0,
                info: "",
                bindName: ""
            }
        }), a.updateState(1));
    },
    clickKeyWord: function() {
        this.updateState(3);
    },
    shiFan: function() {
        this.updateState(5);
    },
    tipsPageClose: function() {
        this.setData({
            "tipsInfo.show": !1
        }), this.gameCard(this.data.tipsInfo.result);
    },
});