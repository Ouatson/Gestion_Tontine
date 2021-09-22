package com.ouatson.backtontine.Problemes.Signals;

import com.ouatson.backtontine.Utilisateurs.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SignalService {

    @Autowired
    private SignalRepository signalRepository;

    public List<Signals> tousSignals(Long id){
        List<Signals> signals = signalRepository.findAll();
        List<Signals> mesSignaux = new ArrayList<>();
        signals.forEach(one -> {
            if (one.getUtilisateur().getId().equals(id)) {
                mesSignaux.add(one);
            }
        });
        return mesSignaux;
    }

    public Signals enregistrer(Signals signal){
        return signalRepository.save(signal);
    }

    @Transactional
    public void supprimer(Long id){ signalRepository.deleteById(id); }
}
