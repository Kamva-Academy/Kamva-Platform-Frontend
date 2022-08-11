import Parse from 'parse';

var moment = require('moment');

const MentorsInRoomState = Parse.Object.extend('MentorsInRoom');

export const getMentorsInRoom = async (uuid) => {
    const query = new Parse.Query('MentorsInRoom');
    query.equalTo('uuid', uuid);
    query.equalTo('MentorDepartureTime', '-1')
    const result = await query.find({ success: function (list) { } })
    return result;
};

export const getMentorInRoom = async (uuid, mentorId) => {
    const query = new Parse.Query('MentorsInRoom');
    query.equalTo('uuid', uuid);
    query.equalTo('MentorId', mentorId);
    query.equalTo('MentorDepartureTime', '-1')
    const result = await query.first()
    return result;
};

export const addMentorToRoom = async (uuid, mentorId, mentorName, mentorArrivalTime) => {
    if (!uuid) {
        // todo: fix for supervised workshops
        return;
    }
    const mentor = await getMentorInRoom(uuid, mentorId);
    if (!mentor){
        console.log('mentor with id: ', mentorId, 'came to room with id: ', uuid)
        return await new MentorsInRoomState().save({ 'uuid': uuid, 'MentorId': mentorId, 'MentorName': mentorName, 'MentorArrivalTime': mentorArrivalTime });
    }
};

export const setMentorsDepartureTime = async (uuid, mentorId) => {
    if (!uuid || !mentorId) {return}
    console.log('mentor is leaving, set dep time, mentor data: ', uuid, mentorId)
    const mentor = await getMentorInRoom(uuid, mentorId);
    if (!mentor) {return}
    mentor.set('MentorDepartureTime', moment().format('HH:mm:ss'))
    await mentor.save();
}



export const getMentorsInRoomSubscription = async (uuid) => {
    const query = new Parse.Query('MentorsInRoom');
    query.equalTo('uuid', uuid);
    return await query.subscribe();
};