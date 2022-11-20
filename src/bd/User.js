
module.exports = mongoose => {
    const { Schema } = mongoose;

    const userSchema = new Schema({
        username: {
            type: String,
            required: true,
        },
    })

    const User = mongoose.model('User', userSchema);

    return User;
}