/*
 * Live2D Widget
 * https://github.com/stevenjoezhang/live2d-widget
 */

/*function getScore() {
	new Promise(function (resolve, reject) {
		var url = location.href;
		location.assign('http://bkjw.whu.edu.cn/servlet/Svlt_QueryStuScore?year=0&term=&learnType=&scoreFlag=0');
		resolve(url);
	}).then($(function (url) {
		var
			tr = $('tr'),
			str,
			list = [],
			re = /<!-- 成绩 -->([\s\S]*?)<td>([\s\S]*?)<\/td>/;
		if (!tr) {
			return;
		}
		for (i = 1; i < tr.length; i++) {
			str = re.exec(tr[i].innerHTML);
			if (str && str[2]) {
				list.push(parseFloat(str[2]));
			}
		}
		alert(list);
		console.log(url);
	}));
	//return list;
}*/

function analysePointfromScore(score) {
	if (score >= 90.0) {
		return 4.0;
	} else if (score >= 85.0) {
		return 3.7;
	} else if (score >= 82.0) {
		return 3.3;
	} else if (score >= 78.0) {
		return 3.0;
	} else if (score >= 75.0) {
		return 2.7;
	} else if (score >= 72.0) {
		return 2.3;
	} else if (score >= 68.0) {
		return 2.0;
	} else if (score >= 64.0) {
		return 1.5;
	} else if (score >= 60.0) {
		return 1.0;
	} else {
		return 0.0;
	}
}

async function getGPA(list) {
	var GPA = 4.0;
	await $.ajax('/servlet/Svlt_QueryStuScore?year=0&term=&learnType=&scoreFlag=0').done(function (data) {
		var
			re = /<tr null>([\s\S]*?)<\/tr>/g,
			str,
			dic = {'公共基础必修': 0, '公共基础选修': 1, '通识教育必修': 2, '通识教育选修': 3, '专业教育必修': 4, '专业教育选修': 5, '公共必修': 6, '公共选修': 7, '专业必修': 8, '专业选修': 9},
			re_score = /<!-- 成绩 -->([\s\S]*?)<td>([\s\S]*?)<\/td>/,
			re_credit = /<!-- 学分 -->([\s\S]*?)<td>([\s\S]*?)<\/td>/,
			re_type = /<span([\s\S]*?)">([\s\S]*?)<\/span>/,
			str_s,
			point,
			credit,
			type,
			total_point = 0.0,
			total_credit = 0.0;
		while (true) {
			str = re.exec(data);
			if (!str) {
				break;
			} else {
				type = re_type.exec(str);
				if (!type || !type[2]) {
					continue;
				} else if (!list[dic[type[2]]]) {
					continue;
				}
				str_s = re_score.exec(str);
				if (!str_s || !str_s[2]) {
					continue;
				} else {
					point = analysePointfromScore(parseFloat(str_s[2]));
				}
				str_s = re_credit.exec(str);
				if (!str_s || !str_s[2]) {
					continue;
				} else {
					credit = parseFloat(str_s[2]);
				}
				total_point += point * credit;
				total_credit += credit;
			}
		}
		GPA = total_point / total_credit;
    }).fail(function (xhr, status) {
		
    }).always(function () {
		
	});
	return GPA;
}

