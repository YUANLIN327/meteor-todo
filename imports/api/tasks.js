import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

if (Meteor.isServer) {
    Meteor.publish('tasks', function tasksPublication() {
        return Tasks.find({$or:[{isPrivate:false}, {owner: this.userId}]});
    })
}

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
        const task = Tasks.findOne(taskId);
        if (task.owner !== this.userId) {
            throw new Meteor.Error('auth failed')
        }
        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, checked) {
        check(taskId, String);
        check(checked, Boolean);
        const task = Tasks.findOne(taskId);
        if (task.owner !== this.userId) {
            throw new Meteor.Error('auth failed')
        }
        Tasks.update(taskId, { $set: { checked } });
    },
    'tasks.markPrivate'(taskId, isPrivate) {
        check(taskId, String);
        check(isPrivate, Boolean);

        const task = Tasks.findOne(taskId);
        if (task.owner !== this.userId) {
            throw new Meteor.Error('auth failed')
        }
        Tasks.update(taskId, { $set: { isPrivate } });
    }
})

export const Tasks = new Mongo.Collection('tasks');