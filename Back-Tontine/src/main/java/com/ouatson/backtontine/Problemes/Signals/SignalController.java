package com.ouatson.backtontine.Problemes.Signals;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/signal")
public class SignalController {

    @Autowired
    private SignalService signalService;

    @GetMapping("/afficherTout/{id}")
    public ResponseEntity<List<Signals>> tousSignals(@PathVariable("id") Long id){
        List<Signals> signals = signalService.tousSignals(id);
        return new ResponseEntity<>(signals, HttpStatus.OK);
    }

    @PostMapping("/nouveau")
    public ResponseEntity<Signals> ajoutSignal(@RequestBody Signals signal){
        Signals nouvSignal = signalService.enregistrer(signal);
        return new ResponseEntity<>(nouvSignal, HttpStatus.CREATED);
    }

    @PutMapping("modifier")
    public ResponseEntity<Signals> modifSignal(@RequestBody Signals signal){
        Signals modifSignal = signalService.enregistrer(signal);
        return new ResponseEntity<>(modifSignal, HttpStatus.OK);
    }

    @DeleteMapping("supprimer/{id}")
    public ResponseEntity<?> supSignal(@PathVariable("id") Long id){
        signalService.supprimer(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
