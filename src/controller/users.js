const { User } = require('../bd')

module.exports = {

    "create": (req, res, next) => {
        const { username } = req.body;

        const user = new User({ username });
        user.save((err, data) => {
            if (err) next({ message: 'wtf' })
            if (!data) next({ message: "missing argument" });

            User.findById(data._id)
                .select({ __v: 0 })
                .exec(function (err, user) {
                    if (err) return next(err);
                    console.log("usuario creado");
                    return res.json(user._doc);
                })

        })

    },

    "readAll": (req, res, next) => {
        User.find({}, (err, data) => {
            if (err) next({ message: 'wtf' })
            if (!data) next({ message: "missing argument" });

            return res.json([...data]);
        })
    }

}