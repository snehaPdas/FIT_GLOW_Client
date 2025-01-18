export interface ISessionSchedule {
    type: string;
    selectedDate: string | number | Date;
    _id: string;
    // specializationId: Specialization; 
    isSingleSession: boolean;
    startDate: string; 
    endDate: string; 
    startTime: string;
    endTime: string;
    price: number;
    duration?: string; 
    isBooked: boolean;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'InProgress'; 
    trainerId: string;
    
  }