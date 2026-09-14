export interface BookingSlot {
  start: string;
  end: string;
  label: string;
}

export interface AvailabilityPayload {
  configured: boolean;
  date: string;
  timeZone: string;
  sessionMinutes: number;
  bufferMinutes: number;
  feePaise: number | null;
  cancellationPolicy: string | null;
  slots: BookingSlot[];
  message?: string;
}
