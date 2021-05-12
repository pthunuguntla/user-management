module.exports = function (app, upload) {

    const users = require('../controllers/users.controller');

    // Create a new user
    app.post('/api/user/create', upload.single('file'), users.create);

    // Retrieve all users
    app.get('/api/user/userInfos', users.findall);

    // Update a user with Id
    app.put('/api/user/updatebyid/:id', upload.single('file'), users.update);

    // Delete a user with Id
    app.delete('/api/user/deletebyid/:id', users.delete);


}