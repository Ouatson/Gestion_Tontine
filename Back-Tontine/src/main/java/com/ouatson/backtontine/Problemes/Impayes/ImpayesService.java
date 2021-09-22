package com.ouatson.backtontine.Problemes.Impayes;

import com.ouatson.backtontine.Utilisateurs.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ImpayesService {

    @Autowired
    private ImpayesRepository impayesRepository;

    public List<Impayes> tousImpayes(Long id){
        List<Impayes> impaye = impayesRepository.findAll();
        List<Impayes> impayes = new ArrayList<>();
        impaye.forEach(one -> {
            if (one.getProprio().getId().equals(id)){
                impayes.add(one);
            }
        });
        return impayes;
    }

    public Impayes enregistrer(Impayes impaye){ return impayesRepository.save(impaye); }

    @Transactional
    public void supprimer(Long id){ impayesRepository.deleteById(id); }
}
