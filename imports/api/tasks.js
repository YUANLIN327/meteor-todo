import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);
        if (!this.userId) {
            throw new Meteor.Error('not-authrorized');
        }
        Tasks.insert({
            text,
            createdAt: Date.now(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String);
        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, checked) {
        check(taskId, String);
        check(checked, Boolean);
        Tasks.update(taskId, { $set: { checked } });
    }
})

export const Tasks = new Mongo.Collection('tasks');