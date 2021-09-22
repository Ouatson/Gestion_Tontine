package com.ouatson.backtontine.Tontine.HistoriqueTirage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/historiqueTirage")
public class TiragesController {

    @Autowired
    private TiragesService tiragesService;

    @GetMapping("/tout/{tontineId}")
    public ResponseEntity<List<Tirages>> tousLesTirages(@PathVariable("tontineId") Long tontineId){
        List<Tirages> tirages = tiragesService.listeTirages(tontineId);
        return new ResponseEntity<>(tirages, HttpStatus.OK);
    }

    @PostMapping("/ajouter")
    public ResponseEntity<Tirages> ajouterTirage(@RequestBody Tirages tirage) {
        Tirages nouveauTirage = tiragesService.ajoutTirage(tirage);
        return new ResponseEntity<>(nouveauTirage, HttpStatus.CREATED);
    }
}
