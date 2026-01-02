
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  city?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface EmergencyContact {
  id: string;
  type: 'POLICE' | 'AMBULANCE' | 'FIRE';
  name: string;
  phone: string;
  city: string;
  locality: string;
  address: string;
}

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: string;
  city: string;
  phone: string;
  isApproved: boolean;
  lastDonationDate?: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: string;
  hospital: string;
  unitsRequired: number;
  contactNumber: string;
  status: 'PENDING' | 'FULFILLED';
}

export interface SOSAlert {
  id: string;
  userId: string;
  userName: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  status: 'ACTIVE' | 'RESOLVED';
}
