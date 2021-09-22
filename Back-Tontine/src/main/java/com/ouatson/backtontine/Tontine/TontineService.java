package com.ouatson.backtontine.Tontine;

import com.ouatson.backtontine.Participants.Participant;
import com.ouatson.backtontine.Utilisateurs.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Service
public class TontineService {

    @Autowired
    private TontineRepository tontineRepository;

    public List<Tontine> toutesMesTontines(User user){
        List<Tontine> all = tontineRepository.findAll();
        List<Tontine> mine = new ArrayList<>();
        all.forEach(one ->{
            Collection<Participant> participants = one.getParticipant();
            participants.forEach(participant -> {
                if (user.getEmail().equals(participant.getEmail())){
                    mine.add(one);
                }
            });
        });
        return mine;
    }

    public Tontine ajoutTontine(Tontine tontine){
        UUID uuid = UUID.randomUUID();
        tontine.setCode(uuid.toString());
        return tontineRepository.save(tontine);
    }

    public Tontine modifierTontine(Tontine tontine){
        return tontineRepository.save(tontine);
    }

    public Tontine rechercheTontine(Long id){
        return tontineRepository.findById(id).orElseThrow(() -> new TontineNotFoundException("Aucune tontine trouvée !"));
    }

    public Tontine rechercheTontineByCode(String code){
        return tontineRepository.findByCode(code).orElseThrow(() -> new TontineNotFoundException("Aucune tontine trouvée !"));
    }

    @Transactional
    public void supprimerTontine(Long id){
        tontineRepository.deleteById(id);
    }
}
