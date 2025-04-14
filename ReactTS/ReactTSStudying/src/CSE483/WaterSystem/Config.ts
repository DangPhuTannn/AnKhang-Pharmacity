
export interface WaterSystemProps {
  id: number;
  name: string;
  location: string;
  records: RecordProps[];
  donations: DonationProps[];
}

export interface RecordProps {
  id: number;
  reading: number;
  date: string;
}

export interface DonationProps {
  id: number;
  amount: number;
  date: string;
}
