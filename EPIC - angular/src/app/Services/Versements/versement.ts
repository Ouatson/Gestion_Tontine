import { Participant } from "../Participants/participant";

export class Versement {
    id: number;
    montant: number;
    operateur: string;
    date: string;
    participant: Participant;
}