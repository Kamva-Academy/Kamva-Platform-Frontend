import Parse from 'parse';

var moment = require('moment');

const MentorsInRoomState = Parse.Object.extend('MentorsInRoom');

export const getMentorsInRoom = async (uuid) => {
    const result = await Parse.Cloud.run('getMentorsInRoom', {
        uuid,
    });
    return result;
};

export const getMentorInRoom = async (uuid, mentorId) => {
    const result = await Parse.Cloud.run('getMentorInRoom', {
        uuid,
        mentorId,
    });
    return result;
};

export const addMentorToRoom = async (uuid, mentorId, mentorName) => {
    await Parse.Cloud.run('addMentorToRoom', {
        uuid, 
        mentorId, 
        mentorName, 
        mentorArrivalTime: moment().format('HH:mm:ss'), 
        mentorLastUpdated: moment().format('HH:mm:ss'),
    });
};

export const updateMentorTime = async (uuid, mentorId) => {
    await Parse.Cloud.run('updateMentorTime', {
        uuid,
        mentorId,
        mentorLastUpdated: moment().format('HH:mm:ss'),
    });
}

export const announceMentorDeparture = async (uuid, mentorId) => {
    await Parse.Cloud.run('announceMentorDeparture', {
        uuid,
        mentorId,
    });
}

export const getMentorsInRoomSubscription = async (uuid) => {
    const query = new Parse.Query('MentorsInRoom');
    query.equalTo('uuid', uuid);
    return await query.subscribe();
};