function getConfig() {
	$('head').append('<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/saayuuk1/live2d-widget@0.9.2/styles.css">');
	$('#top').append('<form class="iconColor">\
		<input id="color-input-orange-0" class="chat-button-location-radio-input" type="checkbox" name="color-input-orange"\
			value="#ea9836" checked="true"/>\
		<label for="color-input-orange-0" style="position:absolute;left:600px;top:20px">公共基础必修</label>\
		<input id="color-input-orange-1" class="chat-button-location-radio-input" type="checkbox" name="color-input-orange"\
			value="#ea9836" checked="true"/>\
		<label for="color-input-orange-1" style="position:absolute;left:600px;top:70px">公共基础选修</label>\
		<input id="color-input-orange-2" class="chat-button-location-radio-input" type="checkbox" name="color-input-orange"\
			value="#ea9836" checked="true"/>\
		<label for="color-input-orange-2" style="position:absolute;left:720px;top:20px">通识教育必修</label>\
		<input id="color-input-orange-3" class="chat-button-location-radio-input" type="checkbox" name="color-input-orange"\
			value="#ea9836" checked="true"/>\
		<label for="color-input-orange-3" style="position:absolute;left:720px;top:70px">通识教育选修</label>\
		<input id="color-input-orange-4" class="chat-button-location-radio-input" type="checkbox" name="color-input-orange"\
			value="#ea9836" checked="true"/>\
		<label for="color-input-orange-4" style="position:absolute;left:840px;top:20px">专业教育必修</label>\
		<input id="color-input-orange-5" class="chat-button-location-radio-input" type="checkbox" name="color-input-orange"\
			value="#ea9836" checked="true"/>\
		<label for="color-input-orange-5" style="position:absolute;left:840px;top:70px">专业教育选修</label>\
		<input id="color-input-orange-6" class="chat-button-location-radio-input" type="checkbox" name="color-input-orange"\
			value="#ea9836" checked="true"/>\
		<label for="color-input-orange-6" style="position:absolute;left:960px;top:20px">公共必修</label>\
		<input id="color-input-orange-7" class="chat-button-location-radio-input" type="checkbox" name="color-input-orange"\
			value="#ea9836" checked="true"/>\
		<label for="color-input-orange-7" style="position:absolute;left:960px;top:70px">公共选修</label>\
		<input id="color-input-orange-8" class="chat-button-location-radio-input" type="checkbox" name="color-input-orange"\
			value="#ea9836" checked="true"/>\
		<label for="color-input-orange-8" style="position:absolute;left:1050px;top:20px">专业必修</label>\
		<input id="color-input-orange-9" class="chat-button-location-radio-input" type="checkbox" name="color-input-orange"\
			value="#ea9836" checked="true"/>\
		<label for="color-input-orange-9" style="position:absolute;left:1050px;top:70px">专业选修</label>\
		<input type="button" id="selectAll" value="全不选" style="position:absolute;left:1140px;top:20px;text-align:justify;"/>\
		<input type="button" id="orange-submit" value="确认" style="padding-left:15px;position:absolute;left:1140px;top:70px;text-align:justify;"/>\
		<style>\
			input{\
				font-size:12px;\
				width:55px;\
				height:20px;\
				border-radius:4px;\
				border:1px solid #c8cccf;\
				color:#986655;\
				outline:0;\
				text-align:left;\
				padding-left: 10px;\
				display:block;\
				cursor: pointer;\
				box-shadow: 2px 2px 5px 1px #ccc;z-index: 1;\
				}\
			input::-webkit-input-placeholder{\
				color:#986655;\
				font-size: 12px;\
			}\
		</style>\
	</form>');
	var
		form = $('.iconColor'),
		orange = form.find('[name=color-input-orange]'),
		selectall = form.find('#selectAll'),
		submit = form.find('#orange-submit');
	orange.click(function () {
		if (orange.get().every(e=>e.checked)) {
			selectall[0].value = '全不选';
			selectall.css('width', '55px');
		} else {
			selectall[0].value = '全选';
			selectall.css('width', '45px');
		}
	});
	selectall.click(function () {
		if (selectall[0].value === '全选') {
			orange.prop('checked', true);
			selectall[0].value = '全不选';
			selectall.css('width', '55px');
		} else if (selectall[0].value === '全不选') {
			orange.prop('checked', false);
			selectall[0].value = '全选';
			selectall.css('width', '45px');
		}
	});
}

