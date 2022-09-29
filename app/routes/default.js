const express = require('express');
const { sendError400 } = require("./utils");
const router = express.Router();

router.get('*', (req, res) => sendError400(res))

router.post('*', (req, res) => sendError400(res))

router.delete('*', (req, res) => sendError400(res))

router.put('*', (req, res) => sendError400(res))

module.exports = router;