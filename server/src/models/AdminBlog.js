const mongoose = require("mongoose");
const logger = require("../utils/logger");

const { ObjectId } = mongoose.Types;
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 250,
        },
        description: {
            type: String,
            required: true,
            maxLength: 2500,
        },
        imageUrl: [{
            type: String,
            required: false,
            maxLength: 500
        }]
    },
    {
        timestamps: true
    },
);

BlogSchema.pre("save", (next) => {
    logger.info("Saving document to collection 'reports'.");
    next();
});

BlogSchema.post("save", (document) => {
    logger.info("Saved document with id '%s' to collection 'reports'.", document._id);
});

module.exports = mongoose.model("blog", BlogSchema);