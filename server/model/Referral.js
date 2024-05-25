//create a model for a referral which has the following properties:
// title, desc, status(incomplete, inprogress or complete), company (refs a company model), assignedBy (refs a user model),
// dateCreated, dateCompleted, priority (low, medium, high), completionNotes, [relatedProcesses] (refs a process model)

const { Schema, model } = require('mongoose');

const referralSchema = new Schema(
    {
        title: {
        type: String,
        required: true
        },
        desc: {
            type: String,
        },
        status: {
            type: String,
            enum: ['incomplete', 'inprogress', 'completed'],
            default: 'incomplete'
        },
        company: {
            type: Schema.Types.ObjectId,
            ref: 'company',
            // required: true WILL ADD BACK
        },
        assignedBy: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        dateCreated: {
            type: Date,
            default: Date.now
        },
        dateCompleted: {
            type: Date
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'low'
        },
        completionNotes: {
            type: String
        },
        relatedProcesses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'process'
        }
        ]
    }
    );



const Referral = model('referral', referralSchema);

module.exports = Referral;