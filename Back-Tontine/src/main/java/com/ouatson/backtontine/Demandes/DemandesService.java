package com.ouatson.backtontine.Demandes;

import com.ouatson.backtontine.Tontine.Tontine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Service
public class DemandesService {

    @Autowired
    private DemandesRepository demandesRepository;

    public Demandes enregistrerDemande(Demandes demande){ return demandesRepository.save(demande); }

    public List<Demandes> mesDemandes(String email){ return demandesRepository.findAllByEmail(email); }

    public Demandes rechercheDemandeByEmail(String email){ return demandesRepository.findByEmail(email); }

    @Transactional
    public void supprimerDemande(Long id){ demandesRepository.deleteById(id); }
}
