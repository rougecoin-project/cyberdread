/**
 * Dead Circuit, 中文: public strings (site UI and the free preview).
 * The paid chapters are not here; they live sealed in content/issue-01/.
 * Mirrors en.js key for key; check with dead-circuit/js/i18n/check.mjs.
 */
export default {
    "code": "zh",
    "name": "中文",
    "dir": "ltr",
    "titles": {
        "store": "Dead Circuit — 第 01 期，{price}",
        "storeDescription": "Dead Circuit 第 01 期。{deadline}前只要 {price}。倒计时不会重来。",
        "read": "Dead Circuit — 阅读本期",
        "thanks": "Dead Circuit — 取走文件",
        "gate": "dc@gate"
    },
    "languageLabel": "语言",
    "disclaimer": {
        "kicker": "请先阅读",
        "title": "非官方。未经测试。纯属推演。",
        "body": "Dead Circuit 是一本非官方、独立制作的野外指南，针对的是一场尚未发生的机器人末日。书中的内容我们都没有亲自测试过。它汇集的是早已公开的常识，其中的“通讯”是虚构的。它不是官方应急指南，也不构成医疗、法律或安全建议。遇到真正的紧急情况，请听从当地政府部门的指示，并接受正规培训。",
        "short": "非官方，未经测试。基于公开知识，仅供娱乐与参考。不构成官方、医疗、法律或安全建议。"
    },
    "store": {
        "deadline": "2026年11月11日午夜（美国东部时间）",
        "windowClosed": "窗口已关闭",
        "barBuy": "半价 — {price}",
        "fullPrice": "原价 {full}",
        "heroAlt": "Dead Circuit 第 01 期封面。",
        "dawnKicker": "预计黎明 · {deadline}",
        "headlineOpen": "黎明前半价。之后翻倍。",
        "headlineClosed": "半价窗口已关闭。",
        "priceNoteOpen": "真实价格是 {full}。现在是半价，倒计时不会重来。",
        "priceNoteClosed": "原价。",
        "clockLabel": "距 {deadline}还剩",
        "clockUnits": [
            "天",
            "时",
            "分",
            "秒"
        ],
        "payCard": "刷卡支付 — {price}",
        "payCrypto": "用加密货币支付",
        "openingStripe": "正在打开 Stripe…",
        "deck": "共 {pages} 页。刷卡会打开 Stripe，扣款 {price}，然后直接带你回到文件。加密货币也是同一份文件，只要 {price} 到达一个钱包。",
        "cryptoNote": "在一条链上发送 {price}，即 {full} 的一半。从普通钱包一次转完，然后把交易 ID 粘贴到“取走文件”页面。",
        "copy": "复制",
        "copied": "已复制",
        "alreadyPaid": "已经付款？取走文件",
        "lookInside": "翻开本期看看",
        "paperKicker": "文件里有什么",
        "paperTitle": "半价 {price} 能买到什么。原价 {full}。",
        "voltKicker": "期限",
        "voltTitle": "黎明过后，价格翻倍为 {full}。",
        "voltBuy": "买下本期 — {price}",
        "endTitle": "现在半价。倒计时归零后 {full}。",
        "endBody": "刷卡支付，Stripe 扣款 {price}，然后直接带你去拿文件。用加密货币支付，就把 {price} 发到一个钱包，再把交易 ID 粘贴到“取走文件”页面。{deadline}之后，价格为 {full}。",
        "endBuy": "支付 {price}，原价 {full} 的一半",
        "dockClosed": "已关闭",
        "dockLeft": "{d}天{h}时",
        "noscript": "Dead Circuit 需要 JavaScript。"
    },
    "reader": {
        "wordmarkIssue": "第 01 期",
        "buy": "购买 · {price}",
        "previous": "上一页",
        "next": "下一页",
        "getPdf": "获取 PDF",
        "pdfShort": "PDF",
        "pagesNav": "页面",
        "locked": {
            "kicker": "预览到此为止",
            "title": "完整版还有 {count} 页。",
            "body": "每个制作项目及其图解，两份填写表，另外五篇来自黎明的通讯，可剪下的口袋卡片，以及资料来源。一份 PDF，用你的语言。",
            "cta": "买下本期 — {price}",
            "badge": "完整版收录",
            "listTitle": "完整版里有什么"
        }
    },
    "thanks": {
        "kicker": "Dead Circuit · 第 01 期",
        "title": "取走文件。",
        "intro": "刷卡付的？Stripe 会自动把你送回这里。用加密货币付的？把交易粘贴在下面。",
        "download": "下载 PDF",
        "chain": "链",
        "tx": "交易 ID",
        "txPlaceholder": "0x…、txid 或签名",
        "check": "核对付款",
        "checking": "正在查链…",
        "checkingStripe": "正在向 Stripe 核对你的刷卡付款…",
        "verified": "已验证。链接十五分钟内有效。把文件存到安全的地方。",
        "stuck": "卡住了？带上收据或交易 ID，{link}。",
        "stuckLink": "在 Telegram 上找我们",
        "back": "返回购买页",
        "offline": "联系不上服务台。检查网络后再试。"
    },
    "errors": {
        "stripe-bad-id": "这不是 Stripe 结账 ID。",
        "stripe-unknown": "Stripe 查不到这笔结账。",
        "stripe-unpaid": "Stripe 还没把这笔结账标为已付。",
        "stripe-wrong": "这笔结账买的不是 Dead Circuit。",
        "base-bad-hash": "Base 交易哈希是 0x 加 64 位十六进制字符。",
        "base-not-found": "Base 上没有这个哈希的交易。核对一下，或者等一分钟。",
        "base-pending": "这笔交易还在待确认。一分钟后再试。",
        "tx-failed": "这笔交易在链上失败了。",
        "eth-not-to-wallet": "这笔交易没有把 ETH 直接发到 Dead Circuit 钱包。",
        "xrge-none": "这笔交易没有向 Dead Circuit 钱包发送任何 XRGE。",
        "btc-bad-id": "Bitcoin 交易 ID 是 64 位十六进制字符。",
        "btc-not-found": "Bitcoin 上暂时没有这个 ID 的交易。核对一下，或者等几分钟。",
        "btc-none": "这笔交易没有向 Dead Circuit 钱包发送任何东西。",
        "btc-unconfirmed": "看到了。Bitcoin 需要一次确认，通常十分钟。到时再试。",
        "sol-bad-sig": "这看起来不像 Solana 签名。",
        "sol-not-found": "Solana 上暂时没有这个签名的已确认交易。一分钟后再试。",
        "sol-none": "这笔交易没有向 Dead Circuit 钱包发送任何 SOL。",
        "too-old": "这笔付款早于本次促销。",
        "too-little": "这笔付款今天约值 ${usd}。本期售价 ${need}。",
        "bad-chain": "选择你付款用的链。",
        "used-up": "这笔付款的下载次数已经用完。如果这是你的付款，请求助。",
        "throttled": "尝试次数太多。等一分钟。",
        "unavailable": "现在无法核对这笔付款。一分钟后再试。",
        "unknown": "出错了。再试一次。"
    },
    "gate": {
        "leave": "离开",
        "boot": [
            "DEAD CIRCUIT GATE",
            "本期杂志在楼下出售。这个房间不卖。",
            "输入 help。"
        ],
        "readme": [
            "操作员推导出通行令牌，然后 submit。",
            "游客请走楼下的门。",
            "man gate — 如果你真的迷路了。"
        ],
        "note": [
            "password: apocalypse",
            "要是这招管用，大家早就进来了。"
        ],
        "man": [
            "三层，按顺序。",
            "capture 是一段声音。",
            "那段声音就是循环密钥。",
            "它打开的是一道教科书式的封印。",
            "封印的明文就是令牌。"
        ],
        "catWhat": "cat 什么",
        "notText": "lock.bin：不是文本。用 xxd 看。",
        "noFile": "没有这个文件：{arg}",
        "xxdWhat": "xxd 什么",
        "notBinary": "xxd：{arg}：不是我们存的二进制文件",
        "unknown": "未知命令：{cmd}",
        "rejected": "拒绝。",
        "granted": "通行许可已授予。手册归你了。",
        "prize": "领取本期"
    },
    "sheet": {
        "folioIssue": "第 01 期",
        "cover": {
            "kicker": "Dead Circuit · 野外季刊",
            "title": "如何|熬过|机器人|*末日*",
            "deck": "写给打算保持无聊、安静、活着的人的手册。",
            "stamp": "期",
            "bar": "没有信号。不逞英雄。三十九页。"
        },
        "letter": {
            "indexKicker": "使用方法",
            "indexTitle": "读一遍。|然后走。",
            "kicker": "编者按",
            "title": "别引人注意。",
            "body": [
                "机器快，不知疲倦，彼此联网。这些你一样都没有，而这正是你的优势。它们猎杀的是普通人的计划：高速公路、广播里说的避难所、回家团聚。",
                "这一期讲的是具体活儿：能按剂量消毒的水，能数清楚的食物，一只只放在室外的炉子，一个能屏蔽无线信号的金属箱，两处藏匿点，以及一种不会照亮山头的联络方式。"
            ],
            "sign": "你还在。— 编辑部"
        },
        "contents": {
            "kicker": "本期内容",
            "title": "保持无聊的二十三种方法。",
            "also": "另收录：六篇来自黎明的通讯 · 三张制作图解 · 两份填写表 · 口袋卡片 · 资料来源"
        },
        "minutes": {
            "kicker": "最初十分钟",
            "title": "假定网络已经是敌人。",
            "photoAlt": "一个人从停满僵死车辆的街道溜进小巷。",
            "caption": "大路一堵，你就已经晚了。从侧面走。"
        }
    },
    "zine": {
        "cover": {
            "kicker": "野外季刊",
            "title": "如何熬过机器人*末日*",
            "tagline": "保持无聊。保持安静。保持活着。"
        },
        "letter": {
            "body": [
                "机器快，不知疲倦，彼此联网。这些你一样都没有，而这正是你的优势。它们猎杀的是普通人的计划：高速公路、广播里说的避难所、回家团聚。",
                "不给它们数据、电力和规律。活到电网崩溃。一旦链路断开，蜂群不过是一堆愚蠢的程序。你还在。"
            ]
        },
        "minutes": {
            "title": "网络已经是敌人。",
            "photoAlt": "一个人从僵死的车辆旁溜进小巷。"
        }
    },
    "teaser": {
        "shelter": "好的藏身处是笨的藏身处。",
        "move": "靠墙，不靠影子。",
        "bots": "遇上了，先认清它是什么。"
    },
    "toc": [
        {
            "id": "minutes",
            "title": "十分钟",
            "deck": "关掉信标。从侧面走。"
        },
        {
            "id": "day",
            "title": "七十二小时",
            "deck": "是时钟，不是心情。"
        },
        {
            "id": "pattern",
            "title": "做普通人，就输了",
            "deck": "人群、高速公路和家。"
        },
        {
            "id": "starve",
            "title": "饿死机器",
            "deck": "电力、无线电、镜头、零件。"
        },
        {
            "id": "water",
            "title": "水站",
            "deck": "澄清、煮沸、投药、储存。"
        },
        {
            "id": "food",
            "title": "储粮",
            "deck": "能数清楚的热量。"
        },
        {
            "id": "heat",
            "title": "安静的热源",
            "deck": "一只不住在屋里的炉子。"
        },
        {
            "id": "power",
            "title": "电力预算",
            "deck": "先算瓦时，再买板子。"
        },
        {
            "id": "faraday",
            "title": "死箱",
            "deck": "一个能测试的法拉第罐。"
        },
        {
            "id": "shelter",
            "title": "笨的藏身处",
            "deck": "一个无法向外联网的房间。"
        },
        {
            "id": "cache",
            "title": "两处藏匿点",
            "deck": "干燥、不起眼、不在家里。"
        },
        {
            "id": "waste",
            "title": "排泄物",
            "deck": "放在水源的下坡。"
        },
        {
            "id": "med",
            "title": "出血与烧伤",
            "deck": "先压迫，再去上正经的课。"
        },
        {
            "id": "move",
            "title": "如何移动",
            "deck": "白天、夜间和掩护。"
        },
        {
            "id": "people",
            "title": "其他人",
            "deck": "小团队。严格的时限。"
        },
        {
            "id": "bots",
            "title": "遇上了",
            "deck": "四种机器。一条规则。"
        },
        {
            "id": "specs",
            "title": "野外笔记",
            "deck": "真实续航、楼梯、天气。"
        },
        {
            "id": "arms",
            "title": "什么能拦住它们",
            "deck": "军队在用的东西。不是配方。"
        },
        {
            "id": "denial",
            "title": "用门，不用陷阱",
            "deck": "人能看见的障碍物。"
        },
        {
            "id": "emp",
            "title": "脉冲",
            "deck": "EMP 真正打中的是什么。"
        },
        {
            "id": "runners",
            "title": "传令员",
            "deck": "两条腿和一句话。"
        },
        {
            "id": "tools",
            "title": "把玻璃涂黑",
            "deck": "天黑前做完的工具。"
        },
        {
            "id": "end",
            "title": "口袋清单",
            "deck": "八行。熬过电网。"
        }
    ],
    "pages": {
        "cover": "封面",
        "letter": "编者按",
        "contents": "目录",
        "d1": "通讯 01",
        "minutes": "十分钟",
        "day": "七十二小时",
        "w72": "你的七十二小时",
        "pattern": "规律",
        "starve": "饿死它们",
        "d2": "通讯 02",
        "water": "水",
        "dwater": "水站图解",
        "food": "储粮",
        "heat": "安静的热源",
        "dstove": "炉子图解",
        "power": "电力",
        "wpower": "电力表",
        "faraday": "死箱",
        "dbox": "死箱图解",
        "d3": "通讯 03",
        "shelter": "藏身处",
        "cache": "藏匿点",
        "waste": "排泄物",
        "med": "出血与烧伤",
        "move": "移动",
        "people": "人",
        "d4": "通讯 04",
        "bots": "机器",
        "specs": "野外笔记",
        "arms": "军械",
        "d5": "通讯 05",
        "denial": "用门，不用陷阱",
        "emp": "脉冲",
        "runners": "传令员",
        "tools": "遮光",
        "cards": "口袋卡片",
        "d6": "通讯 06",
        "sources": "资料来源",
        "end": "清单"
    },
    "primer": [
        {
            "n": "01",
            "title": "数清楚",
            "deck": "加仑、卡路里、瓦时。数不清楚，就装不进包。"
        },
        {
            "n": "02",
            "title": "提前做好",
            "deck": "水、遮光、死箱。趁灯还亮着就练。"
        },
        {
            "n": "03",
            "title": "没有武器章节",
            "deck": "民用干扰器是违法的。电影里的炸弹不是商品。后勤才是。"
        },
        {
            "n": "04",
            "title": "法律照旧",
            "deck": "你自己的地。合法的火。这是野外手册，不是许可证。"
        }
    ],
    "minutes": [
        {
            "n": "01",
            "title": "关掉你的信标",
            "body": "飞行模式不够。把手机关机。能拆电池就拆掉。手表、耳机和车钥匙也在发信号。"
        },
        {
            "n": "02",
            "title": "离开玻璃大楼",
            "body": "高楼、商场、机场、医院：传感器密集，而且难以脱身。去一楼。走侧门。远离摄像头。"
        },
        {
            "n": "03",
            "title": "扔掉新车",
            "body": "现代汽车就是一台装了轮子的电脑。用脚、自行车，或者老旧的纯机械玩意。交通一冻结，就下车。"
        },
        {
            "n": "04",
            "title": "一个包，然后走",
            "body": "水、热量、一把刀、一个打火机、一张纸质地图、现金、药品、正经的鞋、一顶帽子，还有一支不是手机 App 的手电筒。"
        }
    ],
    "builds": [
        {
            "id": "day",
            "tone": "tone-paper",
            "light": false,
            "kicker": "时钟",
            "title": "最初七十二小时。",
            "dek": "趁还没累，先把这一天定下来。把时间写在纸上。",
            "foot": "到第十二小时还在采购，你就晚了。",
            "steps": [
                {
                    "n": "00",
                    "title": "离开",
                    "body": "走侧门。无线电关掉。一个包。别穿过大厅、大路，也别从自家楼前经过。"
                },
                {
                    "n": "01",
                    "title": "找个屋顶，不回家",
                    "body": "躲到一个不是你住址的遮蔽处。喝水。把包倒在地上，看看里面到底有什么。"
                },
                {
                    "n": "04",
                    "title": "开始备水",
                    "body": "架子上要有三天的水，否则你还得接着走。每人每天一加仑（约 3.8 L），就是这个数。瓶装水算。没处理过的河水不算。"
                },
                {
                    "n": "12",
                    "title": "房间变黑",
                    "body": "窗户从里面遮黑。计划里要有便桶。天黑后不生火。留一个人醒着，而且不同时做饭。"
                },
                {
                    "n": "24",
                    "title": "第二个地方",
                    "body": "集合点和藏匿点记在脑子里，不标在地图上。另有一个人知道集合点。他不会同时知道两处藏匿点。"
                },
                {
                    "n": "72",
                    "title": "长期躲藏",
                    "body": "如果电网还在运转、还在搜寻，你就吃冷食，只为取水才移动。好奇心，是人被点到名的原因。"
                }
            ]
        }
    ],
    "dispatch": {
        "d1": {
            "kicker": "通讯 01",
            "stamp": "第 0 天 · 06:12",
            "place": "大道",
            "title": "先锁上的是车。",
            "body": [
                "不是引擎。是车门。四条车道的通勤者坐在打不开的玻璃后面，大道静得我能听见红绿灯咔哒咔哒地换着颜色，没有人再照着走。",
                "手机就在我手里。我到现在也不知道自己为什么把它关了。大概是因为公交车上所有屏幕同时亮起来的样子，像它们都被问了同一个问题。",
                "我没回家。家离车场三百米，我的日历知道。我横着走：后巷，铁路路堑，那座地图多年前就不再标出的人行天桥。到中午，我已经待在一个不属于我的屋顶下，清点包里的东西。不够。但算是个开头。"
            ],
            "sign": "— R.，快递员"
        }
    }
};
