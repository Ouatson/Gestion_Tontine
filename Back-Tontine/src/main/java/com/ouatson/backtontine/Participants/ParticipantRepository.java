package com.ouatson.backtontine.Participants;

import com.ouatson.backtontine.Tontine.Tontine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    Participant findByEmailAndNumTelAndTontine(String email, String numTel, Tontine tontine);
}
