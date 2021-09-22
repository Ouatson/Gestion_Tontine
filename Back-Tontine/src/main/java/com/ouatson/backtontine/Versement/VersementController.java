package com.ouatson.backtontine.Versement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/versement")
public class VersementController {

    @Autowired
    private VersementService versementService;

    @GetMapping("/tous/{id}")
    public ResponseEntity<List<Versement>> tousVersements(@PathVariable("id") Long id) {
        List<Versement> versements = versementService.tousVersements(id);
        return new ResponseEntity<>(versements, HttpStatus.OK);
    }

    @PostMapping("/ajouter")
    public ResponseEntity<Versement> ajouterVersement(@RequestBody Versement versement) {
        Versement nouveauVersement = versementService.ajoutVersement(versement);
        return new ResponseEntity<>(nouveauVersement, HttpStatus.CREATED);
    }

    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<?> supprimerVersement(@PathVariable("id") Long id) {
        versementService.supprimerVersement(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
