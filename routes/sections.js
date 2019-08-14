const express = require('express');
const router = express.Router();

const sectionController = require('../controllers/sections');

router.get('/', sectionController.getSections);
router.get('/:id', sectionController.getSection);
router.post('/', sectionController.createSection);
//Probably wont do these for the hackathon
// router.put('/:id', sectionController.updateSection);
// router.delete('/:id', sectionController.deleteSection);

module.exports = router;