package com.ouatson.backtontine.Problemes.Impayes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/impayes")
public class ImpayesController {

    @Autowired
    private ImpayesService impayesService;

    @GetMapping("/afficherTout/{id}")
    public ResponseEntity<List<Impayes>> tousImpayes(@PathVariable("id") Long id){
        List<Impayes> impayes = impayesService.tousImpayes(id);
        return new ResponseEntity<>(impayes, HttpStatus.OK);
    }

    @PostMapping("/nouveau")
    public ResponseEntity<Impayes> ajoutImpaye(@RequestBody Impayes impaye){
        Impayes nouvImpaye = impayesService.enregistrer(impaye);
        return new ResponseEntity<>(nouvImpaye, HttpStatus.CREATED);
    }

    @PutMapping("/modifier")
    public ResponseEntity<Impayes> modifImpaye(@RequestBody Impayes impaye){
        Impayes modImpaye = impayesService.enregistrer(impaye);
        return new ResponseEntity<>(modImpaye, HttpStatus.OK);
    }

    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<?> supImpaye(@PathVariable("id") Long id){
        impayesService.supprimer(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
