import { Participant } from "../../Participants/participant";
import { User } from "../../User/user";

export class Vols {
    id: number;
    tontineId: number;
    tontineNom: string;
    lieu: string;
    date: Date;
    description: string;
    owner: User;
    concernes: Array<Participant>;
}