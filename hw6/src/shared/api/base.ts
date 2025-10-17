import ky from 'ky';

// https://api.v2.react-learning.ru/api
export const api = ky.create({ prefixUrl: 'https://api.v2.react-learning.ru' });
