const router = require("express").Router();
const {
    getAllThoughts,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
    getThoughtbyId,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts).post(createThought);

router
.route("/:id")
.get(getThoughtbyId)
.put(updateThought)
.delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;