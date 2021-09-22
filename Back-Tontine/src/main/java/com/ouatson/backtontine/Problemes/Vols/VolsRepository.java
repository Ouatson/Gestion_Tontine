package com.ouatson.backtontine.Problemes.Vols;

import com.ouatson.backtontine.Utilisateurs.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VolsRepository extends JpaRepository<Vols, Long> {

    List<Vols> findAllByOwner(User user);
}
