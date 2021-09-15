import { Demandes } from "../Demandes/demandes";
import { Tirages } from "../Tirages/tirages";
import { Participant } from "../Participants/participant";
import { User } from "../User/user";

export class Tontine{
    id: number;
    code: string;
    nom: string;
    nombrePart: number;
    montant: number;
    tirage: string;
    dateDebut: Date;
    dateFin: Date;
    periodicite: number;
    typeTirage: string;
    description: string;
    proprietaire: User;
    participant: Array<Participant>;
    demandes: Array<Demandes>;
    tirages: Array<Tirages>;
}