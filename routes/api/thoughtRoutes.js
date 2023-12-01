const router = require("express").Router();
const {
    getAllThoughts,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
    getThoughtById,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts).post(createThought);

router
.route("/:id")
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;