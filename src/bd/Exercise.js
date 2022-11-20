module.exports = mongoose => {

    const { Schema } = mongoose;

    const excerciseSchema = new Schema({

        description: {
            type: String,
            required: true,
        },

        duration: {
            type: Number,
            required: true,
        },

        date: {
            type: Date,
            // required: true,
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

    })

    const Excercise = mongoose.model('Excercise', excerciseSchema);

    return Excercise;

}