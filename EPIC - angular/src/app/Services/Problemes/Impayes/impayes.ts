import { User } from "../../User/user";

export class Impayes {
    id: number;
    tontineId: number;
    tontineNom: string;
    operateur: string;
    description: string;
    dateDeposition: string;
    proprio: User;
}