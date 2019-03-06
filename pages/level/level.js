Page({
    data: {
        summary: {},
        userName: wx.getStorageSync("userInfo").userName,
        animationTop: !1,
        serverImg: {
            userImg: wx.getStorageSync("userInfo").avatarUrl,
            ewm1: getApp().globalData.imgUrl + "/image/share/ewm1.jpg",
            ewm2: getApp().globalData.imgUrl + "/image/share/ewm2.jpg",
            seal: getApp().globalData.imgUrl + "/image/config/seal.png"
        },
        produceImg: "保存图片",
        confirmText: "发微信群",
        statusBarHeight: 20,
        scrollHeight: 0,
        width: 0,
        canvas: !0,
        animationData: {},
        shareTitle: "黑桃大师-扑克个性化培训AI,10倍速提升你的水平",
        levelHidden: !0,
        draw: !0,
        animationIndex: 1
    },
    onLoad: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                t.system.indexOf("Android") < 0 ? e.setData({
                    statusBarHeight: t.statusBarHeight,
                    scrollHeight: t.screenHeight - 100 - t.statusBarHeight
                }) : e.setData({
                    statusBarHeight: t.statusBarHeight,
                    scrollHeight: t.screenHeight - 105 - t.statusBarHeight
                });
            }
        });
    },
    onShow: function() {
        var e = this;
        e.setData({
            levelHidden: !0
        }), wx.getImageInfo({
            src: getApp().globalData.imgUrl + "/image/share/ewm1.jpg",
            success: function(e) {}
        }), this.serverDownloadFile(wx.getStorageSync("userInfo").avatarUrl, "serverUserImg", "userImg"), 
        this.serverDownloadFile(getApp().globalData.imgUrl + "/image/share/ewm1.jpg", "serverEwm1", "ewm1"), 
        this.serverDownloadFile(getApp().globalData.imgUrl + "/image/share/ewm2.jpg", "serverEwm2", "ewm2"), 
        this.serverDownloadFile(getApp().globalData.imgUrl + "/image/config/seal.png", "serverSeal", "seal"), 
        getApp().globalData.util.wxPracticeRequest("/getTotalTestReview", "get", {}, function(t) {
            t.data.success && (e.setData({
                summary: t.data.data,
                shareTitle: t.data.data.shareTitle
            }), e.abilityCanvas(), t.data.data.emptyTrain && e.setData({
                levelHidden: !1
            }));
        }, function() {});
    },
    animationClick: function() {
        var e = this;
        2 == e.data.animationIndex ? e.setData({
            animationIndex: 1
        }) : e.setData({
            animationIndex: e.data.animationIndex + 1
        });
    },
    levelClose: function() {
        this.setData({
            levelHidden: !0
        });
    },
    levelButton: function() {
        this.setData({
            levelButton: !0
        }), wx.switchTab({
            url: "../index/index"
        });
    },
    serverDownloadFile: function(e, t, a) {
        var s = this;
        try {
            var i = wx.getStorageSync(t);
            i ? (s.data.serverImg[a] = i, s.setData({
                serverImg: s.data.serverImg
            })) : wx.getImageInfo({
                src: e,
                success: function(e) {
                    wx.setStorageSync(t, e.path), s.data.serverImg[a] = e.path, s.setData({
                        serverImg: s.data.serverImg
                    });
                },
                fail: function(e) {
                    console.log("shibai", t, e);
                }
            });
        } catch (i) {
            s.serverDownloadFile(e, t, a);
        }
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
    fillRoundRect: function(e, t, a, s, i, r, n) {
        if (2 * r > s || 2 * r > i) return !1;
        e.save(), e.translate(t, a), e.setFillStyle(n), this.drawRoundRectPath(e, s, i, r), 
        e.fill(), e.restore();
    },
    roundRectLine: function(e, t, a, s, i, r, n, l) {
        if (2 * r > s || 2 * r > i) return !1;
        e.save(), e.translate(t, a), e.setLineWidth(n), e.setStrokeStyle(l), this.drawRoundRectPath(e, s, i, r), 
        e.stroke(), e.restore();
    },
    drawRoundRectPath: function(e, t, a, s) {
        e.beginPath(0), e.arc(t - s, a - s, s, 0, Math.PI / 2), e.lineTo(s, a), e.arc(s, a - s, s, Math.PI / 2, Math.PI), 
        e.lineTo(0, s), e.arc(s, s, s, Math.PI, 3 * Math.PI / 2), e.lineTo(t - s, 0), e.arc(t - s, s, s, 3 * Math.PI / 2, 2 * Math.PI), 
        e.lineTo(t, a - s), e.closePath();
    },
    createNewImg: function(e) {
        var t = this, a = this, s = wx.createCanvasContext("produceImg", this);
        s.drawImage("../../images/train/bj.jpg", 0, 0, 375, 667), s.stroke(), s.beginPath(), 
        a.fillRoundRect(s, 12, 40, 350, 585, 10, "rgba(17,15,48,0.6)"), a.roundRectLine(s, 12, 40, 350, 585, 10, 2, "#c0b8ff"), 
        s.beginPath(), s.stroke(), s.beginPath(), a.circleImg(s, a.data.serverImg.userImg, 52, 78, 35), 
        s.stroke(), s.beginPath(), s.setFontSize(20), s.setFillStyle("#fff"), s.fillText(a.data.userName.slice(0, 5), 140, 105), 
        s.stroke(), s.beginPath(), s.setFontSize(18), s.setFillStyle("#fff"), s.fillText("斩获：", 140, 135), 
        s.stroke(), s.beginPath(), s.setFontSize(26), s.setFillStyle("#fbd141"), s.fillText(a.data.summary.firstPage.score + "分", 190, 138), 
        s.stroke(), s.beginPath(), s.setFontSize(22), s.setFillStyle("#fff"), s.setTextAlign("center"), 
        s.fillText(a.data.summary.firstPage.trainResultInfo.join(""), 188, 200, 350), s.stroke(), 
        s.drawImage("../../images/train/line.png", 31, 155, 313, 8), s.stroke(), a.roundRectLine(s, 37, 225, 300, 240, 8, 3, "#3684cd"), 
        a.fillRoundRect(s, 40, 228, 294, 35, 5, "#387def"), s.beginPath(), s.setFontSize(15), 
        s.setFillStyle("#fff"), s.setTextAlign("center"), s.fillText("八项能力值", 187, 250), 
        s.stroke(), s.beginPath();
        var i = function(e) {
            return Number((.5 * e).toFixed(2));
        }, r = [ [ i(45), i(30) ], [ i(0), i(35) ], [ i(40), i(30) ], [ i(60), i(10) ], [ i(55), i(-10) ], [ i(0), i(20) ], [ i(60), i(-10) ], [ i(65), i(10) ] ];
        this.drawCanvas(s, i, r, 375, 725), s.stroke(), s.beginPath(), s.setFontSize(12), 
        s.setFillStyle("#fff"), s.setTextAlign("left"), s.fillText(a.data.summary.firstPage.addWord1[0], 45, 495), 
        s.fillText(a.data.summary.firstPage.addWord1[1], 45, 520), s.stroke(), s.beginPath(), 
        s.drawImage(a.data.serverImg.ewm1, 100, 540, 75, 75), s.stroke(), s.beginPath(), 
        s.setFontSize(12), s.setFillStyle("#fff"), s.setTextAlign("left"), s.fillText("快扫码测试", 200, 565), 
        s.fillText("看看你能得几分", 200, 595), s.stroke(), s.beginPath(), a.data.summary.firstPage.stampName && (s.rotate(-30 * Math.PI / 180), 
        s.drawImage(a.data.serverImg.seal, 150, 220, 109, 94), s.setFontSize(15), s.setFillStyle("#fff"), 
        s.setTextAlign("center"), s.fillText(a.data.summary.firstPage.stampName, 205, 272), 
        s.stroke()), s.draw(), s.beginPath(), setTimeout(function() {
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
    circleImg: function(e, t, a, s, i) {
        e.save();
        var r = 2 * i, n = a + i, l = s + i;
        e.setLineWidth(6), e.setStrokeStyle("#387def"), e.arc(n, l, i, 0, 2 * Math.PI), 
        e.clip(), e.drawImage(t, a, s, r, r), e.restore();
    },
    abilityCanvas: function() {
        var e = 750, t = function(t) {
            return wx.getSystemInfo({
                success: function(t) {
                    e = t.windowWidth;
                }
            }), Number((e / 750 * t).toFixed(2));
        }, a = [ [ t(0), t(30) ], [ t(90), t(35) ], [ t(80), t(30) ], [ t(120), t(10) ], [ t(100), t(-10) ], [ t(-70), t(20) ], [ t(15), t(-10) ], [ t(10), t(10) ] ], s = wx.createCanvasContext("abilityCanvas", this);
        this.drawCanvas(s, t, a, 285, 175), s.draw();
    },
    drawCanvas: function(e, t, a, s, i) {
        var r = 0, n = 0, l = 0, o = [], g = 8, f = [ t(s), t(i) ], c = t(25), m = [], d = [], u = this.data.summary.firstPage.power;
        for (var h in u) m.length < 8 && m.push(h), d.length < 8 && d.push(u[h]);
        var v = 360 / (g = d.length), w = t(2);
        for (e.setLineWidth(t(2)), e.setStrokeStyle("#32aa72"), e.beginPath(), e.setFontSize(t(26)), 
        e.setFillStyle("#fff"), r = 0; r < 100; r++) for (o[r] = [], l = 0; l < g; l++) {
            e.moveTo(f[0], f[1]);
            var I = c * (r + 1) / 20 * function(e) {
                var t = 1;
                e >= 0 && e < 90 ? t = 1 : e >= 90 && e < 180 ? (t = -1, e = 180 - e) : e >= 180 && e < 270 ? (t = -1, 
                e -= 180) : e >= 270 && e <= 360 && (t = 1, e = 360 - e);
                var a = Math.cos(Math.PI / 180 * e);
                return a < 0 && (a *= -1), a * t;
            }(v * (l + 1) + 0), x = c * (r + 1) / 20 * function(e) {
                var t = 1;
                e >= 0 && e < 90 ? t = 1 : e >= 90 && e < 180 ? (t = 1, e = 180 - e) : e >= 180 && e < 270 ? (t = -1, 
                e -= 180) : e >= 270 && e <= 360 && (t = -1, e = 360 - e);
                var a = Math.sin(Math.PI / 180 * e);
                return a < 0 && (a *= -1), a * t;
            }(v * (l + 1) + 0), T = f[0] + I, S = f[1] + x;
            if (99 == r && (e.lineTo(T, S), m[l])) {
                var p = I >= 0 ? 1 : -1;
                p = T + p * a[l][0];
                var P = x >= 0 ? 1 : -1;
                P = S + P * a[l][1], e.fillText(m[l], p, P);
            }
            o[r][l] = [ T, S ];
        }
        for (n = 0; n < o.length; n++) if (n % 20 == 0 || 99 == n) for (r = 0; r < o[n].length; r++) e.moveTo(o[n][r][0], o[n][r][1]), 
        r < o[n].length - 1 ? e.lineTo(o[n][r + 1][0], o[n][r + 1][1]) : (e.moveTo(o[n][r][0], o[n][r][1]), 
        e.lineTo(o[n][0][0], o[n][0][1]));
        e.stroke(), e.beginPath(), e.setStrokeStyle("rgba(255,234,123,0.4)"), e.setFillStyle("rgba(255,234,123,0.4)");
        var y = !0, b = [];
        for (n = 0; n < g; n++) {
            if (b = f, d[n] > 0) for (r = 0; r < 100; r++) if (d[n] == r + 1) {
                b = o[r][n];
                break;
            }
            y ? (e.moveTo(b[0], b[1]), y = !1) : e.lineTo(b[0], b[1]);
        }
        for (e.fill(), e.stroke(), e.closePath(), n = 0; n < g; n++) {
            if (b = f, d[n] > 0) for (r = 0; r < 100; r++) if (d[n] == r + 1) {
                b = o[r][n];
                break;
            }
            e.beginPath(), e.setStrokeStyle("rgba(61,147,189,0.9)"), e.setFillStyle("rgba(61,147,189,0.9)"), 
            e.closePath(), e.arc(b[0], b[1], w, 0, 2 * Math.PI, !1), e.closePath(), e.fill(), 
            e.stroke();
        }
        e.stroke();
    },
    createNewImg2: function(e) {
        var t = this, a = this, s = wx.createCanvasContext("produceImg2", this);
        s.drawImage("../../images/train/bj.jpg", 0, 0, 375, 667), s.stroke(), s.beginPath(), 
        a.fillRoundRect(s, 12, 40, 350, 585, 10, "rgba(17,15,48,0.6)"), a.roundRectLine(s, 12, 40, 350, 585, 10, 2, "#c0b8ff"), 
        s.beginPath(), s.stroke(), s.beginPath(), a.circleImg(s, "../../images/train/testLogo.jpg", 15, 50, 30), 
        s.stroke(), s.setFontSize(15), s.setFillStyle("#fff"), s.fillText("黑桃大师", 80, 77), 
        s.stroke(), s.setFontSize(10), s.setFillStyle("#fff"), s.fillText(a.data.summary.secondPage.addWord2[0], 80, 97), 
        s.stroke(), s.drawImage("../../images/train/testNameBj.png", 72, 150, 230, 30), 
        s.stroke(), s.setFontSize(17), s.setFillStyle("#fff"), s.setTextAlign("center"), 
        s.fillText(a.data.userName.slice(0, 10), 187, 170), s.setFontSize(16), s.setFillStyle("#ff9c00"), 
        s.setTextAlign("center"), s.fillText("打法风格", 187, 220), s.stroke();
        var i = this.data.summary.secondPage.style, r = 210, n = 228, l = 225, o = 0;
        for (var g in i) r += 45, n += 45, l += 45, o = 120 + 2.18 * i[g].value, s.drawImage("../../images/train/testTitleImg.png", 30, r, 65, 28), 
        s.stroke(), s.setFontSize(12), s.setFillStyle("#fff"), s.setTextAlign("center"), 
        s.fillText(i[g].name, 62, n), s.stroke(), s.drawImage("../../images/train/testResultBj.png", 120, r, 225, 26), 
        s.stroke(), s.setFontSize(12), s.setFillStyle("#fff"), s.fillText(i[g].type[0], 170, n), 
        s.fillText(i[g].type[1], 232, n), s.fillText(i[g].type[2], 295, n), s.stroke(), 
        s.drawImage("../../images/train/testResultIcon.png", o, l, 8, 9), s.stroke();
        s.setFontSize(13), s.setFillStyle("#fff"), s.setTextAlign("left"), s.fillText(a.data.summary.secondPage.addWord3[0], 40, 450), 
        s.stroke(), s.setFontSize(12), s.setFillStyle("#fff"), s.setTextAlign("left"), s.fillText(a.data.summary.secondPage.addWord3[1], 40, 470), 
        s.fillText(a.data.summary.secondPage.addWord3[2], 40, 490), s.stroke(), s.drawImage(a.data.serverImg.ewm2, 90, 520, 80, 80), 
        s.stroke(), s.setFontSize(14), s.setFillStyle("#fff"), s.setTextAlign("left"), s.fillText("快扫码测试", 190, 550), 
        s.fillText("看看你能得几分", 190, 580), s.stroke(), s.draw(), setTimeout(function() {
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
    changeCurrent: function(e) {
        console.log(e.detail.current), 0 == e.detail.current ? this.setData({
            canvas: !0
        }) : this.setData({
            canvas: !1
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: this.data.shareTitle,
            imageUrl: "",
            path: getApp().globalData.sharePath
        };
    }
});