import { Impayes } from "../Problemes/Impayes/impayes";
import { Signals } from "../Problemes/Signals/signals";
import { Tontine } from "../Tontine/tontine";
import { Vols } from "../Problemes/Vols/vols";

export class User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    dateNaiss: Date;
    adresse: string;
    numTel: string;
    profession: string;
    password: string;
    sexe: string;
    status_matrimonial: string;
    tontine: Array<Tontine>
    signals: Array<Signals>;
    vols: Array<Vols>
    impayes: Array<Impayes>
}