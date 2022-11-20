const router = require('express').Router();
const usersController = require('../controller/users');
const excerciseController = require('../controller/excercises');

router.post('/', usersController.create);
router.get('/', usersController.readAll);
router.post('/:_id/exercises', excerciseController.create);
router.get('/:id/logs?', excerciseController.read);

module.exports = router;