function beautifyIndex(url, opacity) {
	//背景图片URL
	url = 'url(' + url + ')';
	//关闭二维码页面
	$('.keifu_close').click();
	//设置背景图片
	var
		width = $('#container').css('width'),
		height = $('#main_contaier').css('height');
	$('#footer').css('height', '0px');
	$('#main_contaier').css('width', width);
	$('#container').css('height', height);
    $('#main_contaier').css('height', '880px');
	$('#main_contaier').css('background-image', url);
	//设置框架透明度
    $('#page_iframe').css('opacity', opacity);
	$('#bar_iframe').css('opacity', opacity);
	//将选项置于框架前
	$('#btn1').css('z-index', '1');
	$('#btn2').css('z-index', '1');
	$('#btn3').css('z-index', '1');
	$('#btn5').css('z-index', '1');
	$('#btn9').css('z-index', '1');
}

/*$(function beautifySubmit() {
	$('#background-submit').click(function () {
		var url = $('#background-url');
		var opacity = $('#background-opacity');
		beautifyIndex(url[0].value || 'https://pic4.zhimg.com/v2-d6a6db9d5db45618fb67536920c50c10_r.jpg', opacity[0].value || '0.8');
		$('#background-config').remove();
	});
});*/

function beautifyConfig() {
	//自定义界面设置
	$('#top').append('<form id="background-config">\
	<input type="text" id="background-url" placeholder="请输入图片链接" style="position:absolute;left:600px;top:100px"/>\
	<input type="text" id="background-opacity" placeholder="请输入透明度(0~1)" style="position:absolute;left:800px;top:100px"/>\
	<input type="button" id="background-submit" value="确认" style="width:45px;position:absolute;left:1000px;top:102px;text-align:justify;"/>\
		<style>\
			input{\
				font-size:12px;\
				height:30px;\
				border-radius:4px;\
				border:1px solid #c8cccf;\
				color:#986655;\
				outline:0;\
				text-align:left;\
				padding-left: 10px;\
				display:block;\
				cursor: pointer;\
				box-shadow: 2px 2px 5px 1px #ccc;z-index: 1;\
				}\
			input::-webkit-input-placeholder{\
				color:#986655;\
				font-size: 12px;\
			}\
		</style>');
	$('#background-submit').click(function () {
		var url = $('#background-url');
		var opacity = $('#background-opacity');
		beautifyIndex(url[0].value || 'https://pic4.zhimg.com/v2-d6a6db9d5db45618fb67536920c50c10_r.jpg', opacity[0].value || '0.8');
		$('#background-config').remove();
	});
}

function beautify() {
	//beautifyIndex();
	beautifyConfig();
}

