package com.ouatson.backtontine.Problemes.Vols;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class VolsService {

    @Autowired
    private VolsRepository volsRepository;

    public List<Vols> tousVols(Long id){
        List<Vols> vol = volsRepository.findAll();
        List<Vols> vols = new ArrayList<>();
        vol.forEach(one -> {
            if (one.getOwner().getId().equals(id)){
                vols.add(one);
            }
        });
        return vols;
    }

    public Vols enregistrer(Vols vol){ return volsRepository.save(vol); }

    @Transactional
    public void supprimer(Long id){ volsRepository.deleteById(id); }
}
