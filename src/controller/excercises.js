const { Excercise, User } = require('../bd');

module.exports = {

    "create": async (req, res, next) => {

        try {
            const { _id: userId } = req.params;

            let user = await User.findById(userId).select({ __v: 0 });
            if (!user) throw ('no existe el usuario');

            let date = req.body.date ? new Date(...req.body.date.split('-').map((n, i) => i != 1 ? +n : +n - 1)) : new Date();

            let exercise = {
                ...req.body,
                userId: userId,
                date,
            };

            const newExercise = new Excercise(exercise)

            let savedExercise = await newExercise.save();
            let lastExcercise = await Excercise.findById(savedExercise._id).select({ __v: 0, _id: 0, userId: 0 });

            let { _id, username } = user._doc;


            return res.json({
                _id,
                username,
                "date": lastExcercise._doc.date.toDateString(),
                "duration": lastExcercise._doc.duration,
                "description": lastExcercise._doc.description,
            });
        } catch (error) {
            next(error);
        }
    },

    "read": (req, res, next) => {

        const { id } = req.params;

        User.findById(id, (err, user) => {
            if (err) next({ message: "WTF" });
            if (!user) next({ message: "missing arguments" });

            let query = Excercise.find({ userId: id });

            query.select({ _id: 0, userId: 0 });

            if (req.query.from) {
                let dateFrom = new Date(req.query.from).getTime();
                query.find({ date: { $gte: dateFrom } })
            }

            if (req.query.to) {
                let dateTo = new Date(req.query.to).getTime();
                query.find({ date: { $lte: dateTo } });
            }

            if (req.query.limit) query.sort({ date: 1 }).limit(Number(req.query.limit));

            query.exec((err, data) => {
                if (err) next({ message: "WTF" });

                console.log(data)
                return res.json({
                    ...user._doc,
                    count: data.length,
                    log: data.map(log => {
                        return {
                            ...log._doc,
                            date: log._doc.date.toDateString()
                        }
                    })
                })
            })
        })

    }

}