function loadWidget(config) {
	let { waifuPath, apiPath, cdnPath } = config;
	let useCDN = false, modelList;
	if (typeof cdnPath === "string") {
		useCDN = true;
		if (!cdnPath.endsWith("/")) cdnPath += "/";
	} else if (typeof apiPath === "string") {
		if (!apiPath.endsWith("/")) apiPath += "/";
	} else {
		console.error("Invalid initWidget argument!");
		return;
	}
	localStorage.removeItem("waifu-display");
	sessionStorage.removeItem("waifu-text");
	document.body.insertAdjacentHTML("beforeend", `<div id="waifu">
			<div id="waifu-tips"></div>
			<canvas id="live2d" width="800" height="800"></canvas>
			<div id="waifu-tool">
				<span class="fa fa-lg fa-comment"></span>
				<span class="fa fa-lg fa-paper-plane"></span>
				<span class="fa fa-lg fa-user-circle"></span>
				<span class="fa fa-lg fa-street-view"></span>
				<span class="fa fa-lg fa-camera-retro"></span>
				<span class="fa fa-lg fa-info-circle"></span>
				<span class="fa fa-lg fa-times"></span>
			</div>
		</div>`);
	// https://stackoverflow.com/questions/24148403/trigger-css-transition-on-appended-element
	setTimeout(() => {
		document.getElementById("waifu").style.bottom = 0;
	}, 0);

	function randomSelection(obj) {
		return Array.isArray(obj) ? obj[Math.floor(Math.random() * obj.length)] : obj;
	}
	// 检测用户活动状态，并在空闲时显示消息
	let userAction = false,
		userActionTimer,
		messageTimer,
		messageArray = ["好久不见，日子过得好快呢……", "大坏蛋！你都多久没理人家了呀，嘤嘤嘤～", "嗨～快来逗我玩吧！", "拿小拳拳锤你胸口！", "记得把小家加入 Adblock 白名单哦！"];
	window.addEventListener("mousemove", () => userAction = true);
	window.addEventListener("keydown", () => userAction = true);
	setInterval(() => {
		if (userAction) {
			userAction = false;
			clearInterval(userActionTimer);
			userActionTimer = null;
		} else if (!userActionTimer) {
			userActionTimer = setInterval(() => {
				showMessage(randomSelection(messageArray), 6000, 9);
			}, 20000);
		}
	}, 1000);

	(function registerEventListener() {
		document.querySelector("#waifu-tool .fa-comment").addEventListener("click",  () => {
			open('https://bkxk.whu.edu.cn/xtgl/login_slogin.html');
		});
		document.querySelector("#waifu-tool .fa-paper-plane").addEventListener("click", () => {
			/*if (window.Asteroids) {
				if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = [];
				window.ASTEROIDSPLAYERS.push(new Asteroids());
			} else {
				const script = document.createElement("script");
				script.src = "https://cdn.jsdelivr.net/gh/stevenjoezhang/asteroids/asteroids.js";
				document.head.appendChild(script);
			}*/
			getConfig();
			var
				form = $('.iconColor'),
				orange = form.find('[name=color-input-orange]'),
				submit = form.find('#orange-submit');
			submit.click(function () {
				var list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				orange.get().map(function (value, index) {
					if (value.checked) {
						list[index] = 1;
					}
				});
				new Promise(function (resolve, reject) {
					let GPA;
					GPA = getGPA(list);
					resolve(GPA);
				}).then(function (GPA) {
					let text = `GPA:` + GPA.toFixed(2);
					showMessage(text, 7000, 8);
				});
				form.remove();
			});
		});
		document.querySelector("#waifu-tool .fa-user-circle").addEventListener("click", loadOtherModel);
		document.querySelector("#waifu-tool .fa-street-view").addEventListener("click", () => {
			beautify();
		});
		document.querySelector("#waifu-tool .fa-camera-retro").addEventListener("click", () => {
			showMessage("照好了嘛，是不是很可爱呢？", 6000, 9);
			Live2D.captureName = "photo.png";
			Live2D.captureFrame = true;
		});
		document.querySelector("#waifu-tool .fa-info-circle").addEventListener("click", () => {
			open("https://github.com/stevenjoezhang/live2d-widget");
		});
		document.querySelector("#waifu-tool .fa-times").addEventListener("click", () => {
			localStorage.setItem("waifu-display", Date.now());
			showMessage("愿你有一天能与重要的人重逢。", 2000, 11);
			document.getElementById("waifu").style.bottom = "-500px";
			setTimeout(() => {
				document.getElementById("waifu").style.display = "none";
				document.getElementById("waifu-toggle").classList.add("waifu-toggle-active");
			}, 3000);
		});
		const devtools = () => {};
		console.log("%c", devtools);
		devtools.toString = () => {
			showMessage("哈哈，你打开了控制台，是想要看看我的小秘密吗？", 6000, 9);
		};
		window.addEventListener("copy", () => {
			showMessage("你都复制了些什么呀，转载要记得加上出处哦！", 6000, 9);
		});
		window.addEventListener("visibilitychange", () => {
			if (!document.hidden) showMessage("哇，你终于回来了～", 6000, 9);
		});
	})();

	(function welcomeMessage() {
		let text;
		if (location.pathname === "/") { // 如果是主页
			const now = new Date().getHours();
			if (now > 5 && now <= 7) text = "早上好！一日之计在于晨，美好的一天就要开始了。";
			else if (now > 7 && now <= 11) text = "上午好！工作顺利嘛，不要久坐，多起来走动走动哦！";
			else if (now > 11 && now <= 13) text = "中午了，工作了一个上午，现在是午餐时间！";
			else if (now > 13 && now <= 17) text = "午后很容易犯困呢，今天的运动目标完成了吗？";
			else if (now > 17 && now <= 19) text = "傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红～";
			else if (now > 19 && now <= 21) text = "晚上好，今天过得怎么样？";
			else if (now > 21 && now <= 23) text = ["已经这么晚了呀，早点休息吧，晚安～", "深夜时要爱护眼睛呀！"];
			else text = "你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？";
		} else if (document.referrer !== "") {
			const referrer = new URL(document.referrer),
				domain = referrer.hostname.split(".")[1];
			if (location.hostname === referrer.hostname) text = `欢迎阅读<span>「${document.title.split(" - ")[0]}」</span>`;
			else if (domain === "baidu") text = `Hello！来自 百度搜索 的朋友<br>你是搜索 <span>${referrer.search.split("&wd=")[1].split("&")[0]}</span> 找到的我吗？`;
			else if (domain === "so") text = `Hello！来自 360搜索 的朋友<br>你是搜索 <span>${referrer.search.split("&q=")[1].split("&")[0]}</span> 找到的我吗？`;
			else if (domain === "google") text = `Hello！来自 谷歌搜索 的朋友<br>欢迎阅读<span>「${document.title.split(" - ")[0]}」</span>`;
			else text = `Hello！来自 <span>${referrer.hostname}</span> 的朋友`;
		} else {
			text = `欢迎阅读<span>「${document.title.split(" - ")[0]}」</span>`;
		}
		showMessage(text, 7000, 8);
	})();

	/*function showHitokoto() {
		// 增加 hitokoto.cn 的 API
		fetch("https://v1.hitokoto.cn")
			.then(response => response.json())
			.then(result => {
				const text = `这句一言来自 <span>「${result.from}」</span>，是 <span>${result.creator}</span> 在 hitokoto.cn 投稿的。`;
				showMessage(result.hitokoto, 6000, 9);
				setTimeout(() => {
					showMessage(text, 4000, 9);
				}, 6000);
			});
	}*/

	function showMessage(text, timeout, priority) {
		if (!text || (sessionStorage.getItem("waifu-text") && sessionStorage.getItem("waifu-text") > priority)) return;
		if (messageTimer) {
			clearTimeout(messageTimer);
			messageTimer = null;
		}
		text = randomSelection(text);
		sessionStorage.setItem("waifu-text", priority);
		const tips = document.getElementById("waifu-tips");
		tips.innerHTML = text;
		tips.classList.add("waifu-tips-active");
		messageTimer = setTimeout(() => {
			sessionStorage.removeItem("waifu-text");
			tips.classList.remove("waifu-tips-active");
		}, timeout);
	}

	(function initModel() {
		let modelId = localStorage.getItem("modelId"),
			modelTexturesId = localStorage.getItem("modelTexturesId");
		if (modelId === null) {
			// 首次访问加载 指定模型 的 指定材质
			modelId = 1; // 模型 ID
			modelTexturesId = 53; // 材质 ID
		}
		loadModel(modelId, modelTexturesId);
		fetch(waifuPath)
			.then(response => response.json())
			.then(result => {
				window.addEventListener("mouseover", event => {
					for (let { selector, text } of result.mouseover) {
						if (!event.target.matches(selector)) continue;
						text = randomSelection(text);
						text = text.replace("{text}", event.target.innerText);
						showMessage(text, 4000, 8);
						return;
					}
				});
				window.addEventListener("click", event => {
					for (let { selector, text } of result.click) {
						if (!event.target.matches(selector)) continue;
						text = randomSelection(text);
						text = text.replace("{text}", event.target.innerText);
						showMessage(text, 4000, 8);
						return;
					}
				});
				result.seasons.forEach(({ date, text }) => {
					const now = new Date(),
						after = date.split("-")[0],
						before = date.split("-")[1] || after;
					if ((after.split("/")[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split("/")[0]) && (after.split("/")[1] <= now.getDate() && now.getDate() <= before.split("/")[1])) {
						text = randomSelection(text);
						text = text.replace("{year}", now.getFullYear());
						//showMessage(text, 7000, true);
						messageArray.push(text);
					}
				});
			});
	})();

	async function loadModelList() {
		const response = await fetch(`${cdnPath}model_list.json`);
		modelList = await response.json();
	}

	async function loadModel(modelId, modelTexturesId, message) {
		localStorage.setItem("modelId", modelId);
		localStorage.setItem("modelTexturesId", modelTexturesId);
		showMessage(message, 4000, 10);
		if (useCDN) {
			if (!modelList) await loadModelList();
			const target = randomSelection(modelList.models[modelId]);
			loadlive2d("live2d", `${cdnPath}model/${target}/index.json`);
		} else {
			loadlive2d("live2d", `${apiPath}get/?id=${modelId}-${modelTexturesId}`);
			console.log(`Live2D 模型 ${modelId}-${modelTexturesId} 加载完成`);
		}
	}

	async function loadRandModel() {
		const modelId = localStorage.getItem("modelId"),
			modelTexturesId = localStorage.getItem("modelTexturesId");
		if (useCDN) {
			if (!modelList) await loadModelList();
			const target = randomSelection(modelList.models[modelId]);
			loadlive2d("live2d", `${cdnPath}model/${target}/index.json`);
			showMessage("我的新衣服好看嘛？", 4000, 10);
		} else {
			// 可选 "rand"(随机), "switch"(顺序)
			fetch(`${apiPath}rand_textures/?id=${modelId}-${modelTexturesId}`)
				.then(response => response.json())
				.then(result => {
					if (result.textures.id === 1 && (modelTexturesId === 1 || modelTexturesId === 0)) showMessage("我还没有其他衣服呢！", 4000, 10);
					else loadModel(modelId, result.textures.id, "我的新衣服好看嘛？");
				});
		}
	}

	async function loadOtherModel() {
		let modelId = localStorage.getItem("modelId");
		if (useCDN) {
			if (!modelList) await loadModelList();
			const index = (++modelId >= modelList.models.length) ? 0 : modelId;
			loadModel(index, 0, modelList.messages[index]);
		} else {
			fetch(`${apiPath}switch/?id=${modelId}`)
				.then(response => response.json())
				.then(result => {
					loadModel(result.model.id, 0, result.model.message);
				});
		}
	}
}

function initWidget(config, apiPath) {
	if (typeof config === "string") {
		config = {
			waifuPath: config,
			apiPath
		};
	}
	document.body.insertAdjacentHTML("beforeend", `<div id="waifu-toggle">
			<span>看板娘</span>
		</div>`);
	const toggle = document.getElementById("waifu-toggle");
	toggle.addEventListener("click", () => {
		toggle.classList.remove("waifu-toggle-active");
		if (toggle.getAttribute("first-time")) {
			loadWidget(config);
			toggle.removeAttribute("first-time");
		} else {
			localStorage.removeItem("waifu-display");
			document.getElementById("waifu").style.display = "";
			setTimeout(() => {
				document.getElementById("waifu").style.bottom = 0;
			}, 0);
		}
	});
	if (localStorage.getItem("waifu-display") && Date.now() - localStorage.getItem("waifu-display") <= 86400000) {
		toggle.setAttribute("first-time", true);
		setTimeout(() => {
			toggle.classList.add("waifu-toggle-active");
		}, 0);
	} else {
		loadWidget(config);
	}
}
