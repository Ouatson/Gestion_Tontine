package com.ouatson.backtontine.Demandes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/demandes")
public class DemandesController {

    @Autowired
    private DemandesService demandesService;

    @GetMapping("/parmoi/{email}")
    public ResponseEntity<List<Demandes>> demandesFaites(@PathVariable("email") String email){
        List<Demandes> demandes = demandesService.mesDemandes(email);
        return new ResponseEntity<>(demandes, HttpStatus.OK);
    }

    @PostMapping("/faire")
    public ResponseEntity<Demandes> faireDemande(@RequestBody Demandes demande) throws Exception{
        String email = demande.getEmail();
        if (email != null){
            Demandes demande1 = demandesService.rechercheDemandeByEmail(email);
            if (demande1 != null){
                throw new Exception("Une demande de cet utilisateur a déjà ete effectuée !");
            }
        }
        Demandes nouvelleDemande = demandesService.enregistrerDemande(demande);
        return new ResponseEntity<>(nouvelleDemande, HttpStatus.CREATED);
    }

    @PutMapping("/modifier")
    public ResponseEntity<Demandes> modifierDemande(@RequestBody Demandes demande) {
        Demandes modifDemande = demandesService.enregistrerDemande(demande);
        return new ResponseEntity<>(modifDemande, HttpStatus.OK);
    }

    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<?> supprimerDemande(@PathVariable("id") Long id){
        demandesService.supprimerDemande(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
