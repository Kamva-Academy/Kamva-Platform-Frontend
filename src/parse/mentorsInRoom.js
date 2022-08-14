import Parse from 'parse';

var moment = require('moment');

const MentorsInRoomState = Parse.Object.extend('MentorsInRoom');

export const getMentorsInRoom = async (uuid) => {
    const query = new Parse.Query('MentorsInRoom');
    query.equalTo('uuid', uuid);
    query.equalTo('MentorLeftRoom', false)
    const result = await query.find({ success: function (list) { } })
    return result;
};

export const getMentorInRoom = async (uuid, mentorId) => {
    const query = new Parse.Query('MentorsInRoom');
    query.equalTo('uuid', uuid);
    query.equalTo('MentorId', mentorId);
    query.equalTo('MentorLeftRoom', false)
    const result = await query.first()
    return result;
};

export const addMentorToRoom = async (uuid, mentorId, mentorName) => {
    if (!uuid) {
        // todo: fix for supervised workshops
        return;
    }
    const mentor = await getMentorInRoom(uuid, mentorId);
    if (!mentor){
        return await new MentorsInRoomState().save({ 'uuid': uuid, 'MentorId': mentorId, 'MentorName': mentorName, 'MentorArrivalTime': moment().format('HH:mm:ss'), 'MentorLastUpdated': moment().format('HH:mm:ss') });
    }
};

export const updateMentorTime = async (uuid, mentorId) => {
    if (!uuid || !mentorId) {return}
    const mentor = await getMentorInRoom(uuid, mentorId);
    if (!mentor) {return}
    mentor.set('MentorLastUpdated', moment().format('HH:mm:ss'))
    await mentor.save();
}

export const announceMentorDeparture = async (uuid, mentorId) => {
    if (!uuid || !mentorId) {return}
    const mentor = await getMentorInRoom(uuid, mentorId);
    if (!mentor) {return}
    mentor.set('MentorLeftRoom', true)
    await mentor.save();
}

export const getMentorsInRoomSubscription = async (uuid) => {
    const query = new Parse.Query('MentorsInRoom');
    query.equalTo('uuid', uuid);
    return await query.subscribe();
};