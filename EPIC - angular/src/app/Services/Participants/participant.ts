import { Tontine } from "../Tontine/tontine";
import { Versement } from "../Versements/versement";

export class Participant{
    id: number;
    nom: string;
    prenom: string;
    email: string;
    dateNaiss: Date;
    adresse: string;
    numTel: string;
    profession: string;
    sexe: string;
    status_matrimonial: string;
    probleme: string;
    telprobleme: string;
    mise_montant: number;
    retard: number;
    tirage: boolean;
    date_versement: string;
    tontine: Tontine;
    versements: Array<Versement>;
}