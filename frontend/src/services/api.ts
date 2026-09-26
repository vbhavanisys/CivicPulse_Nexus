// Full Stack API Service - Backend connection
const API_URL = 'http://localhost:8080/api';

export const getCertificates = async () => {
  // const res = await fetch(`${API_URL}/certificates`);
  // return res.json();
  return [{id:'APP-2024-1247', name:'Priya Sharma'}];
};

export const getWelfareSchemes = async () => {
  // const res = await fetch(`${API_URL}/welfare`);
  // return res.json();
  return [{name:'PM Awas Yojana'}];
};