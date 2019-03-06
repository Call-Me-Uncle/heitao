Component({
    properties: {
        serverImg: {
            type: Object,
            value: {}
        },
        produceImg: {
            type: String,
            value: "保存图片"
        },
        confirmText: {
            type: String,
            value: "发微信群"
        }
    },
    data: {
        isShow: !1,
        summary: {
            secondPage: {
                style: [ {
                    name: "入池率",
                    type: [ "松", "正常", "紧" ],
                    value: 50
                }, {
                    name: "激进度",
                    type: [ "松", "正常", "紧" ],
                    value: 0
                }, {
                    name: "跟注范围",
                    type: [ "窄", "正常", "广" ],
                    value: 100
                }, {
                    name: "下注尺度",
                    type: [ "小", "正常", "大" ],
                    value: 50
                } ],
                addWord2: [ "算法为你智能推送个性化练习" ],
                addWord3: [ "训练越多，结果越准。", "训练越多，结果越准。", "算法为你智能推送个性化练习 ，10倍速提升你的水平。" ]
            },
            firstPage: {
                degreeScore: 60,
                power: {
                    "翻牌前": 20,
                    "单次加注底池": 33,
                    "有位置": 28,
                    "单挑底池": 56,
                    "翻牌后": 30,
                    "3bet+底池": 12,
                    "没位置": 100,
                    "多人底池": 70
                },
                trainResultInfo: [ "像你这人", "本该在骋", "看好你哟，加油！" ],
                degreeStr: "中级别",
                stampName: "中级别",
                addWord1: [ "训练越多，结果越准。", "算法为你智能推送个性化练习 ，10倍速提升你的水平。" ]
            },
            thirdPage: {
                totalInfo: "&nbsp;&nbsp;&nbsp;&nbsp;你打法风格具有如下漏洞：你在翻牌前弃牌略少，翻牌后弃牌太少，\n对于翻牌前打法、听牌,你存在技术漏洞（训练越多、结果越准）；\n你有巨大提升空间！针对你的情况，黑桃大师将为你智能推荐专题训练,\n基于黑桃大师（全球首创的扑克个性化培训AI），随时随地的练上几手，即可弥补技术漏洞，大幅度提升你的扑克水平！",
                adviceTheme: {
                    id: 6
                }
            }
        },
        userName: wx.getStorageSync("userInfo").userName,
        animationIndex: 1,
        width: 0,
        draw: !0
    },
    methods: {
        summaryClick: function() {
            var e = this;
            3 == e.data.animationIndex ? e.setData({
                animationIndex: 1
            }) : e.setData({
                animationIndex: e.data.animationIndex + 1
            });
        },
        summaryClose: function() {
            this.triggerEvent("summaryClose"), this.setData({
                isShow: !1
            });
        },
        showDialog: function(e) {
            this.setData({
                isShow: !0
            });
        },
        produceImg: function(e) {
            var t = this;
            t.data.draw && (wx.showLoading({
                title: "图片生成中",
                mask: !0
            }), t.setData({
                draw: !1
            }), "produceImg" == e.currentTarget.dataset.name ? t.createNewImg(function(e) {
                t.saveImage(e);
            }) : "produceImg2" == e.currentTarget.dataset.name && t.createNewImg2(function(e) {
                t.saveImage(e);
            }));
        },
        saveImage: function(e) {
            var t = this;
            wx.saveImageToPhotosAlbum({
                filePath: e.tempFilePath,
                success: function(e) {
                    wx.hideLoading(), t.setData({
                        draw: !0
                    }), wx.showModal({
                        content: "图片已保存到相册，赶紧晒一下吧~",
                        showCancel: !1,
                        confirmText: "好的",
                        confirmColor: "#333",
                        success: function(e) {}
                    });
                },
                fail: function(e) {
                    wx.hideLoading(), wx.showModal({
                        content: "没有访问相册权限，保存图片到相册失败！请截图分享",
                        showCancel: !1,
                        confirmText: "我知道了",
                        confirmColor: "#333",
                        success: function(e) {}
                    });
                }
            });
        },
        fillRoundRect: function(e, t, a, i, s, n, r) {
            if (2 * n > i || 2 * n > s) return !1;
            e.save(), e.translate(t, a), e.setFillStyle(r), this.drawRoundRectPath(e, i, s, n), 
            e.fill(), e.restore();
        },
        roundRectLine: function(e, t, a, i, s, n, r, o) {
            if (2 * n > i || 2 * n > s) return !1;
            e.save(), e.translate(t, a), e.setLineWidth(r), e.setStrokeStyle(o), this.drawRoundRectPath(e, i, s, n), 
            e.stroke(), e.restore();
        },
        drawRoundRectPath: function(e, t, a, i) {
            e.beginPath(0), e.arc(t - i, a - i, i, 0, Math.PI / 2), e.lineTo(i, a), e.arc(i, a - i, i, Math.PI / 2, Math.PI), 
            e.lineTo(0, i), e.arc(i, i, i, Math.PI, 3 * Math.PI / 2), e.lineTo(t - i, 0), e.arc(t - i, i, i, 3 * Math.PI / 2, 2 * Math.PI), 
            e.lineTo(t, a - i), e.closePath();
        },
        createNewImg: function(e) {
            var t = this, a = this, i = wx.createCanvasContext("produceImg", this);
            i.drawImage("../../images/train/bj.jpg", 0, 0, 375, 667), i.stroke(), i.beginPath(), 
            a.fillRoundRect(i, 12, 40, 350, 585, 10, "rgba(17,15,48,0.6)"), a.roundRectLine(i, 12, 40, 350, 585, 10, 2, "#c0b8ff"), 
            i.beginPath(), i.stroke(), i.beginPath(), a.circleImg(i, a.data.serverImg.userImg, 52, 78, 35), 
            i.stroke(), i.beginPath(), i.setFontSize(20), i.setFillStyle("#fff"), i.fillText(a.data.userName.slice(0, 5), 140, 105), 
            i.stroke(), i.beginPath(), i.setFontSize(18), i.setFillStyle("#fff"), i.fillText("斩获：", 140, 135), 
            i.stroke(), i.beginPath(), i.setFontSize(26), i.setFillStyle("#fbd141"), i.fillText(a.data.summary.firstPage.score + "分", 190, 138), 
            i.stroke(), i.beginPath(), i.setFontSize(22), i.setFillStyle("#fff"), i.setTextAlign("center"), 
            i.fillText(a.data.summary.firstPage.trainResultInfo.join(""), 188, 200, 350), i.stroke(), 
            i.drawImage("../../images/train/line.png", 31, 155, 313, 8), i.stroke(), a.roundRectLine(i, 37, 225, 300, 240, 8, 3, "#3684cd"), 
            a.fillRoundRect(i, 40, 228, 294, 35, 5, "#387def"), i.beginPath(), i.setFontSize(15), 
            i.setFillStyle("#fff"), i.setTextAlign("center"), i.fillText("八项能力值", 187, 250), 
            i.stroke(), i.beginPath();
            var s = function(e) {
                return Number((.5 * e).toFixed(2));
            }, n = [ [ s(45), s(30) ], [ s(0), s(35) ], [ s(40), s(30) ], [ s(60), s(10) ], [ s(55), s(-10) ], [ s(0), s(20) ], [ s(60), s(-10) ], [ s(65), s(10) ] ];
            this.drawCanvas(i, s, n, 375, 725), i.stroke(), i.beginPath(), i.setFontSize(12), 
            i.setFillStyle("#fff"), i.setTextAlign("left"), i.fillText(a.data.summary.firstPage.addWord1[0], 45, 495), 
            i.fillText(a.data.summary.firstPage.addWord1[1], 45, 520), i.stroke(), i.beginPath(), 
            i.drawImage(a.data.serverImg.ewm1, 100, 540, 75, 75), i.stroke(), i.beginPath(), 
            i.setFontSize(12), i.setFillStyle("#fff"), i.setTextAlign("left"), i.fillText("快扫码测试", 200, 565), 
            i.fillText("看看你能得几分", 200, 595), i.stroke(), i.beginPath(), a.data.summary.firstPage.stampName && (i.rotate(-30 * Math.PI / 180), 
            i.drawImage(a.data.serverImg.seal, 150, 220, 109, 94), i.setFontSize(15), i.setFillStyle("#fff"), 
            i.setTextAlign("center"), i.fillText(a.data.summary.firstPage.stampName, 205, 272), 
            i.stroke()), i.draw(), i.beginPath(), setTimeout(function() {
                wx.canvasToTempFilePath({
                    canvasId: "produceImg",
                    success: function(t) {
                        e(t);
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                }, t);
            }, 200);
        },
        circleImg: function(e, t, a, i, s) {
            e.save();
            var n = 2 * s, r = a + s, o = i + s;
            e.setLineWidth(6), e.setStrokeStyle("#387def"), e.arc(r, o, s, 0, 2 * Math.PI), 
            e.clip(), e.drawImage(t, a, i, n, n), e.restore();
        },
        abilityCanvas: function() {
            var e = 750, t = function(t) {
                return wx.getSystemInfo({
                    success: function(t) {
                        e = t.windowWidth;
                    }
                }), Number((e / 750 * t).toFixed(2));
            }, a = [ [ t(0), t(30) ], [ t(90), t(35) ], [ t(80), t(30) ], [ t(120), t(10) ], [ t(100), t(-10) ], [ t(-70), t(20) ], [ t(15), t(-10) ], [ t(10), t(10) ] ], i = wx.createCanvasContext("abilityCanvas", this);
            this.drawCanvas(i, t, a, 285, 200), i.draw();
        },
        drawCanvas: function(e, t, a, i, s) {
            var n = 0, r = 0, o = 0, l = [], f = 8, d = [ t(i), t(s) ], c = t(25), g = [], m = [], u = this.data.summary.firstPage.power;
            for (var h in u) g.length < 8 && g.push(h), m.length < 8 && m.push(u[h]);
            var I = 360 / (f = m.length), T = t(2);
            for (e.setLineWidth(t(2)), e.setStrokeStyle("#32aa72"), e.beginPath(), e.setFontSize(t(26)), 
            e.setFillStyle("#fff"), n = 0; n < 100; n++) for (l[n] = [], o = 0; o < f; o++) {
                e.moveTo(d[0], d[1]);
                var x = c * (n + 1) / 20 * function(e) {
                    var t = 1;
                    e >= 0 && e < 90 ? t = 1 : e >= 90 && e < 180 ? (t = -1, e = 180 - e) : e >= 180 && e < 270 ? (t = -1, 
                    e -= 180) : e >= 270 && e <= 360 && (t = 1, e = 360 - e);
                    var a = Math.cos(Math.PI / 180 * e);
                    return a < 0 && (a *= -1), a * t;
                }(I * (o + 1) + 0), v = c * (n + 1) / 20 * function(e) {
                    var t = 1;
                    e >= 0 && e < 90 ? t = 1 : e >= 90 && e < 180 ? (t = 1, e = 180 - e) : e >= 180 && e < 270 ? (t = -1, 
                    e -= 180) : e >= 270 && e <= 360 && (t = -1, e = 360 - e);
                    var a = Math.sin(Math.PI / 180 * e);
                    return a < 0 && (a *= -1), a * t;
                }(I * (o + 1) + 0), P = d[0] + x, S = d[1] + v;
                if (99 == n && (e.lineTo(P, S), g[o])) {
                    var w = x >= 0 ? 1 : -1;
                    w = P + w * a[o][0];
                    var y = v >= 0 ? 1 : -1;
                    y = S + y * a[o][1], e.fillText(g[o], w, y);
                }
                l[n][o] = [ P, S ];
            }
            for (r = 0; r < l.length; r++) if (r % 20 == 0 || 99 == r) for (n = 0; n < l[r].length; n++) e.moveTo(l[r][n][0], l[r][n][1]), 
            n < l[r].length - 1 ? e.lineTo(l[r][n + 1][0], l[r][n + 1][1]) : (e.moveTo(l[r][n][0], l[r][n][1]), 
            e.lineTo(l[r][0][0], l[r][0][1]));
            e.stroke(), e.beginPath(), e.setStrokeStyle("rgba(255,234,123,0.4)"), e.setFillStyle("rgba(255,234,123,0.4)");
            var p = !0, b = [];
            for (r = 0; r < f; r++) {
                if (b = d, m[r] > 0) for (n = 0; n < 100; n++) if (m[r] == n + 1) {
                    b = l[n][r];
                    break;
                }
                p ? (e.moveTo(b[0], b[1]), p = !1) : e.lineTo(b[0], b[1]);
            }
            for (e.fill(), e.stroke(), e.closePath(), r = 0; r < f; r++) {
                if (b = d, m[r] > 0) for (n = 0; n < 100; n++) if (m[r] == n + 1) {
                    b = l[n][r];
                    break;
                }
                e.beginPath(), e.setStrokeStyle("rgba(61,147,189,0.9)"), e.setFillStyle("rgba(61,147,189,0.9)"), 
                e.closePath(), e.arc(b[0], b[1], T, 0, 2 * Math.PI, !1), e.closePath(), e.fill(), 
                e.stroke();
            }
            e.stroke();
        },
        createNewImg2: function(e) {
            var t = this, a = this, i = wx.createCanvasContext("produceImg2", this);
            i.drawImage("../../images/train/bj.jpg", 0, 0, 375, 667), i.stroke(), i.beginPath(), 
            a.fillRoundRect(i, 12, 40, 350, 585, 10, "rgba(17,15,48,0.6)"), a.roundRectLine(i, 12, 40, 350, 585, 10, 2, "#c0b8ff"), 
            i.beginPath(), i.stroke(), i.beginPath(), a.circleImg(i, "../../images/train/testLogo.jpg", 15, 50, 30), 
            i.stroke(), i.setFontSize(15), i.setFillStyle("#fff"), i.fillText("黑桃大师", 80, 77), 
            i.stroke(), i.setFontSize(10), i.setFillStyle("#fff"), i.fillText(a.data.summary.secondPage.addWord2[0], 80, 97), 
            i.stroke(), i.drawImage("../../images/train/testNameBj.png", 72, 150, 230, 30), 
            i.stroke(), i.setFontSize(17), i.setFillStyle("#fff"), i.setTextAlign("center"), 
            i.fillText(a.data.userName.slice(0, 10), 187, 170), i.setFontSize(16), i.setFillStyle("#ff9c00"), 
            i.setTextAlign("center"), i.fillText("打法风格", 187, 220), i.stroke();
            var s = this.data.summary.secondPage.style, n = 210, r = 228, o = 225, l = 0;
            for (var f in s) n += 45, r += 45, o += 45, l = 120 + 2.18 * s[f].value, i.drawImage("../../images/train/testTitleImg.png", 30, n, 65, 28), 
            i.stroke(), i.setFontSize(12), i.setFillStyle("#fff"), i.setTextAlign("center"), 
            i.fillText(s[f].name, 62, r), i.stroke(), i.drawImage("../../images/train/testResultBj.png", 120, n, 225, 26), 
            i.stroke(), i.setFontSize(12), i.setFillStyle("#fff"), i.fillText(s[f].type[0], 170, r), 
            i.fillText(s[f].type[1], 232, r), i.fillText(s[f].type[2], 295, r), i.stroke(), 
            i.drawImage("../../images/train/testResultIcon.png", l, o, 8, 9), i.stroke();
            i.setFontSize(13), i.setFillStyle("#fff"), i.setTextAlign("left"), i.fillText(a.data.summary.secondPage.addWord3[0], 40, 450), 
            i.stroke(), i.setFontSize(12), i.setFillStyle("#fff"), i.setTextAlign("left"), i.fillText(a.data.summary.secondPage.addWord3[1], 40, 470), 
            i.fillText(a.data.summary.secondPage.addWord3[2], 40, 490), i.stroke(), i.drawImage(a.data.serverImg.ewm2, 90, 520, 80, 80), 
            i.stroke(), i.setFontSize(14), i.setFillStyle("#fff"), i.setTextAlign("left"), i.fillText("快扫码测试", 190, 550), 
            i.fillText("看看你能得几分", 190, 580), i.stroke(), i.draw(), setTimeout(function() {
                wx.canvasToTempFilePath({
                    canvasId: "produceImg2",
                    success: function(t) {
                        e(t);
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                }, t);
            }, 200);
        },
        recommend: function(e) {
            wx.navigateTo({
                url: "../practice/practice?id=" + e.currentTarget.dataset.id + "&gameCard=" + !1
            });
        }
    }
});