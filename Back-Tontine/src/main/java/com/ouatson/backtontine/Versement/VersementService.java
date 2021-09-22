package com.ouatson.backtontine.Versement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VersementService {

    @Autowired
    private VersementRepository versementRepository;

    public List<Versement> tousVersements(Long id) {
        List<Versement> versements = versementRepository.findAll();
        List<Versement> mesVersements = new ArrayList<>();
        versements.forEach(one -> {
            if (one.getParticipant().getId().equals(id)){
                mesVersements.add(one);
            }
        });
        return mesVersements;
    }

    public Versement ajoutVersement(Versement versement) { return versementRepository.save(versement); }

    public void supprimerVersement(Long id) { versementRepository.deleteById(id); }
}
