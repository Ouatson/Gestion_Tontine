package com.ouatson.backtontine.Problemes.Vols;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vols")
public class VolsController {

    @Autowired
    private VolsService volsService;

    @GetMapping("/afficherTout/{id}")
    public ResponseEntity<List<Vols>> tousVols(@PathVariable("id") Long id){
        List<Vols> vols = volsService.tousVols(id);
        return new ResponseEntity<>(vols, HttpStatus.OK);
    }

    @PostMapping("/nouveau")
    public ResponseEntity<Vols> ajoutVol(@RequestBody Vols vol){
        Vols nouVol = volsService.enregistrer(vol);
        return new ResponseEntity<>(nouVol, HttpStatus.CREATED);
    }

    @PutMapping("/modifier")
    public ResponseEntity<Vols> modifVol(@RequestBody Vols vol){
        Vols modVol = volsService.enregistrer(vol);
        return new ResponseEntity<>(modVol, HttpStatus.OK);
    }

    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<?> supVol(@PathVariable("id") Long id){
        volsService.supprimer(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
