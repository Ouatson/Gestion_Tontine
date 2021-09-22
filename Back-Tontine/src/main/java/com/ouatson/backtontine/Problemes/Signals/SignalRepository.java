package com.ouatson.backtontine.Problemes.Signals;

import com.ouatson.backtontine.Utilisateurs.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SignalRepository extends JpaRepository<Signals, Long> {
    List<Signals> findAllByUtilisateur(User user);
}
