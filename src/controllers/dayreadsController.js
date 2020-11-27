const Dayread = require('../models/dayread');

exports.getDayreads = async (req, res, next) => {
    const dayReads = await Dayread.find({user: "denis"});
    console.log(dayReads);
    res.status(200).json({
        data: dayReads
    });
}