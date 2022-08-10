import Parse from 'parse';

var moment = require( 'moment' );

const MentorsInRoomState = Parse.Object.extend('MentorsInRoom');

export const getMentorsInRoom = async (uuid) => {
    const query = new Parse.Query('MentorsInRoom');
    query.equalTo('uuid', uuid);
    query.equalTo('MentorDepartureTime', '-1')
    const result = await query.find({success:function(list){}})
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
    return await new MentorsInRoomState().save({ 'uuid': uuid, 'MentorId': mentorId, 'MentorName': mentorName, 'MentorArrivalTime': mentorArrivalTime });
};

export const changeMentorInRoomState = async (uuid, mentorId, mentorName, mentorArrivalTime) => {
    if (!uuid) {
        // todo: fix for supervised workshops
        return;
    }
    const mentor = await getMentorInRoom(uuid, mentorId);
    console.log(mentor, uuid, mentorId)
    if (!mentor || mentor.get('MentorDepartureTime') !== '-1') {
        await addMentorToRoom(uuid, mentorId, mentorName, mentorArrivalTime);
    } else {
        console.log('mentor is leaving, set dep time')
        mentor.set('MentorDepartureTime', moment().format('HH:mm:ss'))
        await mentor.save();
    }
}

export const getMentorsInRoomSubscription = async ( uuid ) => {
    const query = new Parse.Query('MentorsInRoom');
    query.equalTo('uuid', uuid);
    return await query.subscribe();
};