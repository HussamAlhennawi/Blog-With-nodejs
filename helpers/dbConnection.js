const mongoose = require("mongoose");

const connect = (app) => {
    mongoose.connect(process.env.DB_URI)
        .then(() => {
            console.log('DB Connected');
            app.listen(8000, () => console.log('Server Working'));
        })
        .catch((err) => console.log(err))
}

module.exports = { connect }

