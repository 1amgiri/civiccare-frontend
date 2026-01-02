
export const API_BASE_URL = (window as any).process?.env?.API_URL || 'http://localhost:8080/api';
export const TOKEN_KEY = 'civiccare_jwt_token';
export const USER_KEY = 'civiccare_user_data';

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const EMERGENCY_TYPES = ['POLICE', 'AMBULANCE', 'FIRE'];
