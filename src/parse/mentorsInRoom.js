import Parse from 'parse';

var moment = require('moment');

const MentorsInRoomState = Parse.Object.extend('MentorsInRoom');

export const getMentorsInRoom = async (uuid) => {
    const query = new Parse.Query('MentorsInRoom');
    query.equalTo('uuid', uuid);
    query.equalTo('MentorLeftRoom', false)
    const result = await query.find({ success: function (list) { } },)
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

export const addMentorToRoom = async (uuid, mentorId, mentorName, mentorArrivalTime, mentorLastUpdated) => {
    if (!uuid) {
        // todo: fix for supervised workshops
        return;
    }
    const mentor = await getMentorInRoom(uuid, mentorId);
    if (!mentor){
        return await new MentorsInRoomState().save({ 'uuid': uuid, 'MentorId': mentorId, 'MentorName': mentorName, 'MentorArrivalTime': mentorArrivalTime, 'MentorLastUpdated': mentorLastUpdated });
    }
};

export const updateMentorTime = async (uuid, mentorId, mentorLastUpdated) => {
    if (!uuid || !mentorId) {return}
    const mentor = await getMentorInRoom(uuid, mentorId);
    if (!mentor) {return}
    mentor.set('MentorLastUpdated', mentorLastUpdated)
    await mentor.save();
}

export const announceMentorDeparture = async (uuid, mentorId) => {
    if (!uuid || !mentorId) {return}
    const mentor = await getMentorInRoom(uuid, mentorId);
    if (!mentor) {return}
    mentor.set('MentorLeftRoom', true)
    await mentor.save();
}

// export const getMentorsInRoom = async (uuid) => {
//     const result = await Parse.Cloud.run('getMentorsInRoom', {
//         uuid,
//     });
//     return result;
// };

// export const getMentorInRoom = async (uuid, mentorId) => {
//     const result = await Parse.Cloud.run('getMentorInRoom', {
//         uuid,
//         mentorId,
//     });
//     return result;
// };

// export const addMentorToRoom = async (uuid, mentorId, mentorName) => {
//     await Parse.Cloud.run('addMentorToRoom', {
//         uuid, 
//         mentorId, 
//         mentorName, 
//         mentorArrivalTime: moment().format('HH:mm:ss'), 
//         mentorLastUpdated: moment().format('HH:mm:ss'),
//     });
// };

// export const updateMentorTime = async (uuid, mentorId) => {
//     await Parse.Cloud.run('updateMentorTime', {
//         uuid,
//         mentorId,
//         mentorLastUpdated: moment().format('HH:mm:ss'),
//     });
// }

// export const announceMentorDeparture = async (uuid, mentorId) => {
//     await Parse.Cloud.run('announceMentorDeparture', {
//         uuid,
//         mentorId,
//     });
// }

export const getMentorsInRoomSubscription = async (uuid) => {
    const query = new Parse.Query('MentorsInRoom');
    query.equalTo('uuid', uuid);
    return await query.subscribe();
};