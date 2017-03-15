/**
 * Created by Donny on 17/3/15.
 */
module.exports = {
    error: function (req, res, err) {
        console.log(err);

        res.statusCode = 500;
        return res.json({
            success: false,
            message: err
        });
    },

    success: function (req, res, result) {
        return res.json({
            success: true,
            data: result
        });
    }
};