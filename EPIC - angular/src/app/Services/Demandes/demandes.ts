import { Tontine } from "../Tontine/tontine";

export class Demandes {
    id: number;
    email: string;
    nom_complet: string;
    probleme: string;
    telprobleme: string;
    action: boolean;
    acceptation: boolean;
    dateDemande: string;
    dateAction: string;
    tontine: Tontine;
}