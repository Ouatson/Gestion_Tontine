import { Tontine } from "../Tontine/tontine";

export class Tirages {
    id: number;
    emailRetire: string;
    nomRetire: string;
    montant: number;
    dateTirage: string;
    tontine: Tontine;
}