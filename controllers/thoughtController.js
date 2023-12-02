const { Thought, User } = require("../models");

const thoughtController = {
    getAllThoughts (req, res) {
        Thought.find({})
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((thoughtData)=> res.json(thoughtData))
        .catch((err)=> {
            console.log(err);
            res.sendStatus(500);
        });
    },
    getThoughtbyId({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: "reactions",
            select: "-__v",
        })
        .select("-__v")
        .then((thoughtData)=> {
            if (!thoughtData) {
                return res.status(404).json({ message: "Error has occured!"});
            }
            res.json(thoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id})=> {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then((dbUserData)=> {
            if(!dbUserData) {
                return res.status(404).json({ message: "Thought wasnt created"});
            }
            res.json({ message: "It posted!"});
        })
        .catch((err)=> res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {
            new: true,
            runValidators: true,
        })
        .then((thoughtData)=> {
            if (!thoughtData) {
                res.status(404).json({ message: "Update thought error"});
                return;
            }
            res.json(thoughtData);
        })
        .catch((err)=> res.json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id})
        .then((thoughtData)=> {
            if(!thoughtData) {
                return res.status(404).json({ message: "Error has occured"});
            }
            return User.findOneAndUpdate (
                {thoughts: params.id },
                {$pull: { thought: params.id }},
                {new: true}
            );
        })
        .then((dbUserData)=> {
            if (!dbUserData) {
                return res.status(404).json({
                    message: "Error!"
                });

            }
            res.json({ message: "It worked!"});

        })
        .catch((err)=> res.json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body }},
            { new: true, runValidators: true }
        )
        .then((thoughtData)=> {
            if (!thoughtData) {
                res.status(404).json({ message: "Error has occured"});
                return;
            }
            res.json(thoughtData);
        })
        .catch((err)=> res.json(err));
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: {reactions: { reactionId:params.reactionId }}},
            {new: true}
        )
        .then((thoughtData)=> res.json(thoughtData))
        .catch((err)=> res.json(err));
    },
};

module.exports = thoughtController