package com.ouatson.backtontine.Participants;

import com.ouatson.backtontine.Tontine.Tontine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/participants")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    @GetMapping("/tout")
    public ResponseEntity<List<Participant>> tousParticipants(){
        List<Participant> participants = participantService.tousParticipants();
        return new ResponseEntity<>(participants, HttpStatus.OK);
    }

    @GetMapping("/rechercher/{id}")
    public ResponseEntity<Participant> rechercheParticipant(@PathVariable("id") Long id){
        Participant participant = participantService.rechercheParticipant(id);
        return new ResponseEntity<>(participant, HttpStatus.OK);
    }

    @PostMapping("/ajouter")
    public ResponseEntity<Participant> ajouterParticipant(@RequestBody Participant participant) throws Exception{
        String tempEmail = participant.getEmail();
        String tempNumTel = participant.getNumTel();
        Tontine temptontine = participant.getTontine();
        Participant partObj = participantService.rechercherParticipant(tempEmail,tempNumTel, temptontine);
        if (partObj != null){
            throw new Exception("Un participant avec le meme email et telephone existe deja !");
        }
        Participant nouveauParticpant = participantService.enregistrerPart(participant);
        return new ResponseEntity<>(nouveauParticpant, HttpStatus.CREATED);
    }

    @PutMapping("/modifier")
    public ResponseEntity<Participant> modifierParticipant(@RequestBody Participant participant){
        Participant modifParticipant = participantService.enregistrerPart(participant);
        return new ResponseEntity<>(modifParticipant, HttpStatus.OK);
    }

    @PutMapping("/mettreTontine/{id}")
    public ResponseEntity<Participant> mettreTontine(@RequestBody Tontine tontine, @PathVariable("id") Long id) {
        Participant participant = participantService.rechercheParticipant(id);
        participant.setTontine(tontine);
        Participant modPart = participantService.enregistrerPart(participant);
        return new ResponseEntity<>(modPart, HttpStatus.OK);
    }

    @DeleteMapping("/supprimer/{id}")
    public ResponseEntity<?> supprimerParticipant(@PathVariable("id") Long id){
        participantService.supprimerPart(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
