import axios from 'axios';

export const CREATE_SURVEY = 'create_post';

export function createSurvey(data, done) {
    const URI = encodeURI('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth');
    const request = axios.post(URI, data).then(() => done());

    return {
        type: CREATE_SURVEY,
        payload: request, //redux-promise takes care about the Promise
    };
}
