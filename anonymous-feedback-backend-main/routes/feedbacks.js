const {
  sendFeedback,
  retrieveFeedBack,
  deleteFeedback,
} = require("../controllers/feedbacks")

const router = require("express").Router()




router.get("/get", function (req, res){
  res.send("Oki")
})

router.post("./new", sendFeedback)
router.post("./retrieve", retrieveFeedBack)
router.put("./delete", deleteFeedback)

module.exports = router
