const { Thought, User } = require("../models");

const thoughtController = {
    getAllThoughts (req, res) {
        Thought.find({})
        .populate
    }
}