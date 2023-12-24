const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

//mongoose.connect('mongodb://localhost:27017/ratedb');
mongoose.connect('mongodb+srv://pollychen:b7ezsJoHTljnwkSB@starrate.xqsdusb.mongodb.net/?retryWrites=true&w=majority'); // 連結雲端Atlas
const db = mongoose.connection;

// 與資料庫連線發生錯誤時
db.on('error', console.error.bind(console, 'Connection fails!'));

// 與資料庫連線成功連線時
db.once('open', function () {
    console.log('Connected to database...');
});

// 該collection的格式設定
const rateSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    restaurant: { 
        type: String,
        required: true
    },
    store: { 
        type: String,
        required: true
    },
    meal: { 
        type: String,
        required: true
    },
    score: { 
      type: Number,
      required: true
    },
    depiction: { 
      type: String,
      required: true
    }
})

const Rate = mongoose.model('Rate', rateSchema);

// 取得全部資料
// 使用非同步，才能夠等待資料庫回應
router.get("/", async (req, res) => {
    // 使用try catch方便Debug的報錯訊息
    try {
        // 找出Rate資料資料表中的全部資料
        const rate = await Rate.find();
        // 將回傳的資訊轉成Json格式後回傳
        res.json(rate);
    } catch (err) {
        // 如果資料庫出現錯誤時回報 status:500 並回傳錯誤訊息 
        res.status(500).json({ message: err.message })
    }
});

// 新增待辦事項
// 將Method改為Post
router.post("/", async (req, res) => {
    // 從req.body中取出資料
    const rate = new Rate({
        name: req.body.name,
        restaurant: req.body.restaurant,
        store: req.body.store,
        meal: req.body.meal,
        score: req.body.score,
        depiction: req.body.depiction
    });
    try {
        // 使用.save()將資料存進資料庫
        const newRate = await rate.save();
        // 回傳status:201代表新增成功 並回傳新增的資料
        res.status(201).json(newRate);
    } catch (err) {
        // 錯誤訊息發生回傳400 代表使用者傳入錯誤的資訊
        res.status(400).json({ message: err.message })
    }
});

// 在網址中傳入id用以查詢
router.get("/:id", async (req, res) => {
    try {
        const rate = await Rate.findById(req.params.id);
        if (rate == undefined) {
            return res.status(404).json({ message: "Can't find rate" })
        } else {
            return res.status(200).json(rate);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// 更新代辦事項
router.put("/:id", async (req, res) => {
    try {
        // 將取出的代辦事項更新
        const newRate = await Rate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(newRate);
    } catch (err) {
        // 資料庫操作錯誤將回傳500及錯誤訊息
        res.status(500).json({ message: "update rate failed!" });
    }
});

// 刪除代辦事項
router.delete("/:id", async (req, res) => {
    try {
        // 將取出的代辦事項刪除      
        await Rate.findByIdAndDelete(req.params.id);
        // 回傳訊息
        res.json({ message: "Delete rate successfully!" });
    } catch (err) {
        // 資料庫操作錯誤將回傳500及錯誤訊息
        console.log(err);
        res.status(500).json({ message: "remove rate failed!" });
    }
});



module.exports = router;
