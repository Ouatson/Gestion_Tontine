package com.ouatson.backtontine.Tontine.HistoriqueTirage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TiragesService {

    @Autowired
    private TiragesRepository tiragesRepository;

    public List<Tirages> listeTirages(Long tontineId) {
        List<Tirages> tirages = tiragesRepository.findAll();
        List<Tirages> good = new ArrayList<>();
        tirages.forEach(one -> {
            if (one.getTontine().getId().equals(tontineId)){
                good.add(one);
            }
        });
        return good;
    }

    public Tirages ajoutTirage(Tirages tirage) { return tiragesRepository.save(tirage); }
}
