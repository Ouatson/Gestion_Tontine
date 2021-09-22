package com.ouatson.backtontine.Tontine;

import com.ouatson.backtontine.Participants.Participant;
import com.ouatson.backtontine.Utilisateurs.User;
import com.ouatson.backtontine.Utilisateurs.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tontines")
public class TontineController {

    @Autowired
    private TontineService tontineService;
    @Autowired
    private UserService userService;

    @GetMapping("toutes/{id}")
    public ResponseEntity<List<Tontine>> toutesTontines(@PathVariable("id") Long id){
        User user = userService.rechercheUserById(id);
        List<Tontine> tontines = tontineService.toutesMesTontines(user);
        return new ResponseEntity<>(tontines, HttpStatus.OK);
    }

    @PostMapping("/ajouter")
    public ResponseEntity<Tontine> ajouterTontine(@RequestBody Tontine tontine){
        Tontine nouvelleTontine = tontineService.ajoutTontine(tontine);
        return new ResponseEntity<>(nouvelleTontine, HttpStatus.CREATED);
    }

    @PutMapping("/modifier")
    public ResponseEntity<Tontine> modifierTontine(@RequestBody Tontine tontine){
        Tontine modifTontine = tontineService.modifierTontine(tontine);
        return new ResponseEntity<>(modifTontine, HttpStatus.OK);
    }

    @PutMapping("/mettreProprio/{id}")
    public ResponseEntity<Tontine> mettreProprio(@RequestBody User user, @PathVariable("id") Long id){
        Tontine tontine = tontineService.rechercheTontine(id);
        tontine.setProprietaire(user);
        Tontine modifTontine = tontineService.modifierTontine(tontine);
        return new ResponseEntity<>(modifTontine, HttpStatus.OK);
    }

    @GetMapping("/recherche/{id}")
    public ResponseEntity<Tontine> rechercheTontine(@PathVariable("id") Long id){
        Tontine tontine = tontineService.rechercheTontine(id);
        return new ResponseEntity<>(tontine, HttpStatus.OK);
    }

    @GetMapping("/rechercheCode/{code}")
    public ResponseEntity<Tontine> rechercheTontineByCode(@PathVariable("code") String code){
        Tontine tontine = tontineService.rechercheTontineByCode(code);
        return new ResponseEntity<>(tontine, HttpStatus.OK);
    }

    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<?> supprimerTontine(@PathVariable("id") Long id){
        tontineService.supprimerTontine(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}