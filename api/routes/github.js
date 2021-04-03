const { Router } = require('express')

const router = Router()

// Test route
router.use('/github/search', (req, res) => {
  let date = new Date();
  let date_str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  let sql = `INSERT INTO searches(type, term, responses, created_at) VALUES (?)`;
  let values = [
    req.body.type,
    req.body.term,
    JSON.stringify(req.body.responses),
    date_str
  ];
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "Search response stored successfully"
    })
  })
})

module.exports = router