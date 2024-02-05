import config from '../config';
import http from '../utils/http';
import { interpolate } from '../utils/string';

/**
 *
 * @param {Object} filters
 * @returns {Array} data
 */
export const fetchCatigorys = async (filters) => {
  const { data } = await http.get(config.apiEndPoint.catigory.fetchCatigorys, {
    params: { ...filters },
  });
  console.log(data);
  return data.data;
};

/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */
export const fetchCatigory = async (id) => {
  const url = interpolate(config.apiEndPoint.catigory.fetchCatigory, { id: id });

  const { data } = await http.get(url);

  return data.data;
};

/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */
export const deleteCatigory = async (id) => {
  const url = interpolate(config.apiEndPoint.catigory.deleteCatigory, {
    id: id,
  });
  const { data } = await http.remove(url, {
    accessToken: true,
  });

  return data;
};

/**
 *
 * @param {Object} body
 * @returns {Object} data
 */
export const createCatigory = async (body) => {
  const { data } = await http.post(config.apiEndPoint.catigory.createCatigory, {
    body,
    accessToken: true,
  });
  console.log(data);
  return data;
};

/**
 *
 * @param {Integer} id
 * @returns {Object} data
 */
export const updateCatigory = async (id, body) => {
  const url = interpolate(config.apiEndPoint.catigory.updateCatigory, {
    id: id,
  });
  const { data } = await http.put(url, {
    body,
    accessToken: true,
  });

  return data;
};
/**
 *
 * @param {Object} filters
 */
export const filterParams = (filters) => {
  Object.keys(filters).forEach((key) => {
    if (filters.hasOwnProperty(key)) {
      if (filters[key] === '') {
        delete filters[key];
      }
    }
  });
};
