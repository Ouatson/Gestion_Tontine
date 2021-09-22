package com.ouatson.backtontine.Participants;

import com.ouatson.backtontine.Tontine.Tontine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    public Participant enregistrerPart(Participant participant){
        return participantRepository.save(participant);
    }

    public List<Participant> tousParticipants(){ return participantRepository.findAll(); }

    public Participant rechercheParticipant(Long id){ return participantRepository.findById(id).orElseThrow(() -> new ParticipantNotFoundException("Participant introuvable !")); }

    public Participant rechercherParticipant(String email, String numTel, Tontine tontine){ return participantRepository.findByEmailAndNumTelAndTontine(email, numTel, tontine); }

    public void supprimerPart(Long id){
        participantRepository.deleteById(id);
    }
}
