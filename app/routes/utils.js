
function sendError500(res, error){
    res.status(500)
    res.send({error})
}

function sendError400(res){
    res.status(400)
    res.send({
        error: `The URL isn't valid.`
    })
}

module.exports = {
    sendError500,
    sendError400
}