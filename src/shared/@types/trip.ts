import { Pageable } from '.';

export interface Trip {
  viagemId: string;
  qtdCamisetas: number;
  dataHora: string;
  status: string;
}

export interface GetTripResponse {
  content: Trip[];
  pageable: Pageable;
}
